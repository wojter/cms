import Footer from "../components/front/footer";
import Navbar from "../components/front/navbar";
import PostList from "../components/front/postlist";
import Container from "../components/front/container";
import { getPosts, getPublicContent } from "../lib/front/load-posts";

const Main = (props) => {
const posts = props.publicContent.front_page_posts_ids.map((e)=>{
  return props.posts.find((p) => p._id == e)
})
  return (
    <div>
      {console.log(posts)}
      <Navbar />
      <Container>
        <div className="grid gap-10 lg:gap-10 md:grid-cols-2 ">
          {posts.slice(0, 2).map((post) => (
            <PostList
              key={post._id}
              post={post}
              aspect="landscape"
              preloadImage={true}
            />
          ))}
        </div>
        <div className="grid gap-10 mt-10 lg:gap-10 md:grid-cols-2 xl:grid-cols-3 ">
          {posts.slice(2).map((post) => (
            <PostList
            key={post._id}
            post={post}
            aspect="landscape"
            preloadImage={true}
          />
          ))}

        </div>
      </Container>
      <Footer />
    </div>
  );
};

export async function getStaticProps() {
  const posts = await getPosts();
  const publicContent = await getPublicContent();
  return {
    props: { posts, publicContent },
  };
}

export default Main;
