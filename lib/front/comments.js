export async function getPostComments(params) {
    const res = await fetch(`${process.env.API_URL}/api/front/comments/${params.id}`);
    const data = await res.json();

    return data
}

export async function getReactionCategories() {
    const res = await fetch(`${process.env.API_URL}/api/front/reactioncategories`);
    const data = await res.json();

    return data
}

export async function getPostReactions(params) {
    const res = await fetch(`${process.env.API_URL}/api/front/reactions/${params.id}`);
    const data = await res.json();

    return data
}

export async function getUserReactions(params) {
    const res = await fetch(`${process.env.API_URL}/api/front/userreaction/${params.id}`);
    const data = await res.json();

    return data
}