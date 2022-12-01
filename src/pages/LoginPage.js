import React, { useState } from "react";
import Signup from "../components/loginSignup/Signup";
import Login from "../components/loginSignup/Login";
import "./LoginPage.css";

const LoginPage = () => {
  const [loginForm, setLoginForm] = useState(true);

  const toggleFormLOginSignupHandler = () => {
    setLoginForm((prev) => !loginForm);
  };
  return (
    <div className="login-signup-page-cntnr">
      {loginForm ? (
        <Login toggleForm={toggleFormLOginSignupHandler} />
      ) : (
        <Signup toggleForm={toggleFormLOginSignupHandler} />
      )}
    </div>
  );
};

export default LoginPage;
