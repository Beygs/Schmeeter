import { useRegisterUserMutation } from "features/api/apiSlice";
import { authLogin } from "features/auth/authSlice";
import Cookies from "js-cookie";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleClick = async () => {
    try {
      const payload = await registerUser({ username, email, password }).unwrap();
      setUsername("");
      setPassword("");
      setEmail("");
      Cookies.set("token", payload.jwt);
      dispatch(authLogin({ userId: payload.user.id }));
      navigate("/");
    } catch (e) {
      console.error("Failed to register user: ", e);
    }
  }

  return (
    <section>
      <h2>S'enregistrer</h2>
      <form>
        <label htmlFor="username">Nom d'utilisateur :</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
        <label htmlFor="password">Mot de passe :</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button
          type="button"
          onClick={handleClick}
        >
          Lezgo !
        </button>
      </form>
      <Link to="/login">J'ai déjà un compte</Link>
    </section>
  );
};

export default RegisterForm;
