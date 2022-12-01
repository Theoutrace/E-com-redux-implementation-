import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../Store/cart/cart-reducer";
import min from "./images/minus.png";
import plus from "./images/plus.png";
import del from "./images/remove.png";

import "./Cart.css";

const CartSingleItem = (props) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const addQtyHandler = () => {
    const newArr = [...cartItems];
    const idx = cartItems.findIndex((itm) => itm.name === props.item.name);
    newArr[idx] = {
      ...newArr[idx],
      qty: newArr[idx].qty + 1,
      totalPrice: props.item.totalPrice + props.item.price,
    };

    let totalCost = 0;
    newArr.forEach((element) => {
      totalCost = totalCost + element.totalPrice;
    });
    dispatch(cartActions.addItem({ arr: [...newArr], cartTotal: totalCost }));
  };

  const subtractQtyHandler = () => {
    const newArr = [...cartItems];
    const idx = cartItems.findIndex((itm) => itm.name === props.item.name);
    if (newArr[idx].qty > 1) {
      newArr[idx] = {
        ...newArr[idx],
        qty: newArr[idx].qty - 1,
        totalPrice: props.item.totalPrice - props.item.price,
      };
      let totalCost = 0;
      newArr.forEach((element) => {
        totalCost = totalCost + element.totalPrice;
      });
      dispatch(cartActions.addItem({ arr: newArr, cartTotal: totalCost }));
    } else {
      deleteItemFromCartHandler();
    }
  };

  const deleteItemFromCartHandler = () => {
    const remainingItems = cartItems.filter(
      (itm) => itm.name !== props.item.name
    );
    let totalCost = 0;
    remainingItems.forEach((element) => {
      totalCost = totalCost + element.totalPrice;
    });
    dispatch(
      cartActions.addItem({ arr: remainingItems, cartTotal: totalCost })
    );
  };
  return (
    <div className="single-itm-cart-cntnr">
      <div className="dv-img-cntnr-cart-singl-itm">
        <img src={props.item.src} alt="" width="150" height="150" />
      </div>
      <div className="dv-details-cntnr-cart-singl-itm">
        <div className="dv-details-name-cntnr-cart-singl-itm">
          {props.item.name}
        </div>
        <div className="dv-details-price-cntnr-cart-singl-itm">
          Price : ₹ {props.item.price}
        </div>
        <div className="dv-details-qty-cntnr-cart-singl-itm">
          Qunatity : {props.item.qty}
        </div>
      </div>
      <div className="minus-plus-btn-cntnr">
        <button onClick={subtractQtyHandler}>
          <img src={min} alt="" width="25" />
        </button>
        <button onClick={addQtyHandler} className="minus-plus-btn-cntnr-button">
          <img src={plus} alt="" width="25" />
        </button>
      </div>

      <div className="total-price-text-per-itm-cart">
        ₹ {props.item.totalPrice}
      </div>
      <button onClick={deleteItemFromCartHandler}>
        <img src={del} alt="" className="remve-itm-single"/>
      </button>
    </div>
  );
};

export default CartSingleItem;
