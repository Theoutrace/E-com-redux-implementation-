import "./Cart.css";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import CartSingleItem from "./CartSingleItem";
import upDown from "./images/direction.png";
import cart from "./images/emptycart.png";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartTotal = useSelector((state) => state.cart.totalCost);

  const [showCart, setShowCart] = useState(false);

  const toggleCartHandler = () => {
    setShowCart((prev) => !prev);
  };

  return (
    <div className="cart-cntnr">
      <div className={showCart ? "cart-box-cntnr" : "cart-box-cntnr-none"}>
        <button className="cart-toggle-btn" onClick={toggleCartHandler}>
          {showCart ? (
            <img className="invert-icon-cart-close" src={upDown} alt="" width="30" />
          ) : (
            <img
              className="invert-icon-cart-open"
              src={upDown}
              alt=""
              width="30"
            />
          )}
        </button>
        <h2>
          Cart
        </h2>
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
                    <div className="billing-cntnr-box-div-content-title-txt">
                      Total
                    </div>
                    <div className="billing-cntnr-box-div-content-title-value">
                      {cartTotal.toFixed(2)}
                    </div>
                  </div>
                  <div className="billing-cntnr-box-div-content">
                    <div className="billing-cntnr-box-div-content-title-txt">
                      Tax (10 %)
                    </div>
                    <div className="billing-cntnr-box-div-content-title-value">
                      {(cartTotal * (10 / 100)).toFixed(2)}
                    </div>
                  </div>
                  <div className="billing-cntnr-box-div-content">
                    <div className="billing-cntnr-box-div-content-title-txt">
                      Net Total 
                    </div>
                    <div className="billing-cntnr-box-div-content-title-value">
                    ₹ {(cartTotal + cartTotal * (10 / 100)).toFixed(2)}
                    </div>
                  </div>
                </div>
                <button>Place Order</button>
              </div>
            </>
          )}
          {cartItems.length === 0 && (
            <div className="add-something-empty-cart">
              <div>
                <img src={cart} alt="" width="60" />
              </div>
              <div>
                <h3>Add something +</h3>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
