import "./SingleItem.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../Store/cart/cart-reducer";

const SingleItem = (props) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [showAdd, setShowAdd] = useState(false);
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

      let totalCost = 0
      newArr.forEach(element=>{
        totalCost = totalCost + element.totalPrice
      })

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
    <img className="singleItem-cntnr-product-image" src={props.item.src} alt='' width='100%' height='300'/>
      <div>{props.item.name}</div>
      <div>Price: {props.item.price}</div>
      {showAdd && <p onClick={addItemToCartHandler}>Add to cart</p>}
    </div>
  );
};

export default SingleItem;
