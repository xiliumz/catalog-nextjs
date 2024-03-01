describe('edit catalog', () => {
  const getDataTest = (selector: string) => {
    return cy.getDataTest(selector);
  };
  before(() => {
    // TODO: add some catalogs for edit test
  });

  beforeEach(() => {
    cy.session('login', () => {
      cy.visit(`http://localhost:3000/`);
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
    });
    cy.visit(`http://localhost:3000/`);
    getDataTest('dashboard-button').click();
    getDataTest('create-catalog-button').click();
  });

  it('should edit title, desc, and item without images', () => {});
  it('should add item without images', () => {});
  it('should delete item without images', () => {});

  after(() => {
    // TODO: del all the catalog from edit test
  });
});
