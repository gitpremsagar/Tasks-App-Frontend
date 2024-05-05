import React from "react";

export default function Section({ children, className }) {
  return (
    //resuable section component
    <section className={`p-20 ${className}`}>{children}</section>
  );
}
