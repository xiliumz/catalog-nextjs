describe('create catalog', () => {
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
    getDataTest('profile-dropdown').click();
    getDataTest('dashboard-button').click();
    getDataTest('create-catalog-button').click();
  });

  it('should create catalog with no items', () => {
    getDataTest('container-title-input').type('Test1');
    getDataTest('container-desc-input').type('test1');
    // Submit
    getDataTest('create-submit-button').click();
    cy.location('pathname').should('equal', '/dashboard');
  });

  it('should create catalog with one item no image', () => {
    // Catalog container
    getDataTest('container-title-input').type('Test2');
    getDataTest('container-desc-input').type(
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum animi corporis ullam sapiente consequuntur obcaecati, delectus incidunt velit rerum facere accusantium ab nulla odio nam consectetur reprehenderit neque odit omnis.'
    );
    // Add item
    getDataTest('add-catalog-item-button').click();
    getDataTest('catalog-item').should('exist');
    // Input item
    getDataTest('item-title-input').type('test2-title-1');
    getDataTest('item-desc-input').type('test2-desc-1');
    // Submit
    getDataTest('create-submit-button').click();
    cy.location('pathname').should('equal', '/dashboard');
  });

  it('should create catalog with three items no image', () => {
    // Catalog container
    getDataTest('container-title-input').type('Test3');
    getDataTest('container-desc-input').type(
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum animi corporis ullam sapiente consequuntur obcaecati, delectus incidunt velit rerum facere accusantium ab nulla odio nam consectetur reprehenderit neque odit omnis.'
    );
    // Add item
    getDataTest('add-catalog-item-button').click();
    // Add item
    getDataTest('add-catalog-item-button').click();
    // Add item
    getDataTest('add-catalog-item-button').click();
    getDataTest('catalog-item').eq(0).should('exist');
    // Input item
    getDataTest('item-title-input').eq(0).type('test3-title-1');
    getDataTest('item-desc-input').eq(0).type('test3-desc-1');
    // Input item
    getDataTest('item-title-input').eq(1).type('test3-title-2');
    getDataTest('item-desc-input').eq(1).type('test3-desc-2');
    // Input item
    getDataTest('item-title-input').eq(2).type('test3-title-3');
    getDataTest('item-desc-input').eq(2).type('test3-desc-3');
    // Submit
    getDataTest('create-submit-button').click();
    cy.location('pathname').should('equal', '/dashboard');
  });

  it('should create catalog with custom code', () => {
    getDataTest('container-title-input').type('Test code');
    getDataTest('container-desc-input').type('test code');
    getDataTest('container-code-input').type('TESTCODE');
    // Submit
    getDataTest('create-submit-button').click();
    cy.location('pathname').should('equal', '/dashboard');
  });

  it('(manual) should create catalog with 1 item and image', () => {
    // Catalog container
    getDataTest('container-title-input').type('Test4');
    getDataTest('container-desc-input').type(
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum animi corporis ullam sapiente consequuntur obcaecati, delectus incidunt velit rerum facere accusantium ab nulla odio nam consectetur reprehenderit neque odit omnis.'
    );
    // Add item
    getDataTest('add-catalog-item-button').click();
    // Input item
    getDataTest('item-title-input').type('test4-title-1');
    getDataTest('item-desc-input').type('test4-desc-1');
    // Add image
    getDataTest('item-file-input').selectFile('cypress/images/another_life.jpeg');
    // Submit
    getDataTest('create-submit-button').click();
    cy.wait(2000);
    cy.location('pathname').should('equal', '/dashboard');
  });

  it('(manual) should create catalog with 3 items and images', () => {
    // Catalog container
    getDataTest('container-title-input').type('Test5');
    getDataTest('container-desc-input').type(
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum animi corporis ullam sapiente consequuntur obcaecati, delectus incidunt velit rerum facere accusantium ab nulla odio nam consectetur reprehenderit neque odit omnis.'
    );
    // Add item
    getDataTest('add-catalog-item-button').click();
    // Add item
    getDataTest('add-catalog-item-button').click();
    // Add item
    getDataTest('add-catalog-item-button').click();
    getDataTest('catalog-item').eq(0).should('exist');
    // Input item
    getDataTest('item-title-input').eq(0).type('test5-title-1');
    getDataTest('item-desc-input').eq(0).type('test5-desc-1');
    getDataTest('item-file-input').eq(0).selectFile('cypress/images/another_life.jpeg');
    // Input item
    getDataTest('item-title-input').eq(1).type('test5-title-2');
    getDataTest('item-desc-input').eq(1).type('test5-desc-2');
    getDataTest('item-file-input').eq(1).selectFile('cypress/images/another_life.jpeg');
    // Input item
    getDataTest('item-title-input').eq(2).type('test5-title-3');
    getDataTest('item-desc-input').eq(2).type('test5-desc-3');
    getDataTest('item-file-input').eq(2).selectFile('cypress/images/another_life.jpeg');
    // Submit
    getDataTest('create-submit-button').click();
    cy.wait(2000);
    cy.location('pathname').should('equal', '/dashboard');
  });
  after(() => {
    const len = 6;
    getDataTest('catalog-more-card').should('have.length', len);
    for (let i = 1; i <= len; i++) {
      getDataTest('catalog-more-card').eq(0).click();
      getDataTest('catalog-delete-card').click();
    }
    getDataTest('dashboard-empty').should('exist');
  });
});

describe('fail test', () => {
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
    getDataTest('container-title-input').type('Test before');
    getDataTest('container-desc-input').type('test before');
    getDataTest('container-code-input').type('FAILTEST');
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
    getDataTest('create-catalog-button').click();
  });

  it('should fail create catalog if custom code is used', () => {
    getDataTest('container-title-input').type('Test before');
    getDataTest('container-desc-input').type('test before');
    getDataTest('container-code-input').type('FAILTEST');

    getDataTest('check-button').click();
    getDataTest('toaster').should('contain.text', 'is already used');
    cy.wait(5000);
    getDataTest('create-submit-button').click();
    getDataTest('toaster').should('contain.text', 'Custom code is already used. Please check it first :)');
  });

  after(() => {
    const len = 1;
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
