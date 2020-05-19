Cypress.Commands.add("loginAsAdmin", () => {
  const username = "admin@gmail.com";
  const password = "123456";

  return cy
    .request({
      method: "POST",
      url: `${Cypress.env("api_url")}/auth/login`,
      body: {
        email: username,
        password
      }
    })
    .then(response => {
      const { body } = response;

      return cy.window().then(win => {
        win.sessionStorage.setItem("userName", body.user.email);
        win.sessionStorage.setItem("token", body.token.accessToken);
        win.sessionStorage.setItem("refreshToken", body.token.refreshToken);
      });
    });
});

Cypress.Commands.add("logout", () => {
  return cy.window().then(win => {
    win.sessionStorage.removeItem("userName");
    win.sessionStorage.removeItem("token");
    win.sessionStorage.removeItem("refreshToken");
  });
});
