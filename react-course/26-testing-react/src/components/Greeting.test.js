import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Greeting from "./Greeting";

describe("Greeting component", () => {
  //This is a test suite
  test("Render Greeting component", () => {
    //This is a test of the Greeting component
    // Arrange
    render(<Greeting />);

    // Act

    // Assert
    const text = screen.getByText("Great to see you", { exact: false });

    expect(text).toBeInTheDocument();
  });

  test("Render 'Changed!' when button is clicked", () => {
    // Arrange
    render(<Greeting />);

    // Act
    /*  const button = screen.getByRole("button");
    button.click(); */

    userEvent.click(screen.getByRole("button"));

    // Assert
    const text2 = screen.queryByText("Great to see you", { exact: false });
    const text = screen.getByText("Changed!", { exact: false });

    expect(text2).not.toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });

  test("Does render 'Great to see you' when button is not clicked", () => {
    // Arrange
    render(<Greeting />);

    // Act

    // Assert
    const text = screen.queryByText("Changed!", { exact: false });

    expect(text).toBeNull();
  });
});
