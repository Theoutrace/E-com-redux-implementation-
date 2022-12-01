import React,{ useRef }  from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../Store/auth/auth-reducer";
import {useNavigate} from 'react-router-dom'
import './Signup.css'

const Login = (props) => {
  const history = useNavigate()
  const dispatch=useDispatch()
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const loginFormSubmitHandler = (e) => {
    e.preventDefault();

    const emailVal = emailInputRef.current.value;
    const passwordVal = passwordInputRef.current.value;

    if (passwordVal) {
      const URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCrchbfY5D23M4COdGVjsf_fFWgLdvicXo`;
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
            // console.log(data);
            dispatch(authActions.login({email:data.email, idToken:data.idToken}))
            localStorage.setItem("token", data.idToken);
            localStorage.setItem("email", data.email);
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
  };

    const toggleLoginSighupHandler=()=>{
        props.toggleForm()
    }
  return (
      <div className="login-form-cntnr-login-cmpn">
        <form className="login-form-form-signup-ss" onSubmit={loginFormSubmitHandler}>
          <div className="register-text">
            <h2>Login</h2>
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
          <div className="signup-login-register-btn-form">
            <button>Login</button>
          </div>
        </form>
        <div>
        <div className="signup-login-register-btn-form">
          New to this site? <span className="toggle-frm-login-signup-tgl" onClick={toggleLoginSighupHandler}>Login</span>
        </div>
      </div>
      </div>
  );
};

export default Login;
