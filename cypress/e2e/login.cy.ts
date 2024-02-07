describe('login test', () => {
  const getDataTest = (selector: string) => {
    return cy.getDataTest(selector);
  };
  beforeEach(() => {
    cy.visit(`http://localhost:3000/`);
  });
  it('should login and logout', () => {
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
    // logout
    cy.getDataTest('profile-dropdown').click();
    cy.getDataTest('profile-dropdown-content').should('exist');
    cy.getDataTest('logout').click();
    cy.location('pathname').should('equal', '/');
  });

  it('should email wrong', () => {
    // Open login dialog
    cy.getDataTest('login-button').eq(0).click();
    cy.getDataTest('login-form').should('exist');
    // input form
    cy.getDataTest('email-input').type('dfs@gmail.com');
    cy.getDataTest('password-input').type('test123');
    // submit
    cy.getDataTest('submit-login').click();
    cy.wait(1000);
    getDataTest('toaster').should('have.text', 'Invalid email or password');
  });

  it('should password wrong', () => {
    // Open login dialog
    cy.getDataTest('login-button').eq(0).click();
    cy.getDataTest('login-form').should('exist');
    // input form
    cy.getDataTest('email-input').type('test123@gmail.com');
    cy.getDataTest('password-input').type('test1234');
    // submit
    cy.getDataTest('submit-login').click();
    cy.wait(1000);
    getDataTest('toaster').should('have.text', 'Invalid email or password');
  });

  it('should invalid empty wrong', () => {
    // Open login dialog
    cy.getDataTest('login-button').eq(0).click();
    cy.getDataTest('login-form').should('exist');
    // submit
    cy.getDataTest('submit-login').click();
    cy.wait(1000);
    getDataTest('form-message').should('exist');
  });
});
