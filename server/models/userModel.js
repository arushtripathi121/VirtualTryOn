const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    image: {
        type: String,
    },
    imageKeys: [
        {
            type: String,
        }
    ],
}, { timestamps: true })

const UserModel = mongoose.model('social-login', userSchema);
module.exports = UserModel;