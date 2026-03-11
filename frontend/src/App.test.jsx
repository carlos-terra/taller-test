import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  test("shows validation message when description is empty", async () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText(/transaction amount/i), {
      target: { value: "10.50" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(
      await screen.findByText("Please enter a transaction description."),
    ).toBeInTheDocument();
  });

  test("shows validation message when amount is invalid", async () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText(/transaction description/i), {
      target: { value: "Internet bill" },
    });

    fireEvent.change(screen.getByLabelText(/transaction amount/i), {
      target: { value: "0" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(
      await screen.findByText("Please enter a valid amount greater than zero."),
    ).toBeInTheDocument();
  });
});
