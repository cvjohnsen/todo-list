import './App.css'
import TodoList from "./features/TodoList/TodoList";
import TodoForm from "./features/TodoForm";
import { useState } from 'react'

function App() {

  const [todoList, setTodoList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  function addTodo(title) {
    const newTodo = {
      title:title,
      id: Date.now(),
      isCompleted: false,
    };

    setTodoList([...todoList, newTodo]);
  }
function completeTodo(id) {
  const updateTodos = todoList.map ((todo) => {
    if (todo.id ===id) {
      return {...todo, isCompleted: true};
    }
    return todo;
  })
  setTodoList(updateTodos);
}
function updateTodo(editedTodo) {
  const updatedTodos = todoList.map((todo) => {
    if (todo.id === editedTodo.id) {
      return { ...editedTodo };
    }
    return todo;
  });

  setTodoList(updatedTodos);
}

  return (
    <div>
      <h1>My Todos</h1>
      <TodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} onCompleteTodo={completeTodo} onUpdateTodo={updateTodo} />    
    </div>
  );
}

export default App
