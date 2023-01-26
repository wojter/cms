export async function getPostComments(params) {
    const res = await fetch(`${process.env.API_URL}/api/front/comments/${params.id}`);
    const data = await res.json();

    return data
}