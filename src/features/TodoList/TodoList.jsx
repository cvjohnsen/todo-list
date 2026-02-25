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
      
      const currentTodos = filteredTodoList.slice(
      indexOfFirstTodo,
      indexOfFirstTodo + itemsPerPage
    );

    function handlePreviousPage() {
      const newPage = Math.max(currentPage - 1, 1);
      setSearchParams({ page: newPage });
    }

    function handleNextPage() {
      const newPage = Math.min(currentPage + 1, totalPages);
      setSearchParams({ page: newPage });
    }

    return (
  <>
    {isLoading ? (
      <p>Todo list loading...</p>
    ) : filteredTodoList.length === 0 ? (
      <p>Add todo above to get started</p>
    ) : (
      <>
        <ul className={styles.list}>
          {currentTodos.map((todo) => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onCompleteTodo={onCompleteTodo}
              onUpdateTodo={onUpdateTodo}
            />
          ))}
        </ul>

        <div className={styles.paginationControls}>
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages || 1}
          </span>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </>
    )}
  </>
);
}

export default TodoList
        