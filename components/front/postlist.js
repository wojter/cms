import Image from "next/image";
import Link from "next/link";
// import { PhotographIcon } from "@heroicons/react/outline";
import CategoryLabel from "./catogory";
import dayjs from "dayjs";

const PostList = ({ post, aspect, preloadImage }) => {
  const imageProps = { src: "/sample_photo.jpeg" };
  return (
    <>
      <div className="cursor-pointer group">
        <div
          className={`relative overflow-hidden transition-all bg-gray-100 rounded-md dark:bg-gray-800   hover:scale-105 
          ${aspect === "landscape" ? "aspect-video" : "aspect-square"}`}
        >
          <Link href={`/post/${post._id}`}>
            <a>
              {post.thumbnail_url ? (
                <img src={post.thumbnail_url} />
              ) : (
                <span className="absolute w-16 h-16 text-gray-200 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                  {/* <PhotographIcon /> */}XX
                </span>
              )}
            </a>
          </Link>
        </div>
        <CategoryLabel category={post?.category} />
        <h2 className="mt-2 text-lg font-semibold tracking-normal text-brand-primary dark:text-white">
          <Link href="#">
            <span
              className="     bg-gradient-to-r from-green-200 to-green-100 dark:from-purple-800 dark:to-purple-900
            bg-[length:0px_10px]
            bg-left-bottom
            bg-no-repeat
            transition-[background-size]
            duration-500
            hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px]"
            >
              {post?.title}
            </span>
          </Link>
        </h2>
        <div className="flex items-center mt-3 space-x-3 text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-3">
            <span className="text-sm">{post?.author}</span>
          </div>
          <span className="text-xs text-gray-300 dark:text-gray-600">
            &bull;
          </span>
          <time className="text-sm" dateTime={post?.created}>
            {dayjs(post?.created).format("DD/MM/YYYY")}
          </time>
        </div>
      </div>
    </>
  );
};

export default PostList;
