import React from "react";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import styles from "./button.module.css";

const Button = ({
  text,
  onClick = () => {},
  color = "var(--primary-color)",
  padding = "6px 32px",
  border = `2px solid ${color}`,
  arrowDirection = null,
  variant = "primary",
  type = "button", // Added type prop with default 'button'
  disabled = false,
}) => {
  return (
    <button
      type={type} // Assigning the type prop
      onClick={onClick}
      className={`${
        variant === "primary"
          ? styles.button
          : variant === "secondary"
          ? styles.secondaryButton
          : variant === "normalSecondary"
          ? styles.normalSecondary
          : styles.normalPrimary
      } ${disabled ? styles.disabledButton : ""}`}
      style={{ padding, border }}
      disabled={disabled}
    >
      <div className={styles.buttonLeftArrow}>
        {arrowDirection === "left" && (
          <span className={styles.arrowLeft}>
            <FaLongArrowAltLeft /> {text}
          </span>
        )}
        {arrowDirection === null && <span>{text}</span>}
      </div>
      {arrowDirection === "right" && (
        <span className={styles.arrowRight}>
          {text} <FaLongArrowAltRight />
        </span>
      )}
    </button>
  );
};

export default Button;
