import { then, when } from "cypress-cucumber-preprocessor/steps";

const messages = {};

then("show {string} error popup with {string} message", (key, message) => {
  messages[key] = message;

  cy.findByText(message).should("exist");
});

when("I press Close button", () => {
  cy.findByText("Close").click();
});

then("{string} error popup disappears", (key) => {
  cy.findByText(messages[key]).should("not.exist");
});
