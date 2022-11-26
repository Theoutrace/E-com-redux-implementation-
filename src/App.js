import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Cart from "./components/cart/Cart";
import Home from "./pages/Home";
import { cartActions } from "./Store/cart/cart-reducer";


const App = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();


  return (
    <div className="App">
      <Cart />
      <Home />
    </div>
  );
};

export default App;
