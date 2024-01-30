describe('template spec', () => {
  beforeEach(() => {
    cy.visit(`http://localhost:3000/`);
  });
  it('has login button and footer register and login', () => {
    cy.getDataTest('login-button').should('exist');
    cy.getDataTest('register-button-footer').should('exist');
  });

  it('should open login dialog', () => {
    cy.getDataTest('login-button').eq(0).click();
    cy.getDataTest('login-dialog').should('exist');
    // TODO: add more scenario
  });

  // TODO: add register dialog
});
