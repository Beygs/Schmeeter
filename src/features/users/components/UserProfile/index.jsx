import { useGetUserQuery } from "features/api/apiSlice";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const UserProfile = ({ myprofile }) => {
  const params = useParams();
  const myId = useSelector((state) => state.auth.id);

  const userId = myprofile ? myId : params.userId;

  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserQuery(userId);

  const handleClick = () => {
    console.log("éditer")
  }

  let content;

  if (isLoading) {
    content = "loading";
  } else if (isSuccess) {
    content = (
      <div className="user-info">
        <div>{user.username}</div>
        <div>{user.description}</div>
      </div>
    )
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return (
    <section className="UserProfile">
      <h2>{myprofile ? "Mon profil" : `Profil de ${user.username}`}</h2>
      {myprofile && <Link to="/profile/edit">Editer mes informations</Link>}
      {content}
    </section>
  );
};

export default UserProfile;
