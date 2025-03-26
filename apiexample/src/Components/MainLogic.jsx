import React, { useState, useEffect } from "react";
import Header from "./Header";
import UserList from "./UserList";
import "primeicons/primeicons.css";
import { useNavigate, useLocation } from "react-router-dom";
import "../Style/MainLogic.css";

function MainLogic() {
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const toggleDarkMode = () => setDarkMode(!darkMode);
  const navigate = useNavigate();

  // Use useLocation to get the state passed by the WelcomePage
  const location = useLocation();
  const users = location.state?.users || []; // Access users from state

  return (
    <div className={`App ${darkMode ? "dark" : "light"}`}>
      <button className="gobackButton" onClick={() => navigate(-1)}>
        <i className="pi pi-chevron-left">
          <br />
          Back
        </i>
      </button>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="dark-mode-toggle-container">
        <label className="switch">
          <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
          <span className="slider round"></span>
        </label>
      </div>

      {users.length === 0 ? (
        <div className="loading">Loading...</div>
      ) : (
        <UserList
          users={users.filter(({ name }) =>
            name.toLowerCase().includes(searchQuery.toLowerCase())
          )}
        />
      )}
    </div>
  );
}

export default MainLogic;
