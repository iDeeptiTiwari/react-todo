import { render } from "@testing-library/react";
import App from "./App";

it("should renders app component", () => {
  const { getByRole } = render(<App />);
  const main = getByRole("main");
  expect(main).not.toBeEmptyDOMElement();
});

// it("snjnhould renders app component", () => {
//   const { getByText } = render(<App />);
//   const main = getByText("Done");
//   expect(main).not.toBeEmptyDOMElement();
// });

//onAdd test
// onDeleteTest

//onRandomAdd test
