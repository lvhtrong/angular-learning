import { when } from "cypress-cucumber-preprocessor/steps";

when("I click {string} to confirm", buttonText => {
  cy.findByText(buttonText).click();
});
