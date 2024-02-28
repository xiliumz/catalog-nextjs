const CATALOG_INDEX = {
  NORMAL: 5,
  ITEM_NO_IMAGE: 3,
  WITHOUT_DESC: 2,
  WITHOUT_ITEM: 1,
  NO_ITEM_DESC: 0,
};

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

  it('should display normal catalog: 3 item (image), desc, title', () => {
    getDataTest('catalog-more-card').eq(CATALOG_INDEX.NORMAL).click();
    getDataTest('catalog-view-card').click();
    cy.location('pathname').should('contain', '/u/');

    getDataTest('profile-dropdown').should('exist');
    getDataTest('view-title').should('contain.text', 'Test 1');
    getDataTest('view-desc').should('have.text', 'Lorem ipsum');

    getDataTest('view-item-title').should('have.length', 3);
    cy.screenshot();
  });

  it('should display normal catalog: 3 item (no image), desc, title', () => {
    getDataTest('catalog-more-card').eq(CATALOG_INDEX.ITEM_NO_IMAGE).click();
    getDataTest('catalog-view-card').click();
    cy.location('pathname').should('contain', '/u/');

    getDataTest('view-title').should('contain.text', 'Only item');
    getDataTest('view-desc').should('have.text', 'Display item only');

    getDataTest('view-item-title').should('have.length', 3);
    cy.screenshot();
  });

  it('should display catalog without desc', () => {
    getDataTest('catalog-more-card').eq(CATALOG_INDEX.WITHOUT_DESC).click();
    getDataTest('catalog-view-card').click();
    cy.location('pathname').should('contain', '/u/');

    getDataTest('view-title').should('contain.text', 'Title with no desc');
    getDataTest('view-desc').should('have.text', '');

    getDataTest('view-item-title').should('have.length', 3);
    cy.screenshot();
  });

  it('should display catalog without item and display no item message', () => {
    getDataTest('catalog-more-card').eq(CATALOG_INDEX.WITHOUT_ITEM).click();
    getDataTest('catalog-view-card').click();
    cy.location('pathname').should('contain', '/u/');

    getDataTest('view-title').should('contain.text', 'Without item');
    getDataTest('view-desc').should('have.text', 'should display catalog without item');

    getDataTest('no-item').should('exist');
    cy.screenshot();
  });

  it('should display catalog without desc and item', () => {
    getDataTest('catalog-more-card').eq(CATALOG_INDEX.NO_ITEM_DESC).click();
    getDataTest('catalog-view-card').click();
    cy.location('pathname').should('contain', '/u/');

    getDataTest('view-title').should('contain.text', 'No item and desc');
    getDataTest('view-desc').should('have.text', '');

    getDataTest('no-item').should('exist');
    cy.screenshot();
  });
  it('should visit by url directly', () => {
    cy.visit('http://localhost:3000/u/qweqwe/9aea504f-2ac8-448d-8f70-757003b469ae-1708323528152');
    cy.wait(1000);
    cy.location('pathname').should('contain', '/u/');

    getDataTest('view-title').should('contain.text', 'Test 1');
    getDataTest('view-desc').should('have.text', 'Lorem ipsum');

    getDataTest('view-item-title').should('have.length', 3);
    cy.screenshot();
  });
});

describe('functionlity test', () => {
  it('should search specific title', () => {});
});

describe.only('view page without login', () => {
  const getDataTest = (selector: string) => {
    return cy.getDataTest(selector);
  };
  it('should display page properly even without login', () => {
    cy.visit('http://localhost:3000/u/qweqwe/9aea504f-2ac8-448d-8f70-757003b469ae-1708323528152');
    cy.wait(1000);
    cy.location('pathname').should('contain', '/u/');

    getDataTest('login-button').should('exist');
    getDataTest('view-title').should('contain.text', 'Test 1');
    getDataTest('view-desc').should('have.text', 'Lorem ipsum');

    getDataTest('view-item-title').should('have.length', 3);
    cy.screenshot();
  });
});
