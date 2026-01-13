function TextInputWithLabel({
    elementId,
    labelText,
    onChange,
    ref,
    value,
}) {
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
}

export default TextInputWithLabel



