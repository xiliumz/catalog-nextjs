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

describe('auth home page functionality', () => {
  beforeEach(() => {
    cy.visit(`http://localhost:3000/`);
  });
  it('should login and display the correct homepage display', () => {
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
    cy.visit(`http://localhost:3000/`);
    // go to dashboard
    cy.getDataTest('profile-dropdown').should('exist');
  });
});

describe.only('search feature', () => {
  const login = () => {
    cy.session('login', () => {
      cy.visit('http://localhost:3000');
      cy.getDataTest('login-button').eq(0).click();
      cy.getDataTest('email-input').type('qwe@qwe.com');
      cy.getDataTest('password-input').type('qweqwe');
      cy.getDataTest('submit-login').click();
      cy.wait(2000);
      cy.location('pathname').should('equal', '/dashboard');
    });
  };
  const getDataTest = (selector: string) => {
    return cy.getDataTest(selector);
  };

  before(() => {
    login();
    cy.visit('http://localhost:3000/dashboard');
    cy.getDataTest('create-catalog-button').click();
    cy.wait(2000);
    getDataTest('container-title-input').type('Test1');
    getDataTest('container-desc-input').type('test1');
    getDataTest('container-code-input').type('test1');
    // Submit
    getDataTest('create-submit-button').click();
    cy.location('pathname').should('equal', '/dashboard');
    cy.getDataTest('create-catalog-button').click();
    // Catalog container
    getDataTest('container-title-input').type('Test2');
    getDataTest('container-code-input').type('Test2');
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
    cy.getDataTest('edit-button').eq(0).click();
    cy.wait(2000);
    cy.location('pathname').then((url: string) => {
      Cypress.env('id2', url.split('/')[2]);
    });

    cy.getDataTest('profile-dropdown').click();
    cy.getDataTest('dashboard-button').click();
    cy.getDataTest('create-catalog-button').click();
    // Catalog container
    getDataTest('container-title-input').type('Test3');
    getDataTest('container-code-input').type('Test3');
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

    cy.getDataTest('create-catalog-button').click();
    // Catalog container
    getDataTest('container-title-input').type('Test4');
    getDataTest('container-code-input').type('Test4');
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
    getDataTest('item-title-input').eq(0).type('test4-title-1');
    getDataTest('item-desc-input').eq(0).type('test4-desc-1');
    // Input item
    getDataTest('item-title-input').eq(1).type('test4-title-2');
    getDataTest('item-desc-input').eq(1).type('test4-desc-2');
    // Input item
    getDataTest('item-title-input').eq(2).type('test4-title-3');
    getDataTest('item-desc-input').eq(2).type('test4-desc-3');
    // Submit
    getDataTest('create-submit-button').click();
    cy.location('pathname').should('equal', '/dashboard');
  });
  it('should search with id', () => {
    cy.visit('http://localhost:3000');

    cy.getDataTest('search-catalog').type(Cypress.env('id2'));
    cy.wait(5000);
    cy.getDataTest('searched-title').should('have.text', 'Test2').click();
    cy.getDataTest('view-title').should('have.text', 'Test2');
  });
  it('should search using custom code', () => {
    cy.visit('http://localhost:3000');

    cy.getDataTest('search-catalog').type('test1');
    cy.wait(5000);
    cy.getDataTest('searched-title').should('have.text', 'Test1').click();
    cy.getDataTest('view-title').should('have.text', 'Test1');
  });
  it('should search only show top 3', () => {
    cy.visit('http://localhost:3000');

    cy.getDataTest('search-catalog').type('test');
    cy.wait(5000);
    cy.getDataTest('searched-title').should('have.length', 3);
  });

  after(() => {
    login();
    const len = 4;
    cy.visit('http://localhost:3000/dashboard');
    cy.wait(1000);
    getDataTest('catalog-more-card').should('have.length', len);
    for (let i = 1; i <= len; i++) {
      getDataTest('catalog-more-card').eq(0).focus().click();
      cy.wait(200);
      getDataTest('catalog-delete-card').click();
      cy.wait(200);
    }
    getDataTest('dashboard-empty').should('exist');
  });
});
