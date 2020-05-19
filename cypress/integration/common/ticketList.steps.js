import { given, when, then } from "cypress-cucumber-preprocessor/steps";

when("I select {string} apartment on apartment dropdown", apartmentName => {
  cy.findByTestId("tickets-apartment-list").select(apartmentName);
});

when("I select {string} tickets filter", status => {
  cy.findByTestId("tickets-status-list").select(status);
});

when("I click {string} ticket", ticketTitle => {
  cy.findByText(ticketTitle).click();
});

then(
  "the number of {string} ticket comment is {int}",
  (ticketTitle, numberOfComment) => {
    cy.findAllByTestId("ticket")
      .first()
      .findByTestId("ticket-comment-number")
      .should("contain", numberOfComment);
  }
);

then("it shows {int} as {string}:", (numberOfTicket, status, datatable) => {
  // assert the number of ticket by status
  cy.findByText(`${numberOfTicket} ${status}`).should("exist");

  // assert the number of ticket as expected
  cy.findAllByTestId("ticket").should("have.length", numberOfTicket);

  // assert all expected tickets have existed
  if (datatable) {
    const table = datatable.hashes();
    table.forEach(row => {
      cy.findByText(row.name).should("exist");
    });
  }
});
