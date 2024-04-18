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
    cy.wait(5000);
    getDataTest('profile-dropdown').click();
    getDataTest('dashboard-button').click();
  });

  it('should edit title, desc, and item without images', () => {
    getDataTest('edit-button').eq(1).click();
    cy.wait(2000);
    getDataTest('container-title-input').should('have.value', 'Test1');
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

describe('create and edit tag', () => {
  const initCatalog = {
    title: 'Test 1',
    desc: 'Lorem ipsum',
    item: [
      {
        title: 'Test 1-1',
        desc: 'Lorem 1-1',
        tags: ['Halo', 'Hello', 'World'],
      },
      {
        title: 'Test 2-2',
        desc: 'Lorem 2-2',
        tags: ['Haloo', 'Helloo', 'Worldo'],
      },
      {
        title: 'Test 3-3',
        desc: 'Lorem 3-3',
        tags: ['Halow', 'Hellow', 'Worldw'],
      },
    ],
  };
  const editedCatalog1 = {
    title: 'Test 1 edited',
    desc: 'Lorem ipsum edited',
    editedItem: [
      {
        title: 'Test 1-1 edited',
        desc: 'Lorem 1-1 edited',
        tags: ['Halow', 'Hellno', 'Warudo'],
      },
      {
        title: 'Test 1-2 edited',
        desc: 'Lorem 1-2 edited',
        tags: ['Haloo', 'Hellnoo', 'Warudo', 'Warudow'],
      },
      {
        title: 'Test 1-3 edited',
        desc: 'Lorem 1-3 edited',
        tags: ['Halow', 'Hellno', 'Warudo', 'Naisu'],
      },
    ],
  };
  const editedCatalog2: editCatalogProps = {
    ...editedCatalog1,
    editedItem: [
      null,
      {
        title: 'Test 1-3 Edited 2',
        desc: 'Desc 1-3 Edited 2',
        tags: ['Nothing'],
      },
    ],
  };
  const editedCatalog3: editCatalogProps = {
    ...editedCatalog1,
    editedItem: [
      {
        title: 'Test 1-1 edited 3',
        desc: 'Lorem 1-1 edited 3',
        tags: ['Halow', 'Hellno'],
      },
      null,
    ],
    addedItem: [
      {
        title: 'Test 1-4 edited 3',
        desc: 'Lorem 1-4 edited 3',
        tags: ['Halow', 'Hellno', 'Hehehaw'],
      },
      {
        title: 'Test 1-5 edited 3',
        desc: 'Lorem 1-5 edited 3',
      },
    ],
  };
  before(() => {
    cy.login('login1');
    cy.createCatalog(initCatalog);
  });
  beforeEach(() => {
    cy.login('login1');
  });
  it('should create multiple tags', () => {
    cy.visit('http://localhost:3000/dashboard');
    cy.wait(1000);
    cy.getDataTest('edit-button').eq(0).click();
    cy.checkCatalog(initCatalog);
    cy.editCatalog(editedCatalog1);
    cy.getDataTest('edit-button').eq(0).click();
    cy.checkCatalog({ ...editedCatalog1, item: editedCatalog1.editedItem });
  });
  it('should tags corresponds with the item when one of the items is deleted', () => {
    cy.visit('http://localhost:3000/dashboard');
    cy.wait(1000);
    cy.getDataTest('edit-button').eq(0).click();
    cy.deleteItem([1]);
    cy.getDataTest('create-submit-button').click();
    cy.wait(1000);
    cy.getDataTest('edit-button').eq(0).click();
    cy.checkCatalog({
      ...editedCatalog1,
      item: [
        {
          title: 'Test 1-1 edited',
          desc: 'Lorem 1-1 edited',
          tags: ['Halow', 'Hellno', 'Warudo'],
        },
        {
          title: 'Test 1-3 edited',
          desc: 'Lorem 1-3 edited',
          tags: ['Halow', 'Hellno', 'Warudo', 'Naisu'],
        },
      ],
    });
  });
  it('should modify some tags (not all item are modified)', () => {
    cy.visit('http://localhost:3000/dashboard');
    cy.wait(1000);
    cy.getDataTest('edit-button').eq(0).click();
    cy.editCatalog(editedCatalog2);
    cy.getDataTest('edit-button').eq(0).click();
    cy.checkCatalog({
      ...editedCatalog2,
      item: [
        {
          title: 'Test 1-1 edited',
          desc: 'Lorem 1-1 edited',
          tags: ['Halow', 'Hellno', 'Warudo'],
        },
        {
          title: 'Test 1-3 Edited 2',
          desc: 'Desc 1-3 Edited 2',
          tags: ['Nothing'],
        },
      ],
    });
  });
  it('should add item with tag an no tag', () => {
    cy.visit('http://localhost:3000/dashboard');
    cy.wait(1000);
    cy.getDataTest('edit-button').eq(0).click();
    cy.editCatalog(editedCatalog3);
    cy.getDataTest('edit-button').eq(0).click();
    cy.checkCatalog({
      ...editedCatalog3,
      item: [
        {
          title: 'Test 1-1 edited 3',
          desc: 'Lorem 1-1 edited 3',
          tags: ['Halow', 'Hellno'],
        },
        {
          title: 'Test 1-3 Edited 2',
          desc: 'Desc 1-3 Edited 2',
          tags: ['Nothing'],
        },
        {
          title: 'Test 1-4 edited 3',
          desc: 'Lorem 1-4 edited 3',
          tags: ['Halow', 'Hellno', 'Hehehaw'],
        },
        {
          title: 'Test 1-5 edited 3',
          desc: 'Lorem 1-5 edited 3',
        },
      ],
    });
  });

  after(() => {
    cy.login('login1');
    cy.deleteCatalog(1);
  });
});

// TODO: Delete catalog items
describe.skip('edit delete item', () => {
  it('should delete one item to empty the catalog items ', () => {});
  it('should delete some items to empty the catalog items ', () => {});
  it('should delete first item', () => {});
  it('should delete last item', () => {});
  it('should delete one of the items in the middle', () => {});
  it('should delete some of the items in the middle', () => {});
});

describe.skip('manual tests', () => {
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
