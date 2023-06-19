import { render, screen, act } from "../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import MainPage from "../MainPage";
import { MemoryRouter } from "react-router-dom";
import { server } from "../../mocks/server";
import { sleep } from "../../axios-util/axios-library-utility";

// pay attention to write it at the top level of your file
export const mockedUsedNavigate = jest.fn();

//@@here
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

test("CHECK WHETHER OR NOT THE POSTCODE COMES UP PROPERLY", async () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <MainPage />
    </MemoryRouter>
  );

  const postcodeInput = screen.getByPlaceholderText(
    "Type in the postcodes you want to fetch"
  );

  const submitButton = screen.getByRole("button", { name: "Submit" });

  expect(submitButton).toBeInTheDocument();
  expect(postcodeInput).toBeInTheDocument();
});
test("CHECK WHETHER OR NOT YOU ARE FETCHING POSTCODES PROPERLY", async () => {
  render(
    <MemoryRouter initialEntries={["/CB40GF"]}>
      <MainPage flag="searching" />
    </MemoryRouter>
  );
  const postcodeInput = screen.getByPlaceholderText(
    "Type in the postcodes you want to fetch"
  );
  const submitButton = screen.getByRole("button", { name: "Submit" });

  // typing process test
  expect(mockedUsedNavigate).toBeCalledTimes(0);
  await act(async () => {
    await userEvent.clear(postcodeInput);
    await userEvent.type(postcodeInput, "B100AB");
  });
  expect(postcodeInput.value).toBe("B100AB");

  // page transitioning
  await act(async () => {
    // once you type enter, it has the same effect as you click the submit button
    await userEvent.type(postcodeInput, "{enter}");
  });
  expect(mockedUsedNavigate).toBeCalledTimes(1);

  await act(async () => {
    await userEvent.clear(postcodeInput);
    await userEvent.type(postcodeInput, "CB40GF");
  });

  await act(async () => {
    await userEvent.click(submitButton);
  });

  const postcode = await screen.findByRole("item_display", { exact: false });

  // test contents
  expect(postcode).toHaveTextContent("postcode: CB4 0GF");
  expect(postcode).toHaveTextContent("country: England");
  expect(postcode).toHaveTextContent("region: East of England");
});

test.skip("CHECK WHEN ERRORS OCCUR", async () => {
  server.resetHandlers(
    rest.get("http://postcodes.io/postcodes/CB4%0GF", (req, res, ctx) => {
      res(ctx.status(500));
    }),
    rest.get(
      "http://postcodes.io/postcodes/CB4%0GF/nearest",
      (req, res, ctx) => {
        res(ctx.status(500));
      }
    )
  );
  /// ... check error process
});
