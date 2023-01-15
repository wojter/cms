import Container from "../../components/front/container";
import CategoryLabel from "../../components/front/catogory";
import Image from "next/image";
import Link from "next/link";

const Post = (props) => {
  const post = {
    category: "Technology",
    title:
      "Architectural Engineering Wonders of the modern era for your Inspiration",
    author: "Mario Sanchez",
    createdAt: "12.12.2022",
  };
  const imageProps = { src: "/sample_photo.jpeg" };

  return (
    <>
          {/*
          <div className="relative bg-white/20">
            <div className="absolute w-full h-full -z-10">
              {post?.mainImage && (
                <Image
                  {...GetImage(post.mainImage)}
                  alt={post.mainImage?.alt || "Thumbnail"}
                  layout="fill"
                  objectFit="cover"
                />
              )}
            </div>
            <Container className="py-48">
              <h1 className="relative max-w-3xl mx-auto mb-3 text-3xl font-semibold tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl after:absolute after:w-full after:h-full after:bg-white after:inset-0 after:-z-10 after:blur-2xl after:scale-150">
                {post.title}
              </h1>
            </Container>
          </div> */}

          <Container className="!pt-0">
            <div className="max-w-screen-md mx-auto ">
              <div className="text-center">
                <CategoryLabel category={post.category} />
              </div>

              <h1 className="mt-2 mb-3 text-3xl font-semibold tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl dark:text-white">
                {post.title}
              </h1>

              <div className="flex justify-center mt-3 space-x-3 text-gray-500 ">
                <div className="flex items-center gap-3">
                  {/* <div className="relative flex-shrink-0 w-10 h-10">
                    {AuthorimageProps && (
                      <Image
                        src={AuthorimageProps.src}
                        blurDataURL={AuthorimageProps.blurDataURL}
                        loader={AuthorimageProps.loader}
                        objectFit="cover"
                        alt={post?.author?.name}
                        placeholder="blur"
                        layout="fill"
                        className="rounded-full"
                      />
                    )}
                  </div> */}
                  <div>
                    <p className="text-gray-800 dark:text-gray-400">
                      {post.author}
                    </p>
                    <div className="flex items-center space-x-2 text-sm">
                      <time
                        className="text-gray-500 dark:text-gray-400"
                        dateTime={
                          post?.publishedAt || post._createdAt
                        }>
                            {post.createdAt}
                        {/* {format(
                          parseISO(
                            post?.publishedAt || post._createdAt
                          ),
                          "MMMM dd, yyyy"
                        )} */}
                      </time>
                      <span>
                        · {post.estReadingTime || "5"} min read
                      </span>
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
                alt={post.mainImage?.alt || "Thumbnail"}
                // placeholder="blur"
                layout="fill"
                loading="eager"
                objectFit="cover"
              />
            )}
          </div>

          {/* {post?.mainImage && <MainImage image={post.mainImage} />} */}
          <Container>
            <article className="max-w-screen-md mx-auto ">
              <div className="mx-auto my-3 prose prose-base dark:prose-invert prose-a:text-blue-500">
                {post.body && <PortableText value={post.body} />}
              </div>
              <div className="flex justify-center mt-7 mb-7">
                <Link href="/main">
                  <a className="px-5 py-2 text-sm text-blue-600 rounded-full dark:text-blue-500 bg-brand-secondary/20 ">
                    ← View all posts
                  </a>
                </Link>
              </div>
              {/* {post.author && <AuthorCard author={post.author} />} */}
            </article>
          </Container>
          
    </>
  );
};

export default Post;
