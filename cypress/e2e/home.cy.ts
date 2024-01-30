describe('auth ui functionality', () => {
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
  });

  it('should open register from login', () => {
    // Open login dialog
    cy.getDataTest('login-button').eq(0).click();
    cy.getDataTest('login-form').should('exist');
    // open register
    cy.getDataTest('register-button-login').click();
    cy.getDataTest('register-form').should('exist');
    // Close dialog
    cy.get('.lucide-x').as('closeDialog').click();
    // Open login dialog
    cy.getDataTest('login-button').eq(0).click();
    cy.getDataTest('login-form').should('exist');
  });

  it('should open register dialog', () => {
    cy.getDataTest('register-button-footer').click();
    cy.getDataTest('register-form').should('exist');
  });

  it('should open login from register', () => {
    // Open register dialog
    cy.getDataTest('register-button-footer').click();
    cy.getDataTest('register-form').should('exist');
    // open login
    cy.getDataTest('login-button-register').click();
    cy.getDataTest('login-form').should('exist');
    // Close dialog
    cy.get('.lucide-x').as('closeDialog').click();
    // Open register dialog
    cy.getDataTest('register-button-footer').click();
    cy.getDataTest('register-form').should('exist');
  });
});
