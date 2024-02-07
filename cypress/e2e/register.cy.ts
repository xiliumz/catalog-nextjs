describe('register', () => {
  const getDataTest = (selector: string) => {
    return cy.getDataTest(selector);
  };

  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });
  it('should success register', () => {
    // Open register dialog
    cy.getDataTest('register-button-footer').click();
    cy.getDataTest('register-form').should('exist');
    // Fill the field
    getDataTest('input-username-register').type('qwe');
    getDataTest('input-email-register').type('qweqwe@qwe.com');
    getDataTest('input-password-register').type('qweqwe');
    getDataTest('submit-button-register').click();
    // Toast should pop up to indicate success
    getDataTest('toaster').should('have.text', 'Registration successful. Please log in.');
  });
});
