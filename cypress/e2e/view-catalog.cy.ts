describe('display test', () => {
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
  });

  it.only('should display normal catalog: 3 item (image, desc), desc, title', () => {
    getDataTest('catalog-more-card').eq(3).click();
    getDataTest('catalog-view-card').click();
    cy.location('pathname').should('contain', '/u/');

    getDataTest('view-title').should('contain.text', 'Test 1');
    getDataTest('view-desc').should('have.text', 'Lorem ipsum');

    getDataTest('view-item-title').should('have.length', 3);
    cy.screenshot();
  });

  it('should display normal catalog: 3 item (no image, desc), desc, title', () => {});
  it('should display normal catalog: 3 item (no image, no desc), desc, title', () => {});
  it('should display catalog without desc', () => {});
  it('should display catalog without item', () => {});
  it('should display catalog without desc and item', () => {});
  it('should visit by url directly', () => {});
});

describe('functionlity test', () => {
  it('should search specific title', () => {});
});

describe('view page without login', () => {});
