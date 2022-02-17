import TimeAgo from "features/posts/components/TimeAgo";
import { useSelector } from "react-redux";
import { myId, selectAuth } from "features/auth/authSlice";
import { Link } from "react-router-dom";
import EditPostForm from "features/posts/components/EditPostForm";
import { useState } from "react";
import { useDeletePostMutation, useEditPostMutation } from "features/api/apiSlice";

const PostExcerpt = ({ post }) => {
  const [edit, setEdit] = useState(false);

  const isAuth = useSelector((state) => selectAuth(state));
  const userId = useSelector((state) => myId(state));

  const [editPost, { isLoading }] = useEditPostMutation();
  const [deletePost] = useDeletePostMutation();

  const {
    id,
    user,
    text,
    like,
    created_at,
    modified,
  } = post;

  const handleEdit = () => {
    setEdit(true);
  }

  const handleDelete = () => {
    deletePost(id);
  }

  const handleLike = () => {
    const newPost = { ...post };

    if (newPost.users_likes.filter((user) => user.id === userId).length > 0) {
      newPost.like--;
      newPost.users_likes = newPost.users_likes.filter((user) => user.id !== userId);
    } else {
      newPost.like++;
      newPost.users_likes = newPost.users_likes.concat(userId);
    }
    
    editPost(newPost);
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
        {text}{modified && <i>&nbsp;(Modifié)</i>}
      </p>
      {isAuth && (
        <button
          type="button"
          className="like-btn"
          onClick={handleLike}
        >
          {like} 👍
        </button>)}
      <TimeAgo timestamp={created_at} />
      {edit && <EditPostForm post={post} setEdit={setEdit} />}
    </article>
  );
};

export default PostExcerpt;
