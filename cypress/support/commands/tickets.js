Cypress.Commands.add(
  "ticketCreate",
  (apartmentKey, { title }, key = "ticketCreate") => {
    return cy.window().then(win => {
      const token = win.sessionStorage.getItem("token");

      return cy.get(`@${apartmentKey}`).then(response => {
        const { body } = response;

        return cy
          .request({
            method: "POST",
            url: `${Cypress.env("api_url")}/tickets`,
            headers: { Authorization: `Bearer ${token}` },
            body: {
              apartment: body.id,
              title
            }
          })
          .as(key);
      });
    });
  }
);

Cypress.Commands.add("ticketClose", key => {
  return cy.window().then(win => {
    const token = win.sessionStorage.getItem("token");

    return cy.get(`@${key}`).then(response => {
      const { body } = response;

      return cy.request({
        method: "POST",
        url: `${Cypress.env("api_url")}/tickets/${body.id}/close`,
        headers: { Authorization: `Bearer ${token}` }
      });
    });
  });
});
