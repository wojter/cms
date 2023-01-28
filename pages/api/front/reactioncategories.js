import ReactionCategory from "../../../models/ReactionCategory";
import dbConnect from "../../../lib/db-connect";


export default async function reactionCategories(req, res) {
    try {
        await dbConnect();
        const reactionCategories = await ReactionCategory.find();

        if (!reactionCategories) {
            return res.status(400).end("Cannot find reactions");
        }

        return res.status(200).send(reactionCategories);

    } catch (error) {
        console.error(error);
        return res.status(500).end(error.message);
    }
}
