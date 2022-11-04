import mongoose from 'mongoose'

const emailRe = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const validateEmail = function(email) {
    return emailRe.test(email);
}

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minLength: [3, 'Email length cannot be less than 3 characters'],
        maxLength: [100, 'Email length cannot be more than 100 characters'],
        validate: [validateEmail, 'Please fill a valid email, address'],
        match: [emailRe, 'Please fill a valid email, address'],
    },
    hash: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        minLength: [3, 'Username length cannot be less than 3 characters'],
        maxLength: [100, 'Username length cannot be more than 100 characters'],
    },
    created: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    is_admin: {
        type: Boolean,
        required: true,
        default: false,
    }
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);