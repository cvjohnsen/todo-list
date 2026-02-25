import TodoForm from "../features/TodoForm";
import TodoList from "../features/TodoList/TodoList";
import TodosViewForm from "../features/TodosViewForm";

export default function TodosPage({
  todoState,
  addTodo,
  completeTodo,
  updateTodo,
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
  queryString,
  setQueryString,
}) {
  const { todoList, isLoading, isSaving, errorMessage } = todoState;

  return (
    <>
      <TodoForm onAddTodo={addTodo} isSaving={isSaving} />

      <TodoList
        todoList={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
        isLoading={isLoading}
      />

      <TodosViewForm
        sortField={sortField}
        setSortField={setSortField}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        queryString={queryString}
        setQueryString={setQueryString}
      />

      {errorMessage && <p>{errorMessage}</p>}
    </>
  );
}
