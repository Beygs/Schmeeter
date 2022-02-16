import { useLoginUserMutation } from "features/api/apiSlice";
import { authLogin } from "features/auth/authSlice";
import Cookies from "js-cookie";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const [loginUser, { isLoading }] = useLoginUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleIdentifierChange = (e) => {
    setIdentifier(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleClick = async () => {
    try {
      const payload = await loginUser({ identifier, password }).unwrap();
      setIdentifier("");
      setPassword("");
      Cookies.set("token", payload.jwt);
      dispatch(authLogin({ userId: payload.user.id }));
      navigate("/");
    } catch (e) {
      console.error("Failed to register user: ", e);
    }
  }

  return (
    <section>
      <h2>Connexion</h2>
      <form>
        <label htmlFor="identifier">Identifiant :</label>
        <input
          type="text"
          id="identifier"
          name="identifier"
          value={identifier}
          onChange={handleIdentifierChange}
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
      <Link to="/register">Je n'ai pas encore de compte</Link>
    </section>
  );
};

export default LoginForm;
