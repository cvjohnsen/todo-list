import './App.css'
import TodoList from "./features/TodoList/TodoList";
import TodoForm from "./features/TodoForm";
import { useEffect, useState } from 'react'

const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
const token = `Bearer ${import.meta.env.VITE_PAT}`;

function App() {

  const [todoList, setTodoList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
  const fetchTodos = async () => {
    setIsLoading(true);

    const options = {
      method: "GET",
      headers: {
        Authorization: token,
      },
    };

    try {
      const resp = await fetch(url, options);

      if (!resp.ok) {
        throw new Error(resp.message);
      }

    } catch (error) {
 
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchTodos();
}, []);
  
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
