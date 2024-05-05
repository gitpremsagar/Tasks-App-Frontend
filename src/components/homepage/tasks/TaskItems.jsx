import React from "react";

export default function TaskItems({ itemName, itemValue }) {
  return (
    <div>
      <div>
        <h4 className=" font-bold">{itemName}: </h4>
        <p>{itemValue}</p>
      </div>
    </div>
  );
}
