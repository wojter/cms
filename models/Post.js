import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    category_id: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    title: {
        type: String,
        required: true,
        minLength: [3, 'Title length cannot be less than 3 characters'],
        maxLength: [100, 'Title length cannot be more than 100 characters'],
    },
    body: {
        type: String,
        required: true,
        minLength: [5, 'Body length cannot be less than 5 characters'],
        maxLength: [2000, 'Body length cannot be more than 2000 characters'],
    },
    created: {
        type: Date,
        required: true,
        default: Date.now(),
    }
});

module.exports = mongoose.models.Post || mongoose.model('Post', PostSchema);