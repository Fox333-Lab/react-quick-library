import React from "react";
import styles from "./example.module.css";
import PropTypes from "prop-types";

export const Example = ({ text, isBold, textColor, bgColor, textAlign }) => {
  var makeBold = isBold === true ? styles.fontBold : styles.foneNormal;

  const compStyles = {
    color: textColor,
    fontWeight: isBold === true ? "bold" : "normal",
    backgroundColor: bgColor,
    textAlign: textAlign,
  };

  return (
    <>
      <div style={compStyles}>
        <p>{text}</p>
      </div>
    </>
  );
};

Example.propTypes = {
  text: PropTypes.string,
  isBold: PropTypes.bool,
  textColor: PropTypes.string,
  bgColor: PropTypes.string,
  textAlign: PropTypes.oneOf(["left", "center", "right"]),
};

Example.defaultProps = {
  text: "Hello World! I am a component",
  isBold: false,
  textColor: "black",
  bgColor: "white",
  textAlign: "center",
};
