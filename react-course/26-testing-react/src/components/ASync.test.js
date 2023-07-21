import { render, screen } from "@testing-library/react";
import Async from "./Async";

describe("Async component", () => {
  test("Render Async component", async () => {

    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
        json: async () => [{ id: "p1", title: "First post" }],
    });
    render(<Async />);

    // const listItemElements =  screen.getAllByRole("listitem"); // This will fail because the list is not rendered yet
    const listItemElements = await screen.findAllByRole("listitem"); // This will pass because the list is rendered after 500ms

    expect(listItemElements).not.toHaveLength(0);
  });
});
