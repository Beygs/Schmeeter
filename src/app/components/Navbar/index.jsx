import { selectAuth } from "features/auth/authSlice";
import { authLogout } from "features/auth/authSlice";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const isAuth = useSelector((state) => selectAuth(state));
  const dispatch = useDispatch();

  const handleClick = () => {
    Cookies.remove("token");
    dispatch(authLogout());
  }

  let content = <button type="button" onClick={handleClick}>Déconnexion</button>;
  
  if (!isAuth) {
    content = <NavLink to="/login">Connexion</NavLink>
  }

  return (
    <nav>
      <section>
        <h1>Tweeter</h1>

        <div className="navContent">
          <div className="navLinks">
            <NavLink to="/">Accueil</NavLink>
            {content}
          </div>
        </div>
      </section>
    </nav>
  );
};

export default Navbar;
