/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext } from "react";
import { type Todo } from "../models/todo";

export type TodosContextType = {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  removeTodo: (id: number) => void;
};

export const TodosContext = createContext<TodosContextType>({
  todos: [],
  addTodo: () => {},
  removeTodo: () => {},
});

const TodosContextProvider: React.FC<{ children?: React.ReactNode }> = (
  props
) => {
  const [todos, setTodos] = React.useState<Todo[]>([]);

  const addTodo = (todo: Todo) => {
    setTodos([...todos, todo]);
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const contextValue: TodosContextType = {
    todos: todos,
    addTodo: addTodo,
    removeTodo: removeTodo,
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {props.children}
    </TodosContext.Provider>
  );
};

export default TodosContextProvider;
