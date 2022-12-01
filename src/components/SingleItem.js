import "./SingleItem.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../Store/cart/cart-reducer";
import favInactive from "./cart/images/heart.png";
import favActive from "./cart/images/favoriteActive.png";
import { profileActions } from "../Store/profile/profile-reducer";

const SingleItem = (props) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const favItems = useSelector((state) => state.profile.favorite);
  const [showAdd, setShowAdd] = useState(false);
  const [fav, setFav] = useState(false);
  const dispatch = useDispatch();

  const addItemToCartHandler = () => {
    const idx = cartItems.findIndex((itm) => itm.name === props.item.name);
    if (idx !== -1) {
      // if item is already existing, increasing the quantity

      const newArr = [...cartItems];
      newArr[idx] = {
        ...cartItems[idx],
        qty: cartItems[idx].qty + 1,
        totalPrice: cartItems[idx].price + cartItems[idx].totalPrice,
      };

      let totalCost = 0;
      newArr.forEach((element) => {
        totalCost = totalCost + element.totalPrice;
      });

      dispatch(cartActions.addItem({ arr: [...newArr], cartTotal: totalCost }));
    } else {
      // if item is not already existing

      const item = { ...props.item, qty: 1, totalPrice: props.item.price };
      let totalCost = 0;

      cartItems.forEach((element) => {
        totalCost = totalCost + element.totalPrice;
      });

      // console.log(totalCost);

      dispatch(
        cartActions.addItem({
          arr: [...cartItems, item],
          cartTotal: totalCost + item.price,
        })
      );
    }
  };

  const addToFavoriteHandler = () => {
    const idx = favItems.findIndex((itm) => itm.name === props.item.name);
    if (idx === -1) {
      dispatch(profileActions.addFav({ arr: [...favItems, props.item] }));
    }else{
      const newFavArr = favItems.filter((itm)=> itm.name !== favItems[idx].name)
      dispatch(profileActions.addFav({arr: newFavArr}))
    }

    setFav((prev) => !prev);
  };

  return (
    <div
      key={props.item.id}
      className="singleItem-cntnr"
      onMouseEnter={() => {
        setShowAdd(() => true);
      }}
      onMouseLeave={() => {
        setShowAdd(() => false);
      }}
    >
      <>
        {!fav ? (
          <img
            className="fav-icon-inactive-active-place"
            src={favInactive}
            alt=""
            width="55"
            onClick={addToFavoriteHandler}
          />
        ) : (
          <img
            className="fav-icon-inactive-active-place"
            src={favActive}
            alt=""
            width="55"
            onClick={addToFavoriteHandler}
          />
        )}
      </>

      <img
        className="singleItem-cntnr-product-image"
        src={props.item.src}
        alt=""
        width="100%"
        height="300"
      />
      <div>{props.item.name}</div>
      <div>Price: {props.item.price}</div>
      {showAdd && <p onClick={addItemToCartHandler}>Add to cart</p>}
    </div>
  );
};

export default SingleItem;
