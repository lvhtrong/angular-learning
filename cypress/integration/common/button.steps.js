import { when } from "cypress-cucumber-preprocessor/steps";

when("I click {string} button", buttonTitle => {
  cy.findByText(buttonTitle).click();
});
