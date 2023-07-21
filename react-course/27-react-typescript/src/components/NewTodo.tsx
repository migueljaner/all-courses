import React from "react";
import classes from "./NewTodo.module.css";
import { TodosContext } from "../context/todos-context";

const NewTodo = () => {
  const ctx = React.useContext(TodosContext);
  const textInputRef = React.useRef<HTMLInputElement>(null);

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredText = textInputRef.current!.value;

    if (enteredText?.trim().length === 0) {
      // throw an error
      return;
    }

    textInputRef.current!.value = "";

    // add todo
    ctx.addTodo({
      id: Math.random(),
      text: enteredText,
      done: false,
    });
  };

  return (
    <form onSubmit={onSubmitHandler} className={classes.form}>
      <label htmlFor="text">Todo Text</label>
      <input type="text" id="text" ref={textInputRef} />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default NewTodo;
