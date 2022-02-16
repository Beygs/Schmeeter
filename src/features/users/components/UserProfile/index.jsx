import { useGetUserQuery } from "features/api/apiSlice";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

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

  let content;

  if (isLoading) {
    content = "loading";
  } else if (isSuccess) {
    content = <div>{user.username}</div>
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return (
    <section className="UserProfile">
      {content}
    </section>
  );
};

export default UserProfile;
