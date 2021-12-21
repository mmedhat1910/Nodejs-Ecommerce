const { model, Schema } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false,
        default: null
    },
    phoneNumber: {
        type: String,
        required: false,
        default: null
    }
});

const UserModel = model('user', UserSchema);


module.exports = UserModel