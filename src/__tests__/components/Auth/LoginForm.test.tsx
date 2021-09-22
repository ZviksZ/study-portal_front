import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react";
import LoginForm from "components/Auth/LoginForm/LoginForm";

describe("LoginForm", () => {
  test("Simple usage", async () => {
    const component = render(<LoginForm />);

    await waitFor(() => component.getByTestId("auth-login-form"));

    await waitFor(() => {
      expect(component.getByTestId("auth-login-form-email")).toHaveValue("");
      expect(component.getByTestId("auth-login-form-password")).toHaveValue("");
    });
    fireEvent.change(component.getByTestId("auth-login-form-email"), {
      target: { value: "Some custom email" },
    });
    await waitFor(() => {
      expect(component.getByTestId("auth-login-form-email")).toHaveValue("Some custom email");
    });

    fireEvent.click(component.getByTestId("auth-login-form-submit"));
    //TODO - add tests for request
  });
});
