import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import MainLogic from "./Components/MainLogic";
import Contacts from "./Components/Billing";

function WelcomePage() {
  const [fadeOut, setFadeOut] = useState(false);
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Function to fetch users data
  const fetchUsers = async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      setUsers(data); // Set users data
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to navigate to the User Directory page after users data is fetched
  const NavigateUserDirectory = () => {
    fetchUsers(); // Fetch users data
  };

  // When users state changes and data is ready, navigate to the main page
  useEffect(() => {
    if (users.length > 0) {
      setFadeOut(true);
      setTimeout(() => {
        navigate("/main", { state: { users: users } }); // Pass users data via state
      }, 1000);
    }
  }, [users, navigate]); // Wait for users to be set

  return (
    <div className={`welcome-page ${fadeOut ? "fade-out" : ""}`}>
      <h1>Welcome to User Data Fetcher</h1>
      <p>Click the button below to get started and fetch user data :</p>
      <div className="Button_conatiner">
        <button className="start-button" onClick={NavigateUserDirectory}>
          User Directory
        </button>
        &nbsp; &nbsp;
        <button className="start-button" onClick={() => navigate("/contacts")}>
          Contacts
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/main" element={<MainLogic />} />
      </Routes>
    </Router>
  );
}

export default App;
