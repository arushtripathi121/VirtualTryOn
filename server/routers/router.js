const express = require('express');
const { googleLogin } = require('../controllers/authController');
const { verifyToken } = require('../middlewares/authMiddleware');
const router = express.Router();
const multer = require('multer');
const { generateController } = require('../controllers/generatorController');

const upload = multer({ storage: multer.memoryStorage() });

router.get('/google', googleLogin);

router.get("/protected", verifyToken, (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized — User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Access granted",
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        image: req.user.image,
      },
    });
  } catch (error) {
    console.error("Protected route error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

router.post('/generate', verifyToken,
  upload.fields([
    { name: "media", maxCount: 1 },
    { name: "garment", maxCount: 1 },
  ]),
  generateController
)

module.exports = router;