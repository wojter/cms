import Link from "next/link";
import Comment from "./comment";
import Container from "./container";
import { Button, Label, Textarea, TextInput } from "flowbite-react";
import { useToast } from "../admin/providers/toastProvider";
import { useRefetch } from "../admin/providers/refetchProvider";
import { useState } from "react";

const Comments = (props) => {
  const { setToast } = useToast();
  const { refetch } = useRefetch();

  const [comments, setComments] = useState(props.comments);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = {
        user_id: props.user_id,
        post_id: props.post_id,
        body: e.target["comment"].value,
      };
      console.log(body.body);
      if (!body.user_id) {
        setToast("Please provide user id", false);
        return;
      }
      if (!body.post_id) {
        setToast("Please provide post id", false);
        return;
      }
      const res = await fetch("/api/front/comments/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        setToast("New comment created successfully");
        const res = await fetch(`/api/front/comments/${props.post_id}`)
        setComments(await res.json());
      } else if (res.status === 400) {
        const msg = await res.text();
        setToast(msg, false);
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.log(error);
      setToast(
        "An unexpected error occurred while creating new comment",
        false
      );
    }
  };

  return (
    <>
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            Discussion ({props.comments.length})
          </h2>
        </div>
        {props.isLoggedIn ? (
          <form className="mb-6" onSubmit={handleSubmit}>
            <div className="mb-2 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <Label as="comment" className="sr-only">
                Your comment
              </Label>
              <Textarea
                id="comment"
                name="comment"
                rows="3"
                className="px-2 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Write a comment..."
                required={true}
              ></Textarea>
            </div>
            <Button
              type="submit"
              className="inline-flex items-center text-xs font-semibold text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              Post comment
            </Button>
          </form>
        ) : (
          <div className="bg-slate-100 px-6 py-12 mr-2 text-center rounded-lg">
            <p>
              You have to{" "}
              <Link href={"/login"}>
                <a className="underline underline-offset-4 text-cyan-800">
                  log in
                </a>
              </Link>{" "}
              to comment
            </p>
          </div>
        )}
      {console.log("comments", comments)}
        {comments && comments.map((com) => (
          <Comment key={com._id} comment={com} />
        ))}
      </div>
    </>
  );
};

export default Comments;
