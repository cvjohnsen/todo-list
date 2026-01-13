{/* Suggested update ref per AI Review Tool*/}
import { forwardRef } from "react";

const TextInputWithLabel = forwardRef(function TextInputWithLabel(
  { elementId, 
    labelText, 
    onChange, 
    value },
  ref
) {
  return (
    <>
    {/* per AI Reviwer tool update labelText for prop name */}
      <label htmlFor={elementId}>{labelText}</label>
      <input
        type="text"
        id={elementId}
        ref={ref}
        value={value}
        onChange={onChange}
      />
    </>
  );
});

export default TextInputWithLabel;

