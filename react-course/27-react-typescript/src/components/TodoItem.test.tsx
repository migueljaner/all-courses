import { render, screen, fireEvent } from "@testing-library/react";
import TodoItem from "./TodoItem";

describe("TodoItem", () => {
  test("Renders the correct text", () => {
    const dummyText = "Buy milk";
    const mockDeleteFunction = jest.fn();

    render(<TodoItem text={dummyText} onClickDelete={mockDeleteFunction} />);

    const listItemElement = screen.getByText(dummyText);

    expect(listItemElement).toBeInTheDocument();
  });

  test("Calls onClickDelete when clicked", () => {
    const dummyText = "Buy milk";
    const mockDeleteFunction = jest.fn();

    render(<TodoItem text={dummyText} onClickDelete={mockDeleteFunction} />);

    const listItemElement = screen.getByText(dummyText);

    fireEvent.click(listItemElement);

    expect(mockDeleteFunction).toBeCalledTimes(1);
  });
});
