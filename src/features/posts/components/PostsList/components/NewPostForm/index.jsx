import { useAddNewPostMutation } from "features/api/apiSlice";
import { myId } from "features/auth/authSlice";
import { useState } from "react";
import { useSelector } from "react-redux";

const NewPostForm = () => {
  const [text, setText] = useState("");
  const userId = useSelector((state) => myId(state));

  const [addNewPost, { isLoading }] = useAddNewPostMutation();

  const handleTextChange = (e) => {
    setText(e.target.value.slice(0, 141));
  }

  const canSave = Boolean(text) && !isLoading;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (canSave) {
      try {
        await addNewPost({ text, user: userId });
        setText("");
      } catch (e) {
        console.error("Error: ", e);
      }
    }
  }

  return (
    <section>
      <h2>Ecrire un shmeet</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="postText">Shmeet :</label>
        <input
          type="text"
          id="postText"
          name="postText"
          value={text}
          onChange={handleTextChange}
        />
        <input type="submit" disabled={!canSave} value="Poster le shmeet" />
      </form>
    </section>
  );
};

export default NewPostForm;
