const express = require('express');
const { googleLogin } = require('../controllers/authController');
const { verifyToken } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/google', googleLogin);

router.get("/protected", verifyToken, (req, res) => {
  res.json({
    success: true,
    message: "Access granted",
    user: req.user,
  });
});

module.exports = router;