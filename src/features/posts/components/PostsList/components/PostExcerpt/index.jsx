import TimeAgo from "features/posts/components/TimeAgo";
import { useSelector } from "react-redux";

const PostExcerpt = ({ post }) => {
  const isAuth = useSelector((state) => selectAut(state))
  return (
    <article>
      <p>{post.user.username}</p>
      <p>{post.text}</p>
      <p>{post.like} likes</p>
      <TimeAgo timestamp={post.updated_at} />
    </article>
  );
};

export default PostExcerpt;
