describe('change password', () => {
  const getDataTest = (selector: string) => {
    return cy.getDataTest(selector);
  };
  beforeEach(() => {
    cy.visit(`http://localhost:3000/`);
  });

  it('should change password', () => {
    const newPass = 'SREdtfGYU5U&^I879:p';
    // Open login dialog
    cy.getDataTest('login-button').eq(0).click();
    cy.getDataTest('login-form').should('exist');
    // input form
    cy.getDataTest('email-input').type('qwe@qwe.com');
    cy.getDataTest('password-input').type('qweqwe');
    // submit
    cy.getDataTest('submit-login').click();
    cy.wait(1000);
    cy.location('pathname').should('equal', '/dashboard');

    getDataTest('profile-dropdown').click();
    getDataTest('profile-button').click();
    cy.location('pathname').should('equal', '/profile');
    getDataTest('profile-password-input').type(newPass);
    getDataTest('profile-submit').click();
    cy.intercept('http://localhost:3000/dashboard').as('dashboard');
    cy.wait(3000);

    getDataTest('profile-dropdown').click();
    getDataTest('logout').click();
    cy.location('pathname').should('equal', '/');
    // Open login dialog
    cy.getDataTest('login-button').eq(0).click();
    cy.getDataTest('login-form').should('exist');
    // input form
    cy.getDataTest('email-input').type('qwe@qwe.com');
    cy.getDataTest('password-input').type(newPass);
    // submit
    cy.getDataTest('submit-login').click();
    cy.wait(2000);
    cy.location('pathname').should('equal', '/dashboard');

    getDataTest('profile-dropdown').click();
    getDataTest('profile-button').click();
    cy.location('pathname').should('equal', '/profile');
    getDataTest('profile-password-input').type('qweqwe');
    getDataTest('profile-submit').click();
  });
});
