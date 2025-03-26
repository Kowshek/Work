import { useState } from "react";
import "./Login.css";
import React from "react";
import { Navigate } from "react-router-dom";
import CheckboxComponent from "./Checkbox";
import google from "../assets/google.jpg";
import apple from "../assets/apple.png";
import Logo from "../assets/download.png";
import Footer from "./Footer";

function Login() {
  const [inputs, setInputs] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [gotoHome, SetgotoHome] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const validateForm = () => {
    const validationErrors = {};
    const emailval =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (inputs.username.length < 1) {
      validationErrors.username = "Please enter email address or phone number";
    } else if (!emailval.test(inputs.username)) {
      validationErrors.username = "Please enter valid email address";
    }
    if (!inputs.password.trim()) {
      validationErrors.password = "Please enter the valid password";
    } else if (inputs.password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters long";
    } 
    return validationErrors;
  };

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      SetgotoHome(true); // Redirect to home only if no errors
    }
  }

  if (gotoHome) {
    return <Navigate to="/home" />;
  }

  return (
    <div>
      <div className="formdiv">
        <img
          src={Logo}
          style={{ width: "150px", height: "40px", marginTop: "20px" }}
        />
        <form
          className="box"
          style={{ width: "330px" }}
          onSubmit={handleSubmit}
        >
          <h1 className="signin">Sign in</h1>
          <p className="signin-para">
            Stay updated on your professional world.
          </p>
        <div class="input-container">
          <input
            type="text"
            className="username"
            placeholder="Email or phone number"
            name="username"
            autoComplete="off"
            value={inputs.username}
            onChange={handleChange}
          />
          </div>
          {errors.username && (
            <span class="error-message">{errors.username}</span>
          )}

          <div class="input-container">
          <input
            type="password"
            className="pass"
            placeholder="Password"
            name="password"
            autoComplete="off"
            value={inputs.password}
            onChange={handleChange}
          />
          </div>
          {errors.password && (
            <span class="error-message">{errors.password}</span>
          )}

          <p className="forgotpass">Forgot password?</p>

          <CheckboxComponent />

          <button className="login" type="submit">
            Sign in
          </button>

          <div style={{ textAlign: "center", position: "relative", marginBottom: "10px" }}>
            <div style={{ display: "inline-block", width: "45%", borderBottom: "1px solid #000", verticalAlign: "middle" }} />
            <span style={{ position: "relative", padding: "0 6px", background: "white", zIndex: 1 }}>or</span>
            <div style={{ display: "inline-block", width: "45%", borderBottom: "1px solid #000", verticalAlign: "middle" }} />
          </div>


          <p className="privacy-policy">
            By clicking Continue, you agree to LinkedIn's{" "}
            <span class="privacypolicy">User</span>{" "}
          </p>
          <p className="privacy-policy2">
            {" "}
            <span class="privacypolicy">Agreement,</span>{" "}
            <span class="privacypolicy">Privacy Policy,</span> and{" "}
            <span class="privacypolicy">Cookie Policy.</span>{" "}
          </p>

          <button className="google">
            <img
              className="googleimg"
              src={google}
              style={{ width: "16px", height: "14px" }}
            />
            Continue with Google
          </button>

          <button className="apple">
            <img
              className="googleimg"
              src={apple}
              style={{ width: "15px", height: "17px" }}
            />
            Sign in with Apple
          </button>
        </form>
      </div>

      <p className="newjoin">
        New to LinkedIn? <span style={{ marginLeft: "5px" }}>Join now</span>
      </p>

      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Login;
