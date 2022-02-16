import TimeAgo from "features/posts/components/TimeAgo";
import { useSelector } from "react-redux";
import { myId, selectAuth } from "features/auth/authSlice";
import { Link } from "react-router-dom";
import EditPostForm from "features/posts/components/EditPostForm";
import { useState } from "react";
import { useDeletePostMutation } from "features/api/apiSlice";

const PostExcerpt = ({ post }) => {
  const [edit, setEdit] = useState(false);

  const isAuth = useSelector((state) => selectAuth(state));
  const userId = useSelector((state) => myId(state));

  const [deletePost] = useDeletePostMutation();

  const {
    id,
    user,
    text,
    like,
    created_at,
  } = post;

  const handleEdit = () => {
    setEdit(true);
  }

  const handleDelete = () => {
    deletePost(id);
  }

  return (
    <article className="post-excerpt" key={post.id}>
      {isAuth && 
      <Link to={userId === user.id ? "/profile" : `/users/${user.id}`}>
        {user.username}
      </Link>}
      {userId === user.id && (
        <span className="actions">
          <button onClick={handleEdit}>Editer</button>
          <button type="button" onClick={handleDelete}>Supprimer</button>
        </span>
      )}
      <p>
        {text}
      </p>
      {isAuth && <p>{like} likes</p>}
      <TimeAgo timestamp={created_at} />
      {edit && <EditPostForm post={post} setEdit={setEdit} />}
    </article>
  );
};

export default PostExcerpt;
