import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Header from "./components/header/Header";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import { cartActions } from "./Store/cart/cart-reducer";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { authActions } from "./Store/auth/auth-reducer";

const App = () => {
  const history = useNavigate();
  const authContent = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const email = localStorage.getItem("email");

  useEffect(() => {
    console.count("runing-effect-upper");
    if (email) {
      const plainEmail = email.replace(/[^a-zA-Z0-9]/g, "");
      fetch(
        `https://ecommerce-nov-default-rtdb.firebaseio.com/cart/${plainEmail}.json`,
        {
          method: "GET",
        }
      ).then((res) => {
        if (res.ok) {
          return res.json().then((data) => {
            // console.log(data);
            if (data) {
              let totalCost = 0;
              data.forEach((element) => {
                totalCost = element.totalPrice + totalCost;
              });
              dispatch(
                cartActions.addItem({ arr: data, cartTotal: totalCost })
              );
            }
          });
        }
      });
    }

    if (localStorage.getItem("email") && localStorage.getItem("token")) {
      dispatch(
        authActions.login({
          email: localStorage.getItem("email"),
          idToken: localStorage.getItem("token"),
        })
      );
      history("/");
    }
  }, [dispatch]);

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      const plainEmail = email.replace(/[^a-zA-Z0-9]/g, "");
      fetch(
        `https://ecommerce-nov-default-rtdb.firebaseio.com/cart/${plainEmail}.json`,
        {
          method: "PUT",
          body: JSON.stringify(cartItems),
          headers: { "Content-Type": "application/json" },
        }
      ).then((res) => {
        if (res.ok) {
        }
      });
    } else {
      history("/login");
    }
  }, [cartItems]);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {!authContent.login && <Route path="/login" element={<LoginPage />} />}
        {authContent.login && (
          <Route path="/login" element={<Navigate to="/" />} />
        )}
      </Routes>
    </div>
  );
};

export default App;
