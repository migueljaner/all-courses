import React from "react";
import TodoItem from "./TodoItem";
import styles from "./Todos.module.css";
import { TodosContext } from "../context/todos-context";

const Todos: React.FC = () => {
  const ctx = React.useContext(TodosContext);

  return (
    <ul className={styles.todos}>
      {ctx.todos.map((todo) => (
        <TodoItem
          key={todo.id}
          text={todo.text}
          onClickDelete={() => ctx.removeTodo(todo.id)} //Same as bindind the id to the function
        />
      ))}
    </ul>
  );
};

export default Todos;
