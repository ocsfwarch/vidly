import React from "react";

const ListGroup = ({ items, selectedItem, onItemSelect, textProperty }) => {
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          key={item[textProperty]}
          onClick={() => onItemSelect(item)}
          className={
            selectedItem === item ? "list-group-item active" : "list-group-item"
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  keyProperty: "_id",
};

export default ListGroup;
