import { useEditProfileMutation, useGetUserQuery } from "features/api/apiSlice";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const EditProfileForm = () => {
  const myId = useSelector((state) => state.auth.id);

  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserQuery(myId);

  const [editProfile]= useEditProfileMutation();

  const [username, setUsername] = useState(user.username);
  const [description, setDescription] = useState(user.description ?? "");

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  }

  const handleSubmit = () => {
    if (username && description) {
      editProfile({ ...user, username, description });
      navigate("/profile");
    }
  }

  let content;

  if (isLoading) {
    content = "loading";
  } else if (isSuccess) {
    content = (
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Nom d'utilisateur</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          value={description}
          onChange={handleDescriptionChange}
        />
        
      </form>
    );
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }
  
  return (
    <section>
      <h2>Editer le profil</h2>
      {content}
    </section>
  );
};

export default EditProfileForm;
