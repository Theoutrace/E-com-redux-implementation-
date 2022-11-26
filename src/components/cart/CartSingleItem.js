import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../Store/cart/cart-reducer";
import "./Cart.css";

const CartSingleItem = (props) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const addQtyHandler = () => {
    const newArr = [...cartItems];
    const idx = cartItems.findIndex((itm) => itm.name === props.item.name);
    newArr[idx] = { ...newArr[idx], qty: newArr[idx].qty + 1, totalPrice: props.item.totalPrice+props.item.price };
    dispatch(cartActions.addItem([...newArr]));
  };

  const subtractQtyHandler = () => {
    const newArr = [...cartItems];
    const idx = cartItems.findIndex((itm) => itm.name === props.item.name);
    if (newArr[idx].qty > 1) {
      newArr[idx] = { ...newArr[idx], qty: newArr[idx].qty - 1, totalPrice: props.item.totalPrice-props.item.price };
      dispatch(cartActions.addItem(newArr));
    } else {
      deleteItemFromCartHandler();
    }
  };

  const deleteItemFromCartHandler = () => {
    const remainingItems = cartItems.filter(
      (itm) => itm.name !== props.item.name
    );
    dispatch(cartActions.addItem(remainingItems));
  };
  return (
    <div className="single-itm-cart-cntnr">
      <p>{props.item.name}</p>
      <p>{props.item.price}</p>
      <p>X {props.item.qty}</p>
      <div className="minus-plus-btn-cntnr">
        <button onClick={subtractQtyHandler} className='minus-plus-btn-cntnr-button'>-</button>
        <button onClick={addQtyHandler} className='minus-plus-btn-cntnr-button'>+</button>
      </div>
      <button onClick={deleteItemFromCartHandler}>Delete</button>
      <div>Total : {props.item.totalPrice}</div>
    </div>
  );
};

export default CartSingleItem;
