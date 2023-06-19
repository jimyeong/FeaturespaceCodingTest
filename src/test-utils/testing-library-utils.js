import { render } from "@testing-library/react";
import PostcodeContextProvider from "../contexts/PostcodeContext";

const renderWithContext = (ui, options) =>
  render(ui, { wrapper: PostcodeContextProvider, ...options });

export * from "@testing-library/react";

export { renderWithContext as render };
