import { render, screen, fireEvent } from "@testing-library/react";
import { TodosContext } from "./../context/todos-context";
import NewTodo from "./NewTodo";

describe("NewTodo", () => {
  test("renders the input text and checks if the text is captured correctly", () => {
    const mockAddTodo = jest.fn();
    const mockRemoveTodo = jest.fn();

    render(
      <TodosContext.Provider
        value={{
          addTodo: mockAddTodo,
          todos: [],
          removeTodo: mockRemoveTodo,
        }}
      >
        <NewTodo />
      </TodosContext.Provider>
    );

    // get the input and button elements
    const inputElement = screen.getByLabelText("Todo Text") as HTMLInputElement;
    const buttonElement = screen.getByText(/Add Todo/i);

    // simulate typing into input field
    fireEvent.change(inputElement, { target: { value: "Test Todo" } });

    // simulate clicking the submit button
    fireEvent.click(buttonElement);

    // check if the mockAddTodo function is called with the correct parameters
    expect(mockAddTodo).toBeCalledWith(
      expect.objectContaining({
        text: "Test Todo",
        done: false,
      })
    );

    // cleanup the input field value
    expect(inputElement.value).toBe("");
  });
});
