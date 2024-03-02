const catalogs = [
  {
    title: 'display normal catalog: 3 item (image), desc, title',
    desc: 'display normal catalog: 3 item (image), desc, title',
  },
  {
    title: 'Test2',
    desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum animi corporis ullam sapiente consequuntur obcaecati, delectus incidunt velit rerum facere accusantium ab nulla odio nam consectetur reprehenderit neque odit omnis.',
  },
  {
    title: 'Test3',
    desc: '',
  },
  {
    title: 'Test4',
    desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum animi corporis ullam sapiente consequuntur obcaecati, delectus incidunt velit rerum facere accusantium ab nulla odio nam consectetur reprehenderit neque odit omnis.',
  },
  {
    title: 'Test5',
    desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum animi corporis ullam sapiente consequuntur obcaecati, delectus incidunt velit rerum facere accusantium ab nulla odio nam consectetur reprehenderit neque odit omnis.',
  },
];

const visitedUrl = '';
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
    getDataTest('profile-dropdown').click();
    getDataTest('dashboard-button').click();
  });

  it('(manual change the url) should visit by url directly', () => {
    cy.visit(visitedUrl);
    cy.wait(1000);
    cy.location('pathname').should('contain', '/u/');

    getDataTest('view-title').should('contain.text', 'Test 1');
    getDataTest('view-desc').should('have.text', 'Lorem ipsum');

    getDataTest('view-item-title').should('have.length', 3);
    cy.screenshot();
  });

  it('(manual) should display normal catalog: 3 item (image), desc, title', () => {
    getDataTest('catalog-more-card').click();
    getDataTest('catalog-view-card').click();
    cy.location('pathname').should('contain', '/u/');

    getDataTest('profile-dropdown').should('exist');
    getDataTest('view-title').should('contain.text', catalogs[0].title);
    getDataTest('view-desc').should('have.text', catalogs[0].desc);

    getDataTest('view-item-title').should('have.length', 3);
    cy.screenshot();
  });

  it('should display normal catalog: 3 item (no image), desc, title', () => {
    getDataTest('create-catalog-button').click();

    // Catalog container
    getDataTest('container-title-input').type(catalogs[1].title);
    getDataTest('container-desc-input').type(catalogs[1].desc);
    // Add item
    getDataTest('add-catalog-item-button').click();
    getDataTest('catalog-item').should('exist');
    // Input item
    getDataTest('item-title-input').type('test2-title-1');
    getDataTest('item-desc-input').type('test2-desc-1');
    getDataTest('add-catalog-item-button').click();
    getDataTest('catalog-item').should('exist');
    // Input item
    getDataTest('item-title-input').eq(1).type('test2-title-2');
    getDataTest('item-desc-input').eq(1).type('test2-desc-2');
    getDataTest('add-catalog-item-button').click();
    getDataTest('catalog-item').should('exist');
    // Input item
    getDataTest('item-title-input').eq(2).type('test2-title-3');
    getDataTest('item-desc-input').eq(2).type('test2-desc-3');
    // Submit
    getDataTest('create-submit-button').click();
    cy.location('pathname').should('equal', '/dashboard');

    getDataTest('catalog-more-card').eq(0).click();
    getDataTest('catalog-view-card').click();
    cy.location('pathname').should('contain', '/u/');

    getDataTest('view-title').should('contain.text', catalogs[1].title);
    getDataTest('view-desc').should('have.text', catalogs[1].desc);

    getDataTest('view-item-title').should('have.length', 3);
    cy.screenshot();
  });

  it('should display catalog without desc', () => {
    getDataTest('create-catalog-button').click();

    // Catalog container
    getDataTest('container-title-input').type(catalogs[2].title);
    // Add item
    getDataTest('add-catalog-item-button').click();
    getDataTest('catalog-item').should('exist');
    // Input item
    getDataTest('item-title-input').type('test3-title-1');
    getDataTest('item-desc-input').type('test3-desc-1');
    getDataTest('add-catalog-item-button').click();
    getDataTest('catalog-item').should('exist');
    // Input item
    getDataTest('item-title-input').eq(1).type('test3-title-2');
    getDataTest('item-desc-input').eq(1).type('test3-desc-2');
    getDataTest('add-catalog-item-button').click();
    getDataTest('catalog-item').should('exist');
    // Input item
    getDataTest('item-title-input').eq(2).type('test3-title-3');
    getDataTest('item-desc-input').eq(2).type('test3-desc-3');
    // Submit
    getDataTest('create-submit-button').click();
    cy.location('pathname').should('equal', '/dashboard');

    getDataTest('catalog-more-card').eq(0).click();
    getDataTest('catalog-view-card').click();
    cy.location('pathname').should('contain', '/u/');

    getDataTest('view-title').should('contain.text', catalogs[2].title);
    getDataTest('view-desc').should('have.text', '');

    getDataTest('view-item-title').should('have.length', 3);
    cy.screenshot();
  });

  it('should display catalog without item and display no item message', () => {
    getDataTest('create-catalog-button').click();

    // Catalog container
    getDataTest('container-title-input').type(catalogs[3].title);
    getDataTest('container-desc-input').type(catalogs[3].desc);
    // Submit
    getDataTest('create-submit-button').click();
    cy.location('pathname').should('equal', '/dashboard');

    getDataTest('catalog-more-card').eq(0).click();
    getDataTest('catalog-view-card').click();
    cy.location('pathname').should('contain', '/u/');

    getDataTest('view-title').should('contain.text', catalogs[3].title);
    getDataTest('view-desc').should('have.text', catalogs[3].desc);
    getDataTest('no-item').should('exist');
    cy.screenshot();
  });

  it('should display catalog without desc and item', () => {
    getDataTest('create-catalog-button').click();

    // Catalog container
    getDataTest('container-title-input').type(catalogs[4].title);
    // Submit
    getDataTest('create-submit-button').click();
    cy.location('pathname').should('equal', '/dashboard');

    getDataTest('catalog-more-card').eq(0).click();
    getDataTest('catalog-view-card').click();
    cy.location('pathname').should('contain', '/u/');

    getDataTest('view-title').should('contain.text', catalogs[4].title);
    getDataTest('view-desc').should('have.text', '');

    getDataTest('no-item').should('exist');
    cy.screenshot();
  });

  after(() => {
    cy.visit('http://localhost:3000/dashboard');
    getDataTest('catalog-more-card').should('have.length', 5);
    for (let i = 1; i <= 5; i++) {
      getDataTest('catalog-more-card').eq(0).click();
      getDataTest('catalog-delete-card').click();
    }
    getDataTest('dashboard-empty').should('exist');
  });
});

describe('functionlity test', () => {
  it('should search specific title', () => {});
});

describe('view page without login', () => {
  const getDataTest = (selector: string) => {
    return cy.getDataTest(selector);
  };
  it('should display page properly even without login', () => {
    cy.visit(visitedUrl);
    cy.wait(1000);
    cy.location('pathname').should('contain', '/u/');

    getDataTest('login-button').should('exist');
    getDataTest('view-title').should('contain.text', 'Test 1');
    getDataTest('view-desc').should('have.text', 'Lorem ipsum');

    getDataTest('view-item-title').should('have.length', 3);
    cy.screenshot();
  });
});
