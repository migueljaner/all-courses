import classes from "./Auth.module.css";

import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";

const Auth = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const loginHandler = (event) => {
    event.preventDefault();
    dispatch(authActions.login());
  };

  if (isAuth) {
    return (
      <main className={classes.auth}>
        <section>
          <h1>You are authenticated!</h1>
        </section>
      </main>
    );
  }

  return (
    <main className={classes.auth}>
      <section>
        <form onSubmit={loginHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
          <button>Login</button>
        </form>
      </section>
    </main>
  );
};

export default Auth;
