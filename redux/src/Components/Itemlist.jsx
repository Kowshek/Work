import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem, removeAllItems } from "./actions";

const ItemList = () => {
  const [inputValue, setInputValue] = useState("");
  const items = useSelector((state) => state.items);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const storedItems = localStorage.getItem("items");
    if (storedItems) {
      JSON.parse(storedItems).forEach((item) => {
        dispatch(addItem(item));
      });
    }
  }, [dispatch]);

  const handleAddItem = () => {
    if (!inputValue.trim()) {
      setError("Please enter an item before trying to add");
      return;
    }
    dispatch(addItem(inputValue));
    const updatedItems = [...items, inputValue];
    localStorage.setItem("items", JSON.stringify(updatedItems));
    setInputValue("");
    setError("");
  };

  const handleRemoveItem = (item) => {
    dispatch(removeItem(item));
    const updatedItems = items.filter((i) => i !== item);
    localStorage.setItem("items", JSON.stringify(updatedItems));
  };

  const handleRemoveAll = () => {
    if (items.length === 0) {
      setError("No items to remove");
      return;
    }
    dispatch(removeAllItems());
    localStorage.removeItem("items");
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Item List</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add item"
        style={{ textAlign: "center", display: "flex", marginLeft: "640px" }}
      />{" "}
      <br />
      <button onClick={handleAddItem} style={{ marginLeft: "645px" }}>
        Add Item
      </button>
      <button onClick={handleRemoveAll} style={{ margin: "10px" }}>
        Remove All
      </button>
      {error && (
        <p style={{ color: "red", textAlign: "center", marginLeft: "20px" }}>
          {error}
        </p>
      )}
      <ul>
        {items.map((item, index) => (
          <li key={index} style={{ marginLeft: "600px" }}>
            {item}{" "}
            <button onClick={() => handleRemoveItem(item)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
