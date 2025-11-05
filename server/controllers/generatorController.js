const multer = require('multer');
const axios = require('axios');
const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');
const UserModel = require('../models/userModel');

const uploadBufferToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "tryelle", resource_type: "image" },
            (error, result) => {
                if (error) reject(error);
                else resolve(result.secure_url);
            }
        );
        streamifier.createReadStream(buffer).pipe(uploadStream);
    });
};

async function fetchFinalImage(event_id) {
    const delay = 4000;

    while (true) {
        const response = await axios.get(
            `${process.env.GLAM_IMAGE_URL}${event_id}`,
            {
                headers: {
                    accept: "application/json",
                    "X-API-Key": process.env.GLAM_API_KEY,
                },
            }
        );
        

        const { status, media_urls } = response.data;

        if (status === "READY" && media_urls?.length > 0) {
            return media_urls[0];
        }

        if (status === "FAILED") {
            throw new Error("Image generation failed at Glam.AI");
        }

        await new Promise((resolve) => setTimeout(resolve, delay));
    }
}

exports.generateController = async (req, res) => {
    try {
        const { mask_type } = req.body;
        const mediaFile = req.files?.media?.[0];
        const garmentFile = req.files?.garment?.[0];

        if (!mediaFile || !garmentFile) {
            return res.status(400).json({
                success: false,
                message: 'Both images are required',
            });
        }

        const [media_url, garment_url] = await Promise.all([
            uploadBufferToCloudinary(mediaFile.buffer),
            uploadBufferToCloudinary(garmentFile.buffer),
        ]);

        const glamResponse = await axios.post(
            process.env.GLAM_URL,
            { media_url, garment_url, mask_type },
            {
                headers: {
                    accept: "application/json",
                    "content-type": "application/json",
                    "X-API-Key": process.env.GLAM_API_KEY,
                },
            }
        );

        const event_id = glamResponse.data?.event_id;
        
        if (!event_id) throw new Error("Glam.AI did not return event_id");

        const finalImageUrl = await fetchFinalImage(event_id);

        if (req.user && finalImageUrl) {
            await UserModel.findByIdAndUpdate(
                req.user._id,
                { $push: { imageKeys: finalImageUrl } },
                { new: true }
            );
        }

        return res.status(200).json({
            success: true,
            message: 'Try-On generated successfully',
            event_id,
            finalImageUrl,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error generating try-on image.",
            details: error.response?.data || error.message,
        });
    }
};
