import React, { useState } from "react";
import { Button } from "antd";

const TableCell = ({ value, setValue, setFormData, fieldPath }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleApplyClick = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(fieldPath, newValue);
    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData };
      const keys = fieldPath.split(".");
      let currentObj = updatedFormData;
      for (let i = 0; i < keys.length - 1; i++) {
        currentObj = currentObj[keys[i]];
      }
      currentObj[keys[keys.length - 1]] = newValue;
      return updatedFormData;
    });
  }
  return (
    <td>
      {isEditing ? (
        <div>
          <input type="text" value={value} onChange={handleChange} />
           <Button onClick={handleApplyClick}>Aplicar</Button>
        </div> 
      ) : (
        <span onClick={handleEditClick}>{value}</span>
      )}
    </td>
  );
};

export default TableCell;
