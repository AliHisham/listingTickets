import { render, screen, fireEvent } from "@testing-library/react";
import Tickets from "./components/Tickets";
import "@testing-library/jest-dom";
import "./mocks/IntersectionObserverMock";

test("renders initial tickets", () => {
  render(<Tickets />);

  const firstTicket = screen.getByText(/Ticket #1/i);

  expect(firstTicket).toBeInTheDocument();
});

test("loads more tickets on scroll", () => {
  render(<Tickets />);
  const container = screen.getByRole("list");
  fireEvent.scroll(container, { target: { scrollY: 500 } });
  const newTicket = screen.findByText(/Ticket #101/i);
  expect(newTicket).toBeInTheDocument();
});
