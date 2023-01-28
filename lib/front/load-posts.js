export async function getPosts() {
    const res = await fetch(`${process.env.API_URL}/api/front/posts`);
    const data = await res.json();
    
    return data
}
export async function getPostCategories() {
    const res = await fetch(`/api/front/postcategories`);
    const data = await res.json();
    
    return data
}
export async function getPostsIDs() {
    const res = await fetch(`${process.env.API_URL}/api/front/posts_ids`);
    const data = await res.json();

    return data
}
export async function getPost(params) {
    const res = await fetch(`${process.env.API_URL}/api/front/posts/${params.id}`);
    const data = await res.json();

    return data
}

export async function getPublicContent() {
    const res = await fetch(`${process.env.API_URL}/api/front/publiccontent`);
    const data = await res.json();

    return data
}