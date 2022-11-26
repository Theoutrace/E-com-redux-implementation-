import "./Cart.css";
import React from "react";
import { useSelector } from "react-redux";
import CartSingleItem from "./CartSingleItem";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartTotal = useSelector((state) => state.cart.totalCost);

  return (
    <div className="cart-cntnr">
      <div className="cart-box-cntnr">
        <h2>Cart</h2>
        <div className="all-cart-itm-cntnr-outer-out">
          {cartItems.length !== 0 && (
            <>
              <div className="all-cart-itm-cntnr-outer">
                {cartItems.length !== 0 &&
                  cartItems.map((item) => {
                    return (
                      <CartSingleItem key={item.name} item={{ ...item }} />
                    );
                  })}
              </div>
              <div className="billing-area">
                <div className="billing-cntnr-box">
                  <div className="billing-cntnr-box-div-content">
                    <div className="billing-cntnr-box-div-content-title-txt">Total </div> <div className="billing-cntnr-box-div-content-title-value">{cartTotal}</div>
                  </div>
                  <div className="billing-cntnr-box-div-content">
                    <div className="billing-cntnr-box-div-content-title-txt">Tax (10 %)  </div>
                    <div className="billing-cntnr-box-div-content-title-value">{(cartTotal * (10 / 100)).toFixed(2)}</div>
                  </div>
                  <div className="billing-cntnr-box-div-content">
                    <div className="billing-cntnr-box-div-content-title-txt">Net Total  </div>
                    <div className="billing-cntnr-box-div-content-title-value">{(cartTotal + cartTotal * (10 / 100)).toFixed(2)}</div>
                  </div>
                </div>
                <button>Place Order</button>
              </div>
            </>
          )}
          {cartItems.length === 0 && <h3>Add something +</h3>}
        </div>
      </div>
    </div>
  );
};

export default Cart;
