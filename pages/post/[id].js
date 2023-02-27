import Container from "../../components/front/container";
import CategoryLabel from "../../components/front/catogory";
import Link from "next/link";
import { getPostsIDs, getPost } from "../../lib/front/load-posts";
import parse from "html-react-parser";
import dayjs from "dayjs";
import Navbar from "../../components/front/navbar";
import Footer from "../../components/front/footer";
import {
  getPostComments,
  getPostReactions,
  getReactionCategories,
  getUserReactions,
} from "../../lib/front/comments";
import Comments from "../../components/front/comments";
import { useUser } from "../../lib/hooks";
import { useState } from "react";
import { useToast } from "../../components/admin/providers/toastProvider";
import PostReaction from "../../components/front/postreaction";

const Post = (props) => {
  const post = props.res[0];
  const comments = props.comments;
  // const postReactions = props.postReactions;
  const user = useUser();

  const userReacted = () => {
    if (user) {
      props.userReacted.map((r) => {
        if (r.user_id == user._id) {
          console.log("user reacted");
          // setReacted(true);
          // setSelectedReaction(r.node);
          return true;
        } else {
          console.log("user not reacted");
          // setReacted(false);
          // setSelectedReaction("");
          return false;
        }
      });
    } else {
      console.log("user unlogged");
      // setReacted(false);
      // setSelectedReaction("");
      return false;
    }
  };

  // useEffect((
  //   setReacted(userReacted())
  // ),[user])

  const [isReactionOpen, setIsReactionOpen] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState("");
  const [reacted, setReacted] = useState("");
  const [postReactions, setPostReactions] = useState(props.postReactions);

  function closeModal() {
    setIsReactionOpen(false);
  }

  function openModal() {
    setIsReactionOpen(true);
  }

  // if (user) {
  //   const res = await fetch(`/api/front/userreaction/${user._id}`);
  //   const data = await res.json();
  //   data.map((m) => {
  //     if (m.post_id == post._id) {
  //       console.log("tak")
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   });
  // } else {
  //   return false;
  // }

  const { setToast } = useToast();

  const handleSelectEmoji = async (e) => {
    try {
      const category_id = reactionsList.find((r) => r.key == e).category_id;
      const body = {
        user_id: user._id,
        post_id: post._id,
        category_id: category_id,
      };

      const res = await fetch("/api/front/reactions/find", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!body.user_id) {
        setToast("Please provide user id", false);
        return;
      }
      if (!body.post_id) {
        setToast("Please provide post id", false);
        return;
      }
      const data = await res.json()
      console.log("find response", data)
      if (data.length == 0) {
        try {
          const res2 = await fetch("/api/front/reactions/new", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });
          if (res2.status === 200) {
            setToast("New comment created successfully");
            const res = await fetch(`/api/front/reactions/${post._id}`);
            setPostReactions(await res.json());
            setReacted(true);
            setSelectedReaction(reactionsList.find((el) => el.key == e).node);
            closeModal();
          } else if (res2.status === 400) {
            const msg = await res.text();
            setToast(msg, false);
          } else {
            throw new Error(await res2.text());
          }
        } catch (error) {
          console.log(error);
          setToast(
            "An unexpected error occurred while creating new comment",
            false
          );
        }
      } else {
        try {
          const res = await fetch("/api/front/reactions/update", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });
          if (res.status === 200) {
            setToast("Reaction updated");
            const res = await fetch(`/api/front/reactions/${post._id}`);
            setPostReactions(await res.json());
            setReacted(true);
            setSelectedReaction(reactionsList.find((el) => el.key == e).node);
            closeModal();
          } else if (res.status === 400) {
            const msg = await res.text();
            setToast(msg, false);
          } else {
            throw new Error(await res.text());
          }
        } catch (error) {
          console.log(error);
          setToast("An unexpected error occurred while updating", false);
        }
      }
    } catch (error) {
      console.log(error);
      setToast("An unexpected error occurred while finding reaction", false);
    }
  };

  let reactionsList = props.reactionCategories.map((cat) => {
    const container = {};
    container.category_id = cat._id;
    container.node = cat.node;
    container.key = cat.name;
    container.label = cat.name;
    return container;
  });

  // let reactions = [
  //   { node: <div>👍</div>, label: "like", key: "like" },
  //   { node: <div>❤️</div>, label: "love", key: "love" },
  //   { node: <div>😀</div>, label: "haha", key: "haha" },
  //   { node: <div>😴</div>, label: "wow", key: "wow" },
  //   { node: <div>😷</div>, label: "sad", key: "sad" },
  //   { node: <div>🤢</div>, label: "angry", key: "angry" },
  // ];

  return (
    <>
      <Navbar />
      <Container className="!pt-0">
        <div className="max-w-screen-md mx-auto ">
          <div className="flex text-center justify-center">
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
        {post.thumbnail_url && <img src={post.thumbnail_url} />}
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
      <Container>
        <div className="mt-[-50px] ml-12 mb-12">
          <PostReaction
            isReactionOpen={isReactionOpen}
            reactions={reactionsList}
            onSelect={handleSelectEmoji}
            onClick={openModal}
            reacted={reacted}
            selectedReaction={selectedReaction}
            isLoggedIn={user ? true : false}
          />

          <div className="flex">
            {postReactions.map((p) => {
              return (
                <p key={p.node}>
                  {p.node}
                  {p.count}
                </p>
              );
            })}
            {postReactions.length == 0 && <p>Be first person to react</p>}
          </div>
        </div>
        <Comments
          comments={comments}
          isLoggedIn={user ? true : false}
          user_id={user?._id}
          post_id={post._id}
        />
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
  const comments = await getPostComments(params);
  const reactionCategories = await getReactionCategories();
  const postReactions = await getPostReactions(params);
  const userReacted = await getUserReactions(params);
  return {
    props: { res, comments, reactionCategories, postReactions, userReacted },
  };
}
