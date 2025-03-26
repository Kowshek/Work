import React, { useState } from "react";
import "../Style/Billing.css";
import "primeicons/primeicons.css";
import { useNavigate } from "react-router-dom";
// import { InputText } from "primereact/inputtext";
// import UserList from "./UserList";

function Billing() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode(!darkMode);
  const navigate = useNavigate();

  return (
    <div className={`App ${darkMode ? "dark" : "light"}`}>
      <button className="gobackButton" onClick={() => navigate(-1)}>
        <i className="pi pi-chevron-left">
          <br />
          Back
        </i>
      </button>
      <div className="dark-mode-toggle-container">
        <label className="switch">
          <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  );
}

export default Billing;
