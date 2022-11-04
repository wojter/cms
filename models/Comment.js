import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema({
    post_id: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    body: {
        type: String,
        required: true,
        minLength: [1, 'Body length cannot be less than 1 characters'],
        maxLength: [500, 'Body length cannot be more than 500 characters'],
    },
    created: {
        type: Date,
        required: true,
        default: Date.now(),
    }
});

module.exports = mongoose.models.Comment || mongoose.model('Comment', CommentSchema);