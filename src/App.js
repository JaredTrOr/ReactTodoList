import "./styles.css";
import TodoList from "./components/TodoList";
import { useState, useRef, useEffect } from "react";

const LOCAL_STORAGE_KEY = "todos";

export default function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function handleAddTodo() {
    const name = todoNameRef.current.value;
    if (name === "") {
      alert("Insert content");
      return;
    }
    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        {
          id: Math.floor(Math.random() * 10000),
          name: name,
          completed: false
        }
      ];
    });
    todoNameRef.current.value = null;
  }

  function toggleTodo(id) {
    const newTodos = [...todos]; //Copy todos from our todos
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  }

  function handleClearTodo() {
    const notCompletedTodos = todos.filter((todo) => !todo.completed);
    setTodos(notCompletedTodos);
  }

  return (
    <div className="App">
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add todo</button>
      <button onClick={handleClearTodo}>Clear todos</button>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
    </div>
  );
}
