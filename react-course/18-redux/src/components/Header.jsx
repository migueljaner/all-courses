import classes from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";

const Header = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  const toggleAuthContent = () => {
    if (isAuth) {
      return (
        <ul>
          <li>
            <a href="/">My Products</a>
          </li>
          <li>
            <a href="/">My Sales</a>
          </li>
          <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>
        </ul>
      );
    }
    if (!isAuth) {
      return (
        <ul>
          <li>
            <p> Please log in!</p>
          </li>
        </ul>
      );
    }
  };

  return (
    <header className={classes.header}>
      <h1>Redux Auth</h1>
      <nav>{toggleAuthContent()}</nav>
    </header>
  );
};

export default Header;
