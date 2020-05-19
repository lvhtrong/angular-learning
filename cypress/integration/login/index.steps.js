import { given, when, then } from "cypress-cucumber-preprocessor/steps";

const messages = {};

beforeEach(() => {
  cy.window().then((win) => win.sessionStorage.clear());
});

given("a default page", () => {
  cy.visit("/");
});

when("I type {string} as {string}", (value, field) => {
  cy.findByTestId(`login-${field}-field`).type(value);
});

when("I press Login button", () => {
  cy.findByTestId("login-login-button").click();
});

then("{string} appears as {string} message", (message, field) => {
  messages[field] = message;

  cy.findByText(message).should("exist");
});

then("{string} message disappears", (field) => {
  cy.findByText(messages[field]).should("not.exist");
});
