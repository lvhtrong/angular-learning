Cypress.Commands.add("apartmentCreate", ({ name }, key = "apartmentCreate") => {
  return cy.window().then(win => {
    const token = win.sessionStorage.getItem("token");

    return cy
      .request({
        method: "POST",
        url: `${Cypress.env("api_url")}/apartments`,
        headers: { Authorization: `Bearer ${token}` },
        body: {
          title: name
        }
      })
      .as(key);
  });
});

Cypress.Commands.add("apartmentDelete", key => {
  return cy.window().then(win => {
    const token = win.sessionStorage.getItem("token");

    return cy.get(`@${key}`).then(response => {
      const { body } = response;

      return cy.request({
        method: "DELETE",
        url: `${Cypress.env("api_url")}/apartments/${body.id}`,
        headers: { Authorization: `Bearer ${token}` }
      });
    });
  });
});
