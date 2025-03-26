import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postAPICall } from "../../utils/api";
import "./Login.scss";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import packageInfo from "../../../package.json";
import LoginImage from "../../Pages/Images/LoginImage.jpg";

function Login({ onLogin }) {
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
    const value = e.target.value.trim();
    setError(
      value === ""
        ? `${setter === setUsername ? "UserName" : "Password"} is required.`
        : ""
    );
  };
  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    const requestBody = { username, password };
    sessionStorage.removeItem("activeMenuItem");
    try {
      const response = await postAPICall("api/User/UserLogin", requestBody);
      debugger;
      if (response.data) {
        const { UserData, Token } = response?.data?.Data;
        const user = UserData;
        sessionStorage.setItem("activeUser", user.UserName);
        sessionStorage.setItem("Getuserid", user.UserId);
        sessionStorage.setItem("Loginusertype", user.UserType);
        sessionStorage.setItem("Loginusertype", user.UserType);
        sessionStorage.setItem("JWtAccessToken", Token.Token);
        sessionStorage.setItem("JWTRefreshToken", Token.RefreshToken);
        sessionStorage.setItem("PopUpCloseIcon", "true");
        navigate("/ChannelList");
        onLogin();
      } else {
        setError("Login Failed");
      }
    } catch (error) {
      setError("Login Failed");
    }
  };

  return (
    <div className="bg-img">
      <div className="LoginContainer">
        <div className="form-container sign-in-container">
          <form onSubmit={handleSubmitLogin}>
            <h1 className="Sign_In">Sign in</h1>
            <div className="social-container">
              <a href="#" className="social">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <span>or use your account</span>
            <br />
            {/* <label htmlFor="UserName">UserName</label> */}
            <div className="input-container">
              <input
                id="UserName"
                name="UserName"
                type="text"
                placeholder=" "
                value={username}
                autoComplete="username"
                onChange={handleChange(setUsername)}
                className="input-field"
              />
              <label htmlFor="UserName">Username</label>

              <div className="password-container">
                <input
                  id="passwordfield"
                  name="passwordfield"
                  type={showPassword ? "text" : "password"}
                  placeholder=" "
                  value={password}
                  autoComplete="current-password"
                  onChange={handleChange(setPassword)}
                  className="input-field"
                />
                <label htmlFor="passwordfield">Password</label>

                <span
                  className="eye-icon"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <i className="fas fa-eye-slash"></i>
                  ) : (
                    <i className="fas fa-eye"></i>
                  )}
                </span>
              </div>
            </div>
            <a className="LoginTags" href="#">
              Forgot your password?
            </a>
            {/* <button type="submit" id="login-btn" style={{ cursor: "pointer" }}>
              Sign In
            </button> */}
            <button class="group relative inline-flex items-center justify-start overflow-hidden rounded-full h-9 w-32 px-5 py-3 font-bold">
              <span class="absolute left-0 top-0 h-32 w-32 -translate-y-2 translate-x-12 rotate-45 bg-black opacity-[3%]"></span>
              <span class="absolute left-0 top-0 -mt-1 h-48 w-48 -translate-x-56 -translate-y-24 rotate-45 bg-black opacity-100 transition-all duration-500 ease-in-out group-hover:-translate-x-8"></span>
              <span class="relative w-full text-center text-black transition-colors duration-200 ease-in-out group-hover:text-white text-sm font-math">
                Sign In
              </span>
              <span class="absolute inset-0 rounded-full border-2 border-black"></span>
            </button>

            <br />
            {error && <div className="error">{error}</div>}
            <div className="copyrights">
              &copy; {new Date().getFullYear()} Client Linx Software Pvt Ltd.
              <br />
              All rights reserved.
              <br></br>
              <br />
              <b style={{ paddingBottom: "10px" }}>
                Version - {packageInfo.version}
              </b>
            </div>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <img
              src={LoginImage}
              alt="Overlay Image"
              className="overlay-image"
              style={{
                maxWidth: "106%",
                height: "inherit",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
