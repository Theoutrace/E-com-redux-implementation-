import React, { useRef } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../Store/auth/auth-reducer";

const Signup = (props) => {
    const dispatch = useDispatch()
  const history = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const signupFormSubmitHandler = (e) => {
    e.preventDefault();

    const emailVal = emailInputRef.current.value;
    const passwordVal = passwordInputRef.current.value;
    const confirmPasswordVal = confirmPasswordInputRef.current.value;

    if (confirmPasswordVal === passwordVal) {
      const URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCrchbfY5D23M4COdGVjsf_fFWgLdvicXo`;
      fetch(URL, {
        method: "POST",
        body: JSON.stringify({
          email: emailVal,
          password: passwordVal,
          returnSecureToken: true,
        }),
        headers: { "Content-Type": "application/json" },
      }).then((res) => {
        if (res.ok) {
          return res.json().then((data) => {
            console.log(data);
            localStorage.setItem("token", data.idToken);
            localStorage.setItem("email", data.email);
            dispatch(authActions.login({email:data.email, idToken: data.idToken}))

            history('/')
          });
        } else {
          res.json().then((data) => {
            const message = data.error.message;
            alert(message);
          });
        }
      });
    } else {
      alert("Password didn't match");
    }

    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
    confirmPasswordInputRef.current.value = "";
  };

  const toggleLoginSighupHandler = () => {
    props.toggleForm();
  };
  return (
    <div className="login-form-cntnr-login-cmpn">
      <form
        className="login-form-form-signup-ss"
        onSubmit={signupFormSubmitHandler}
      >
        <div className="register-text">
          <h2>Register</h2>
        </div>
        <input
          className="email-input-box"
          type="email"
          placeholder="Email"
          required
          ref={emailInputRef}
        />
        <input
          className="email-input-box"
          type="password"
          placeholder="Password"
          required
          ref={passwordInputRef}
        />
        <input
          className="email-input-box"
          type="password"
          placeholder="Confirm Password"
          required
          ref={confirmPasswordInputRef}
        />
        <div className="signup-login-register-btn-form">
          <button>Register</button>
        </div>
      </form>
      <div>
        <div className="signup-login-register-btn-form">
          Already have an account?{" "}
          <span
            className="toggle-frm-login-signup-tgl"
            onClick={toggleLoginSighupHandler}
          >
            Login
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
