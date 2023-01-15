import PostCategory from "../../../models/PostCategory";
import dbConnect from "../../../lib/db-connect";


export default async function postsCategories(req, res) {
    try {
        await dbConnect();
        const postCategories = await PostCategory.find();

        if (!postCategories) {
            return res.status(400).end("Cannot find posts");
        }

        return res.status(200).send(postCategories);

    } catch (error) {
        console.error(error);
        return res.status(500).end(error.message);
    }
}
