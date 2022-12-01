import React from "react";
import Cart from "../cart/Cart";
import "./Header.css";
import heart from "../cart/images/favoriteActive.png";
import { useSelector } from "react-redux";

const Header = () => {
  const favItems = useSelector((state) => state.profile.favorite);
  return (
    <div className="header-outer-dv">
      <button className="favorite-btn-header">
        <img src={heart} alt="" width="30" />
        <div>{favItems.length? favItems.length: ''}</div>
      </button>
      <Cart />
    </div>
  );
};

export default Header;
