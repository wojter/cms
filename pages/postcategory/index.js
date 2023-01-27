import Footer from "../../components/front/footer";
import Navbar from "../../components/front/navbar";
import PostList from "../../components/front/postlist";
import Container from "../../components/front/container";
import { getPosts } from "../../lib/front/load-posts";
import { useRouter } from "next/router";

const Main = (props) => {
  const router = useRouter();
  const { id } = router.query;
  const posts = props.posts.filter((el) => {
    return el.category == id;
  });

  return (
    <div>
      <Navbar />
      <Container className="mt-0 pt-0">
        <h1 className="mt-[-30px] mb-3 text-3xl font-semibold tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl dark:text-white capitalize">
          {id}
        </h1>
        <h2 className="mt-2 mb-10 text-base font-normal tracking-tight text-center lg:leading-snug text-brand-primary lg:text-2xl dark:text-white">
          {posts.length}
          {posts.length == 1 ? " Article" : " Articles"}
        </h2>

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

  return {
    props: { posts },
  };
}

export default Main;
