import TodoListItem from "./TodoListItem";
import styles from './TodoList.module.css';
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function TodoList({ todoList, onCompleteTodo, onUpdateTodo, isLoading }) {
    const filteredTodoList = todoList.filter((todo) => todo.isCompleted !== true);
     const [searchParams, setSearchParams] = useSearchParams();

     const navigate = useNavigate();

      const itemsPerPage = 15;

      const currentPage = parseInt(searchParams.get("page") || "1", 10);

      const indexOfFirstTodo = (currentPage - 1) * itemsPerPage;

      const totalPages = Math.max(1, Math.ceil(filteredTodoList.length / itemsPerPage));

      useEffect(() => {
  const isInvalidPage =
    isNaN(currentPage) ||
    currentPage < 1 ||
    currentPage > totalPages;

  if (isInvalidPage) {
    navigate("/");
  }
}, [currentPage, totalPages, navigate]);
      
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
              Page {currentPage} of {totalPages}
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
        