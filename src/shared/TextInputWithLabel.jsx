{/* Suggested update ref per AI Review Tool*/}
import { forwardRef } from "react";
import styled from "styled-components";

  const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const StyledInput = styled.input`
  padding: 6px;
`;

const TextInputWithLabel = forwardRef(function TextInputWithLabel(
  { elementId, 
    labelText, 
    onChange, 
    value },
  ref
) {

  return (
   
      <StyledWrapper>
      <label htmlFor={elementId}>{labelText}</label>
      <StyledInput
        type="text"
        id={elementId}
        ref={ref}
        value={value}
        onChange={onChange}
      />
      </StyledWrapper>
    
  );
});

export default TextInputWithLabel;

