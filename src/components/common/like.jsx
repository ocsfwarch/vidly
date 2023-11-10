import React from "react";

const Like = (props) => {
  const classes = props.liked ? "fa fa-heart" : "fa fa-heart-o";
  return (
    <i
      onClick={props.onClick}
      className={classes}
      aria-hidden="true"
      style={{ cursor: "pointer" }}
    ></i>
  );
};

export default Like;
