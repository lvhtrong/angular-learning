import { then, given } from "cypress-cucumber-preprocessor/steps";

given("I open {string} page", path => {
  cy.visit(path);
});

then("it lands on {string} page", path => {
  cy.url().should("contain", path);
});
