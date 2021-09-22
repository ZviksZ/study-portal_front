import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react";
import RegisterForm from "components/Auth/RegisterForm/RegisterForm";

describe("RegisterForm", () => {
  test("Simple usage", async () => {
    const component = render(<RegisterForm />);

    await waitFor(() => component.getByTestId("auth-register-form"));

    await waitFor(() => {
      expect(component.getByTestId("auth-register-form-email")).toHaveValue("");
      expect(component.getByTestId("auth-register-form-username")).toHaveValue("");
      expect(component.getByTestId("auth-register-form-password")).toHaveValue("");
    });
    fireEvent.change(component.getByTestId("auth-register-form-email"), {
      target: { value: "Some custom email" },
    });
    await waitFor(() => {
      expect(component.getByTestId("auth-register-form-email")).toHaveValue("Some custom email");
    });

    fireEvent.click(component.getByTestId("auth-register-form-submit"));
    //TODO - add tests for request
  });
});
