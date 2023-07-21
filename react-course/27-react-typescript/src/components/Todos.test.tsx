import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import { TodosContext, type TodosContextType } from "../context/todos-context";
import NewTodo from "./NewTodo";
import Todos from "./Todos";

// Custom render function
const renderWithProviders = (
  ui: JSX.Element,
  contextValue: TodosContextType
) => {
  return render(
    <TodosContext.Provider value={contextValue}>{ui}</TodosContext.Provider>
  );
};

describe("Todos", () => {
  test("TodoItem is correctly deleted after being created", () => {
    let todos = [
      { id: 1, text: "Buy milk", done: false },
      { id: 2, text: "Read book", done: false },
    ];

    const mockRemoveTodo = jest.fn((id: number) => {
      todos = todos.filter((todo) => todo.id !== id);
    });

    const mockAddTodo = jest.fn(
      (newTodo: { id: number; text: string; done: boolean }) => {
        todos = [...todos, newTodo];
      }
    );

    let contextValue = {
      todos,
      removeTodo: mockRemoveTodo,
      addTodo: mockAddTodo,
    };

    // Render the NewTodo component and add a new todo
    renderWithProviders(<NewTodo />, contextValue);

    const newTodoText = "New Test Todo";
    const inputElement = screen.getByLabelText("Todo Text") as HTMLInputElement;
    const buttonElement = screen.getByText(/Add Todo/i);

    fireEvent.change(inputElement, { target: { value: newTodoText } });
    fireEvent.click(buttonElement);

    expect(mockAddTodo).toBeCalledWith(
      expect.objectContaining({
        text: newTodoText,
        done: false,
      })
    );

    cleanup();

    // Update contextValue and re-render Todos
    contextValue = { todos, removeTodo: mockRemoveTodo, addTodo: mockAddTodo };
    renderWithProviders(<Todos />, contextValue);

    // Remove the new todo
    const newTodoItem = screen.getByText(newTodoText);
    fireEvent.click(newTodoItem);

    cleanup();
    // Update contextValue and re-render Todos to reflect the removed todo
    contextValue = { todos, removeTodo: mockRemoveTodo, addTodo: mockAddTodo };
    renderWithProviders(<Todos />, contextValue);

    expect(mockRemoveTodo).toBeCalledTimes(1);
    expect(screen.queryByText(newTodoText)).not.toBeInTheDocument();
  });
});
