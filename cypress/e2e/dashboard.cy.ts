describe('dashboard functionality', () => {
  const getDataTest = (selector: string) => {
    return cy.getDataTest(selector);
  };
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
    cy.wait(1000);
  });

  it('should display no data in dashboard', () => {
    getDataTest('dashboard-empty').should('exist');
  });

  it('should display 1 data after created data', () => {
    // Add data
    getDataTest('create-catalog-button').click();
    getDataTest('container-title-input').type('Test0');
    getDataTest('container-desc-input').type('test0');
    // Submit
    getDataTest('create-submit-button').click();
    cy.location('pathname').should('equal', '/dashboard');
    // Check the data
    getDataTest('catalog-card').should('exist');
  });

  it('should display 6 data after created the data', () => {
    // Add data
    for (let i = 1; i < 6; i++) {
      getDataTest('create-catalog-button').click();
      getDataTest('container-title-input').type(`Test${i}`);
      getDataTest('container-desc-input').type(`test${i}`);
      getDataTest('create-submit-button').click();
      cy.location('pathname').should('equal', '/dashboard');
    }

    getDataTest('catalog-card').should('have.length', 6);
    getDataTest('catalog-more-card').should('have.length', 6);
  });

  it('should display catalog with correct order, the recent created data will be displayed first', () => {
    getDataTest('catalog-title-card').eq(0).should('have.text', 'Test5');
    getDataTest('catalog-title-card').eq(1).should('have.text', 'Test4');
    getDataTest('catalog-title-card').eq(2).should('have.text', 'Test3');
    getDataTest('catalog-title-card').eq(3).should('have.text', 'Test2');
    getDataTest('catalog-title-card').eq(4).should('have.text', 'Test1');
  });

  it.skip('should delete all catalog items', () => {
    getDataTest('catalog-more-card').should('have.length', 6);
    for (let i = 1; i <= 6; i++) {
      getDataTest('catalog-more-card').eq(0).click();
      getDataTest('catalog-delete-card').click();
    }
    getDataTest('dashboard-empty').should('exist');
  });

  // TODO: Move this to view test
  it.skip('should go to view with the corresponding data', () => {
    getDataTest('catalog-more-card').eq(0).click();
    getDataTest('catalog-view-card').click();
  });
});
