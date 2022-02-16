import { useEditPostMutation } from "features/api/apiSlice";
import { useState } from "react";

const EditPostForm = ({ post, setEdit }) => {
  const [text, setText] = useState(post.text);

  const [editPost, { isLoading }] = useEditPostMutation();

  const handleTextChange = (e) => {
    setText(e.target.value.slice(0, 141));
  }

  const canSave = Boolean(text) && !isLoading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (canSave) {
      try {
        await editPost({ ...post, text: text });
        setEdit(false);
      } catch (e) {
        console.error("Error: ", e);
      }
    }
  }

  return (
    <section>
      <h2>Editer</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="postText">Shmeet :</label>
        <input
          type="text"
          id="postText"
          name="postText"
          value={text}
          onChange={handleTextChange}
        />
        <input type="submit" disabled={!canSave} value="Editer" />
      </form>
    </section>
  );
};

export default EditPostForm;
