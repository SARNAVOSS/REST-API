const mongoose = require('mongoose')
const bcrypt = require("bcrypt");

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    company: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    image_url: {
        type: String,
        default: "https://res.cloudinary.com/dcew0uqhb/image/upload/v1675523956/Arcade/appleLogo_ffdya1.png"
    },
    phone: {
        type: Number,
        required: true,
    }
}, { timestamps: true })


companySchema.methods = {
    authenticate: async function (pass) {
        return await bcrypt.compare(pass, this.password);
    },
};
module.exports = mongoose.model('Company', companySchema)