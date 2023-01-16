import Container from "../../components/front/container";
import CategoryLabel from "../../components/front/catogory";
import Image from "next/image";
import Link from "next/link";
import { getPostsIDs, getPost } from "../../lib/front/load-posts";
import parse from "html-react-parser";
import dayjs from "dayjs";
import Navbar from "../../components/front/navbar";
import Footer from "../../components/front/footer";

const Post = (props) => {
  const post = props.res[0];

  const imageProps = { src: "/sample_photo.jpeg" };

  return (
    <>
      <Navbar />
      <Container className="!pt-0">
        <div className="max-w-screen-md mx-auto ">
          <div className="text-center">
            <CategoryLabel category={post?.category} />
          </div>

          <h1 className="mt-2 mb-3 text-3xl font-semibold tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl dark:text-white">
            {post?.title}
          </h1>

          <div className="flex justify-center mt-3 space-x-3 text-gray-500 ">
            <div className="flex items-center gap-3">
              <div>
                <p className="text-gray-800 dark:text-gray-400">
                  {post?.author}
                </p>
                <div className="flex items-center space-x-2 text-sm">
                  <time
                    className="text-gray-500 dark:text-gray-400"
                    dateTime={post?.created}
                  >
                    {dayjs(post?.created).format("DD MMMM YYYY")}
                  </time>
                  <span>· {post?.estReadingTime || "5"} min read</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <div className="relative z-0 max-w-screen-lg mx-auto overflow-hidden lg:rounded-lg aspect-video">
        {imageProps && (
          <Image
            src={imageProps.src}
            loader={imageProps.loader}
            // blurDataURL={imageProps.blurDataURL}
            alt={post?.mainImage?.alt || "Thumbnail"}
            // placeholder="blur"
            layout="fill"
            loading="eager"
            objectFit="cover"
          />
        )}
      </div>

      <Container>
        <article className="max-w-screen-md mx-auto ">
          <div className="mx-auto my-3 prose prose-base dark:prose-invert prose-a:text-blue-500">
            {parse(post?.body)}
          </div>
          <div className="flex justify-center mt-7 mb-7">
            <Link href="/">
              <a className="px-5 py-2 text-sm text-blue-600 rounded-full dark:text-blue-500 bg-brand-secondary/20 ">
                ← View all posts
              </a>
            </Link>
          </div>
        </article>
      </Container>
      <Footer />
    </>
  );
};

export default Post;

export async function getStaticPaths() {
  const allPosts = await getPostsIDs();

  const paths = allPosts.map((post) => ({
    params: { id: post._id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const res = await getPost(params);

  return {
    props: { res },
  };
}
