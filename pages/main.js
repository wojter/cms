import Footer from "../components/front/footer";
import Navbar from "../components/front/navbar";
import PostList from "../components/front/postlist";
import Container from "../components/front/container";
import { getPosts, getPostCategories } from "../lib/front/load-posts";


const Main = (props) => {
  const post = {
    category: "Technology",
    title:
      "Architectural Engineering Wonders of the modern era for your Inspiration",
    author: "Mario Sanchez",
    createdAt: "12.12.2022",
  };

  return (
    <div>
      <Navbar />
      <Container>
        <div className="grid gap-10 lg:gap-10 md:grid-cols-2 ">
          <PostList post={props.posts[0]} aspect="landscape" preloadImage={true} />
          <PostList post={post} aspect="landscape" preloadImage={true} />
        </div>
        <div className="grid gap-10 mt-10 lg:gap-10 md:grid-cols-2 xl:grid-cols-3 ">
          <PostList post={post} aspect="landscape" preloadImage={true} />
          <PostList post={post} aspect="landscape" preloadImage={true} />
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export async function getStaticProps() {
  // const res = await fetch('http://localhost:3000/api/front/posts');
  // const posts = await res.json()
  // console.log(posts)
  const posts = await getPosts();
  console.log(posts)
  return {
    props: { posts },
  }
}

export default Main;
