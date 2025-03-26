import React, { useState } from "react";
import "./Checkbox.css";

const CheckboxComponent = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="checkbox-container">
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="small-checkbox"
        />
        {isChecked ? " Keep me logged in" : " Keep me logged in"}
      </label>
    </div>
  );
};

export default CheckboxComponent;
