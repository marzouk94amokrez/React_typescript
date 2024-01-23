import { render, screen } from "@testing-library/react";
import App from "./App";

test("has Client Api ICD-EINV subtitle", () => {
  render(<App />);
  const linkElement = screen.getByText(/Client Api ICD-EINV/i);
  expect(linkElement).toBeInTheDocument();
});
