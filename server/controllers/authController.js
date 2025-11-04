const { oauth2Client } = require("../config/googleConfig");
const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const axios = require("axios");

exports.googleLogin = async (req, res) => {
    try {
        const { code } = req.query;

        // Exchange authorization code for access token
        const googleRes = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(googleRes.tokens);

        // Fetch user info from Google
        const userRes = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
        );

        const { email, name, picture } = userRes.data;

        // Check if user already exists
        let user = await UserModel.findOne({ email });

        if (!user) {
            user = await UserModel.create({
                name,
                email,
                image: picture,
            });
        }

        const { _id } = user;

        // Generate JWT token
        const token = jwt.sign(
            { _id, email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_TIMEOUT || "7d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // true for HTTPS
            sameSite: "lax", // or 'none' if cross-domain with HTTPS
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        // Send JSON response
        return res.status(200).json({
            success: true,
            message: "Login successful",
            user,
        });
    } catch (e) {
        console.error("Google login error:", e);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
