const UserModel = require("../models/userModel");

exports.getUserImagesController = async (req, res) => {
    try {
        const userId = req.user?._id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized — Invalid or missing token",
            });
        }

        const user = await UserModel.findById(userId).select("name email image imageKeys");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "User images fetched successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                profileImage: user.image,
                imageKeys: user.imageKeys || [],
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching user images",
            details: error.message,
        });
    }
};
