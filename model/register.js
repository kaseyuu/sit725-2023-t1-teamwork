const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    Username: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    confPassword: {
        type: String,
        required: true
    },
    verified: {
        type:Boolean
    }
})

//collection
const Register = new mongoose.model("users", userSchema);

module.exports = Register;