import Comment from "./comment";
import Container from "./container";

const Comments = (props) => {
    return (
    <>
      {props.comments.map((com) => (
        <Comment key={com._id} comment={com} />
      ))}
    </>
  );
};

export default Comments;
