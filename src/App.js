import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Cart from "./components/cart/Cart";
import Header from "./components/header/Header";
import Home from "./pages/Home";
import { cartActions } from "./Store/cart/cart-reducer";

const App = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  console.count("runing");
  useEffect(() => {
    console.count("runing-effect-upper");
    fetch(`https://ecommerce-nov-default-rtdb.firebaseio.com/cart.json`, {
      method: "GET",
    }).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          // console.log(data);
          if (data) {
            let totalCost = 0;
            data.forEach((element) => {
              totalCost = element.totalPrice + totalCost;
            });
            dispatch(cartActions.addItem({ arr: data, cartTotal: totalCost }));
          }
        });
      }
    });
  }, [dispatch]);

  useEffect(() => {
    fetch(`https://ecommerce-nov-default-rtdb.firebaseio.com/cart.json`, {
      method: "PUT",
      body: JSON.stringify(cartItems),
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      if (res.ok) {
      }
    });
  }, [cartItems]);

  return (
    <div className="App">
      <Header />
      <Home />
    </div>
  );
};

export default App;
