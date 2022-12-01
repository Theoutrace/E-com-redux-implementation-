import React from "react";
import Cart from "../cart/Cart";
import "./Header.css";
import heart from "../cart/images/favoriteActive.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../Store/auth/auth-reducer";

const Header = () => {
  const authContent = useSelector((state) => state.auth.login);
  const favItems = useSelector((state) => state.profile.favorite);
  const dispatch = useDispatch();
  const history = useNavigate();

  const loginSignupHandler = () => {
    history("/login");
  };

  const logoutHandler = () => {
    dispatch(authActions.logout());
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    history("/login");
  };
  return (
    <div className="header-outer-dv">
      {authContent && favItems.length>0 && (
        <button className="favorite-btn-header">
          <img src={heart} alt="" width="30" />
          <div>{favItems.length>0 ? favItems.length : ""}</div>
        </button>
      )}
      {authContent && <Cart />}
      {!authContent ? (
        <div className="login-btn-cntnr">
          <button onClick={loginSignupHandler}>Login</button>
        </div>
      ) : (
        <div className="login-btn-cntnr">
          <button onClick={logoutHandler}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Header;
