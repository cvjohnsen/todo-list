import { useRef, useState } from "react";

function TodoForm ({onAddTodo}){
    const todoTitleInput = useRef("");
    const [workingTodoList, setWorkingTodoTitle] = useState("")

    function handleAddTodo(event) {
    event.preventDefault();

    onAddTodo(workingTodoTitle);

    setWorkingTodoTitle("");
    todoTitleInput.current.focus();
  }

    return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Todo</label>
      <input id="todoTitle" type="text" name="title" ref={todoTitleInput} value={workingTodoTitle} onChange={(event) => setWorkingTodoTitle(event.target.value)} />
      <button type="submit">Add Todo</button>
    </form>
  );
}


export default TodoForm; 