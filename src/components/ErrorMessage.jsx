import React from "react";

export default function ErrorMessage({ message }) {
  return (
    <p>
      <span>⚠️</span>
      {message}
    </p>
  );
}
