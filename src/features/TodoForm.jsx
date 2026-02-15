import { useRef, useState } from "react";
import TextInputWithLabel from "../shared/TextInputWithLabel";
import styled from "styled-components";

 const StyledForm = styled.form`
    display: flex;
    gap: 8px;
    margin-bottom: 12px;
  `;

    const StyledButton = styled.button`
    padding: 6px 12px;
    font-style: ${(props) => (props.disabled ? "italic" : "normal")};
  `;
  
function TodoForm ({onAddTodo, isSaving }){
    const todoTitleInput = useRef("");
    const [workingTodoTitle, setWorkingTodoTitle] = useState("")

    function handleAddTodo(event) {
    event.preventDefault();

   onAddTodo({ title: workingTodoTitle, isCompleted: false });

    setWorkingTodoTitle("");
    todoTitleInput.current.focus();
  }

    return (
    <StyledForm  onSubmit={handleAddTodo}>
      <TextInputWithLabel
        elementId="todoTitle"
        labelText="Todo"
        ref={todoTitleInput}
        value={workingTodoTitle}
        onChange={(event) => setWorkingTodoTitle(event.target.value)}
      />
      <StyledButton disabled={workingTodoTitle.trim() === "" || isSaving}> {isSaving ? "Saving..." : "Add Todo"} </StyledButton>
    </StyledForm >
  );
}


export default TodoForm; 