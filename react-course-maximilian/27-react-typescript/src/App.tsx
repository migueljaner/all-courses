import { useContext } from "react";
import "./App.css";
import NewTodo from "./components/NewTodo";
import Todos from "./components/Todos";

import { TodosContext } from "./context/todos-context";

function App() {
  const ctx = useContext(TodosContext);

  return (
    <div>
      <NewTodo />
      <Todos />
    </div>
  );
}

export default App;
