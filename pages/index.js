import Footer from "../components/front/footer";
import Navbar from "../components/front/navbar";
import PostList from "../components/front/postlist";
import Container from "../components/front/container";
import { getPosts } from "../lib/front/load-posts";

const Main = (props) => {

  return (
    <div>
      <Navbar />
      <Container>
        <div className="grid gap-10 lg:gap-10 md:grid-cols-2 ">
          {props.posts.slice(0, 2).map((post) => (
            <PostList
              key={post._id}
              post={post}
              aspect="landscape"
              preloadImage={true}
            />
          ))}
        </div>
        <div className="grid gap-10 mt-10 lg:gap-10 md:grid-cols-2 xl:grid-cols-3 ">
          {props.posts.slice(2).map((post) => (
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

  return {
    props: { posts },
  };
}

export default Main;
