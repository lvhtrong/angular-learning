import { when } from "cypress-cucumber-preprocessor/steps";

when("I get back", () => {
  cy.go("back");
});
