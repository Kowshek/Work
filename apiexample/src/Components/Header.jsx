import React from "react";
import "../Style/Header.css";

function Header({ searchQuery, setSearchQuery }) {
  return (
    <header className="header">
      <h1>User Directory </h1>
      <input
        type="text"
        placeholder="Search by name..."
        className="search-input"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </header>
  );
}

export default Header;
