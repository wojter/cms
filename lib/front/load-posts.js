export async function getPosts() {
    const res = await fetch(`${process.env.API_URL}/api/front/posts`);
    const data = await res.json();

    return data
}
export async function getPostCategories() {
    const res = await fetch(`${process.env.API_URL}/api/front/postcategories`);
    const data = await res.json();

    return data
}