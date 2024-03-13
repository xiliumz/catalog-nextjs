describe('edit catalog', () => {
  const getDataTest = (selector: string) => {
    return cy.getDataTest(selector);
  };
  before(() => {
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
    getDataTest('profile-dropdown').click();
    getDataTest('dashboard-button').click();
    getDataTest('create-catalog-button').click();
    // Catalog container
    getDataTest('container-title-input').type('Test1');
    getDataTest('container-code-input').type('SUCCESS');
    getDataTest('container-desc-input').type(
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum animi corporis ullam sapiente consequuntur obcaecati, delectus incidunt velit rerum facere accusantium ab nulla odio nam consectetur reprehenderit neque odit omnis.'
    );
    // Add item
    getDataTest('add-catalog-item-button').click();
    getDataTest('catalog-item').should('exist');
    // Input item
    getDataTest('item-title-input').type('test2-title-1');
    getDataTest('item-desc-input').type('test2-desc-1');
    // Add item
    getDataTest('add-catalog-item-button').click();
    getDataTest('catalog-item').should('exist');
    // Input item
    getDataTest('item-title-input').eq(1).type('test2-title-2');
    getDataTest('item-desc-input').eq(1).type('test2-desc-2');
    // Add item
    getDataTest('add-catalog-item-button').click();
    getDataTest('catalog-item').should('exist');
    // Input item
    getDataTest('item-title-input').eq(2).type('test2-title-3');
    getDataTest('item-desc-input').eq(2).type('test2-desc-3');
    // Submit
    getDataTest('create-submit-button').click();
    cy.location('pathname').should('equal', '/dashboard');

    getDataTest('create-catalog-button').click();
    // Catalog container
    getDataTest('container-title-input').type('Test2');
    getDataTest('container-desc-input').type(
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum animi corporis ullam sapiente consequuntur obcaecati, delectus incidunt velit rerum facere accusantium ab nulla odio nam consectetur reprehenderit neque odit omnis.'
    );
    // Submit
    getDataTest('create-submit-button').click();
    cy.location('pathname').should('equal', '/dashboard');
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
    getDataTest('profile-dropdown').click();
    getDataTest('dashboard-button').click();
  });

  it('should edit title, desc, and item without images', () => {
    getDataTest('edit-button').eq(1).click();
    cy.wait(1000);
    getDataTest('container-title-input').clear().type('Title Edited 1');
    getDataTest('container-desc-input')
      .clear()
      .type('Desc Edited 1, Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime, ducimus!');
    getDataTest('item-title-input').eq(0).clear().type('test2-title-edited-1');
    getDataTest('item-desc-input').eq(0).clear().type('test2-desc-edited-1');
    getDataTest('item-title-input').eq(1).clear().type('test2-title-edited-2');
    getDataTest('item-desc-input').eq(1).clear().type('test2-desc-edited-2');
    getDataTest('item-title-input').eq(2).clear().type('test2-title-edited-3');
    getDataTest('item-desc-input').eq(2).clear().type('test2-desc-edited-3');
    getDataTest('create-submit-button').click();
    cy.location('pathname').should('contain', '/dashboard');
    cy.wait(1000);
    getDataTest('catalog-more-card').eq(1).click();
    getDataTest('catalog-view-card').click();
    cy.location('pathname').should('contain', '/u/');
    getDataTest('profile-dropdown').should('exist');
    getDataTest('view-title').should('contain.text', 'Title Edited 1');
    getDataTest('view-desc').should(
      'have.text',
      'Desc Edited 1, Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime, ducimus!'
    );
    getDataTest('view-item-title').should('have.length', 3);
    getDataTest('view-item-title').eq(0).should('contain.text', 'test2-title-edited-1');
    getDataTest('view-item-desc').eq(0).should('contain.text', 'test2-desc-edited-1');
    getDataTest('view-item-title').eq(1).should('contain.text', 'test2-title-edited-2');
    getDataTest('view-item-desc').eq(1).should('contain.text', 'test2-desc-edited-2');
    getDataTest('view-item-title').eq(2).should('contain.text', 'test2-title-edited-3');
    getDataTest('view-item-desc').eq(2).should('contain.text', 'test2-desc-edited-3');

    cy.visit('http://localhost:3000/dashboard');
    getDataTest('edit-button').eq(0).click();
    cy.wait(1000);
    getDataTest('container-title-input').clear().type('Title Edited 2');
    getDataTest('container-desc-input')
      .clear()
      .type('Desc Edited 2, Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime, ducimus!');
    getDataTest('create-submit-button').click();
    cy.wait(1000);
    getDataTest('catalog-more-card').eq(0).click();
    getDataTest('catalog-view-card').click();
    cy.location('pathname').should('contain', '/u/');
    getDataTest('profile-dropdown').should('exist');
    getDataTest('view-title').should('contain.text', 'Title Edited 2');
    getDataTest('view-desc').should(
      'have.text',
      'Desc Edited 2, Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime, ducimus!'
    );
  });
  it('should add item without images', () => {
    getDataTest('edit-button').eq(1).click();
    cy.wait(1000);
    getDataTest('add-catalog-item-button').click();
    getDataTest('add-catalog-item-button').click();
    getDataTest('catalog-item').eq(3).should('exist');
    getDataTest('item-title-input').eq(3).type('test2-title-edited-4');
    getDataTest('item-desc-input').eq(3).type('test2-desc-edited-4');
    getDataTest('catalog-item').eq(4).should('exist');
    getDataTest('item-title-input').eq(4).type('test2-title-edited-5');
    getDataTest('item-desc-input').eq(4).type('test2-desc-edited-5');
    getDataTest('create-submit-button').click();
    getDataTest('catalog-more-card').eq(1).click();
    getDataTest('catalog-view-card').click();
    cy.location('pathname').should('contain', '/u/');
    getDataTest('profile-dropdown').should('exist');
    getDataTest('view-item-title').should('have.length', 5);
    getDataTest('view-item-title').eq(3).should('contain.text', 'test2-title-edited-4');
    getDataTest('view-item-desc').eq(3).should('contain.text', 'test2-desc-edited-4');
    getDataTest('view-item-title').eq(4).should('contain.text', 'test2-title-edited-5');
    getDataTest('view-item-desc').eq(4).should('contain.text', 'test2-desc-edited-5');

    cy.visit('http://localhost:3000/dashboard');
    getDataTest('edit-button').eq(0).click();
    cy.wait(1000);
    getDataTest('add-catalog-item-button').click();
    getDataTest('add-catalog-item-button').click();
    getDataTest('catalog-item').eq(0).should('exist');
    getDataTest('item-title-input').eq(0).type('test2-title-edited-1');
    getDataTest('item-desc-input').eq(0).type('test2-desc-edited-1');
    getDataTest('catalog-item').eq(1).should('exist');
    getDataTest('item-title-input').eq(1).type('test2-title-edited-2');
    getDataTest('item-desc-input').eq(1).type('test2-desc-edited-2');
    getDataTest('create-submit-button').click();
    getDataTest('catalog-more-card').eq(0).click();
    getDataTest('catalog-view-card').click();
    cy.location('pathname').should('contain', '/u/');
    getDataTest('profile-dropdown').should('exist');
    getDataTest('view-item-title').eq(0).should('contain.text', 'test2-title-edited-1');
    getDataTest('view-item-desc').eq(0).should('contain.text', 'test2-desc-edited-1');
    getDataTest('view-item-title').eq(1).should('contain.text', 'test2-title-edited-2');
    getDataTest('view-item-desc').eq(1).should('contain.text', 'test2-desc-edited-2');
  });
  it('should delete item without images', () => {});
  it("should edit catalog's custom code", () => {
    getDataTest('edit-button').eq(1).click();
    cy.wait(1000);
    getDataTest('container-code-input').clear().type('GOODTEST');
  });
  after(() => {
    const len = 2;
    cy.visit('http://localhost:3000/dashboard');
    cy.wait(1000);
    getDataTest('catalog-more-card').should('have.length', len);
    for (let i = 1; i <= len; i++) {
      getDataTest('catalog-more-card').eq(0).click();
      getDataTest('catalog-delete-card').click();
    }
    getDataTest('dashboard-empty').should('exist');
  });
});

describe('fail test', () => {});

describe('edit tag', () => {
  it('should create multiple tags', () => {});
  it('should delete tags', () => {});
  it('should tags corresponds with the item when one of the items is deleted', () => {});
  it('should delete and then add some tags again', () => {});
});

describe('manual tests', () => {
  it('should add new item with image', () => {
    throw new Error(
      'Create manual test where (title, desc, all item with image) and add 2 more item with the same specs'
    );
  });
  it('should edit item and replace the image with new image', () => {
    cy.visit('http://localhost:3000');
    throw new Error('Create manual test where (title, desc, all item with image) and replace 2 image');
  });
});
