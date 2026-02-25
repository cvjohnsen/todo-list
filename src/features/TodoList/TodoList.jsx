import TodoListItem from "./TodoListItem";
import styles from './TodoList.module.css';
import { useSearchParams } from "react-router-dom";

function TodoList({ todoList, onCompleteTodo, onUpdateTodo, isLoading }) {
    const filteredTodoList = todoList.filter((todo) => todo.isCompleted !== true);
     const [searchParams, setSearchParams] = useSearchParams();

      const itemsPerPage = 15;

      const currentPage = parseInt(searchParams.get("page") || "1", 10);

      const indexOfFirstTodo = (currentPage - 1) * itemsPerPage;

      const totalPages = Math.ceil(filteredTodoList.length / itemsPerPage);

    return (
    <>
      {isLoading ? (
        <p>Todo list loading...</p>
      ) : filteredTodoList.length === 0 ? (
        <p>Add todo above to get started</p>
      ) : (
        <ul className={styles.list}>
          {filteredTodoList.map((todo) => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onCompleteTodo={onCompleteTodo}
              onUpdateTodo={onUpdateTodo}
            />
          ))}
        </ul>
      )}
    </>
  );
}

export default TodoList