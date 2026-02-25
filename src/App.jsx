import "./App.css";
import styles from "./App.module.css";
import { useCallback, useEffect, useReducer, useState } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import Header from "./shared/Header";
import TodosPage from "./pages/TodosPage";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import {
  todosReducer as reducer,
  actions as todoActions,
  initialState as initialTodosState,
} from "./reducers/todos.reducer";


const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
const token = `Bearer ${import.meta.env.VITE_PAT}`;
  
function App() {

  const [todoState, dispatch] = useReducer(reducer,initialTodosState);
  const {todoList } = todoState;
  const [sortField, setSortField] = useState("createdTime");
  const [sortDirection, setSortDirection] = useState("desc");
  const [queryString, setQueryString] = useState("");
  const location = useLocation();
  const [title, setTitle] = useState("Todo List");

useEffect(() => {
  if (location.pathname === "/") setTitle("Todo List");
  else if (location.pathname === "/about") setTitle("About");
  else setTitle("Not Found");
}, [location]);
  
  const encodeUrl = useCallback(() => {
    const sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;

    let searchQuery = "";
    if (queryString) {
      searchQuery = `&filterByFormula=SEARCH("${queryString}", {title})`;
    }

    return encodeURI(`${url}?${sortQuery}${searchQuery}`);
  }, [sortField, sortDirection, queryString]);

 useEffect(() => {
  const fetchTodos = async () => {
    dispatch({ type: todoActions.fetchTodos });

    const options = {
      method: "GET",
      headers: { Authorization: token },
    };

    try {
      const resp = await fetch(encodeUrl(), options);

      if (!resp.ok) {
        throw new Error("Failed to fetch todos.");
      }

      const { records } = await resp.json();

      dispatch({
        type: todoActions.loadTodos,
        records,
      });
    } catch (error) {
      dispatch({
        type: todoActions.setLoadError,
        error,
      });
    }
  };

  fetchTodos();
}, [encodeUrl, dispatch, token]);
  
const addTodo = async (newTodo) => {
  const payload = {
    records: [
      {
        fields: {
          title: newTodo.title,
          isCompleted: newTodo.isCompleted,
        },
      },
    ],
  };

  const options = {
    method: "POST",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  dispatch({ type: todoActions.startRequest });

  try {
    const resp = await fetch(url, options);

    if (!resp.ok) {
      throw new Error("Failed to save todo.");
    }

    const { records } = await resp.json();

    dispatch({
      type: todoActions.addTodo,
      record: records[0],
    });
  } catch (error) {
    dispatch({
      type: todoActions.setLoadError,
      error,
    });
  } finally {
    dispatch({ type: todoActions.endRequest });
  }
};

const completeTodo = async (id) => {
  const originalTodo = todoList.find((todo) => todo.id === id);
  if (!originalTodo) return;

  dispatch({
    type: todoActions.completeTodo,
    id,
  });

  const payload = {
    records: [
      {
        id,
        fields: { isCompleted: true },
      },
    ],
  };

  const options = {
    method: "PATCH",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  dispatch({ type: todoActions.startRequest });

  try {
    const resp = await fetch(url, options);
    if (!resp.ok) throw new Error("Failed to complete todo");
  } catch (error) {

    dispatch({
      type: todoActions.revertTodo,
      editedTodo: originalTodo,
      error: new Error(`${error.message}. Reverting todo...`),
    });
  } finally {
    dispatch({ type: todoActions.endRequest });
  }
};

const updateTodo = async (editedTodo) => {
  const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);
  if (!originalTodo) return;

  dispatch({
    type: todoActions.updateTodo,
    editedTodo,
  });

  const payload = {
    records: [
      {
        id: editedTodo.id,
        fields: {
          title: editedTodo.title,
          isCompleted: editedTodo.isCompleted,
        },
      },
    ],
  };

  const options = {
    method: "PATCH",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  dispatch({ type: todoActions.startRequest });

  try {
    const resp = await fetch(url, options);
    if (!resp.ok) throw new Error("Failed to update todo");
  } catch (error) {
    dispatch({
      type: todoActions.revertTodo,
      editedTodo: originalTodo,
      error: new Error(`${error.message}. Reverting todo...`),
    });
  } finally {
    dispatch({ type: todoActions.endRequest });
  }
};
  return (
  <div className={styles.appContainer}>
    <div className={styles.appInner}>
      <Header title={title} />

      <Routes>
        <Route
          path="/"
          element={
            <TodosPage
              todoState={todoState}
              addTodo={addTodo}
              completeTodo={completeTodo}
              updateTodo={updateTodo}
              sortField={sortField}
              setSortField={setSortField}
              sortDirection={sortDirection}
              setSortDirection={setSortDirection}
              queryString={queryString}
              setQueryString={setQueryString}
            />
          }
        />

        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  </div>
);
}

export default App
