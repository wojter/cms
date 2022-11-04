import mongoose from 'mongoose'

const ReactionSchema = new mongoose.Schema({
    post_id: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    reaction_category_id: {
        type: mongoose.Types.ObjectId,
        required: true,
    }
});

module.exports = mongoose.models.Reaction || mongoose.model('Reaction', ReactionSchema);