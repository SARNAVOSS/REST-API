const mongoose = require('mongoose')
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    user_name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    image_url: {
        type: String,
        default: "https://res.cloudinary.com/dcew0uqhb/image/upload/v1675523962/Arcade/usain_z5xk4h.jpg",
    },
    phone: {
        type: Number,
        required: true,
    }
}, { timestamps: true })


userSchema.methods = {
    authenticate: async function (pass) {
        return await bcrypt.compare(pass, this.password);
    },
};


module.exports = mongoose.model('User', userSchema)