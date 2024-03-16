/// <reference types="cypress" />

interface itemProps {
  title: string;
  desc?: string;
  imagePath?: string;
  tags?: string[];
}

interface createCatalogProps {
  title: string;
  desc?: string;
  item?: itemProps[];
  submit?: boolean;
}

interface editCatalogProps extends Omit<createCatalogProps, 'item'> {
  addedItem?: itemProps[];
  editedItem?: itemProps[];
}

declare namespace Cypress {
  interface Chainable {
    getDataTest(dataTestAttribute: string): Chainable<JQuery<HTMLElement>>;
    createCatalog(option: createCatalogProps): void;
    login(email?: string, password?: string): void;
    deleteTag(index?: number): void;
    deleteCatalog(total?: number): void;
    dashboardMoreButton(option: 'delete' | 'share' | 'view', index?: number): void;
    editCatalog(option: editCatalogProps): void;
    addTag(tag: string): void;
    checkCatalog(option: createCatalogProps): void;
  }
}

Cypress.Commands.add('getDataTest', (selector) => {
  return cy.get(`[data-test=${selector}]`);
});

Cypress.Commands.add('createCatalog', (option) => {
  const _submit = option.submit || true;
  cy.visit('http://localhost:3000/create');
  cy.getDataTest('container-title-input').type(option.title);

  if (option.desc) cy.getDataTest('container-desc-input').type(option.desc);
  if (option.item) {
    option.item.map((v, index) => {
      cy.getDataTest('add-catalog-item-button').click();
      cy.getDataTest('catalog-item').should('exist');
      cy.getDataTest('item-title-input').type(v.title);
      if (v.desc) cy.getDataTest('item-desc-input').type(v.desc);
      if (v.imagePath) cy.getDataTest('item-file-input').eq(index).selectFile(v.imagePath);
      if (v.tags && v.tags.length > 0)
        v.tags.map((tag) => {
          cy.get(`[data-testid=input]`).type(`${tag}{enter}`);
        });
    });
  }
  if (!_submit) {
    return;
  }
  cy.getDataTest('create-submit-button').click();
  cy.wait(1000);
  cy.location('pathname').should('equal', '/dashboard');
});

Cypress.Commands.add('login', (email, password) => {
  cy.session('login', () => {
    cy.visit(`http://localhost:3000/`);
    // Open login dialog
    cy.getDataTest('login-button').eq(0).click();
    cy.getDataTest('login-form').should('exist');
    // input form
    cy.getDataTest('email-input').type(email || 'qwe@qwe.com');
    cy.getDataTest('password-input').type(password || 'qweqwe');
    // submit
    cy.getDataTest('submit-login').click();
    cy.wait(1000);
    cy.location('pathname').should('equal', '/dashboard');
  });
  cy.visit(`http://localhost:3000/`);
  cy.getDataTest('profile-dropdown').click();
  cy.getDataTest('dashboard-button').click();
});

Cypress.Commands.add('deleteTag', (index = 0) => {
  cy.get('.ReactTags__remove').eq(index).click();
});

Cypress.Commands.add('deleteCatalog', (total = 1) => {
  cy.visit('http://localhost:3000/dashboard');
  cy.wait(1000);
  cy.getDataTest('catalog-more-card').should('have.length', total);
  for (let i = 1; i <= total; i++) {
    total === 1 ? cy.getDataTest('catalog-more-card').click() : cy.getDataTest('catalog-more-card').eq(0).click();
    cy.getDataTest('catalog-delete-card').click();
  }
  cy.getDataTest('dashboard-empty').should('exist');
});

Cypress.Commands.add('dashboardMoreButton', (option, index = 0) => {
  cy.visit('http://localhost:3000/dashboard');
  cy.wait(1000);
  cy.getDataTest('catalog-more-card').eq(index).click();
  if (option === 'delete') {
    cy.getDataTest('catalog-delete-card').click();
    return;
  }
  if (option === 'share') {
    cy.getDataTest('catalog-share-card').click();
    return;
  }
  if (option === 'view') {
    cy.getDataTest('catalog-view-card').click();
    return;
  }
});

Cypress.Commands.add('editCatalog', (option) => {
  const _submit = option.submit;
  cy.wait(1000);
  cy.getDataTest('container-title-input').clear().type(option.title);

  if (option.desc) cy.getDataTest('container-desc-input').clear().type(option.desc);
  if (option.addedItem) {
    option.addedItem.map((v, index) => {
      cy.getDataTest('add-catalog-item-button').click();
      cy.getDataTest('catalog-item').should('exist');
      cy.getDataTest('item-title-input').clear().type(v.title);
      if (v.desc) cy.getDataTest('item-desc-input').clear().type(v.desc);
      if (v.imagePath) cy.getDataTest('item-file-input').eq(index).selectFile(v.imagePath);
      if (v.tags && v.tags.length > 0)
        v.tags.map((tag) => {
          cy.get(`[data-testid=input]`).clear().type(`${tag}{enter}`);
        });
    });
  }
  if (option.editedItem) {
    cy.getDataTest('catalog-item').then((val) => {
      if (val.length !== option.editedItem?.length)
        throw new Error('Edited item should have the same length with the existing items');
    });
    option.editedItem.forEach((item, i) => {
      cy.getDataTest('item-title-input').clear().type(item.title);
      if (item.desc) cy.getDataTest('item-desc-input').clear().type(item.desc);
      if (item.tags) {
        console.log(Cypress.env('tagsLength'));
        cy.get(`:nth-child(${i + 1}) > :nth-child(2) > .ReactTags__tags > .ReactTags__selected > `).then((val) => {
          for (let index = 0; index < val.length; index++) {
            cy.get(
              `:nth-child(${
                i + 1
              }) > :nth-child(2) > .ReactTags__tags > .ReactTags__selected > :nth-child(1) > .ReactTags__remove`
            ).click();
          }
        });
        item.tags.forEach((tag) => cy.addTag(tag));
      }
    });
  }
  if (_submit === false) {
    return;
  }
  cy.getDataTest('create-submit-button').click();
  cy.wait(1000);
  cy.location('pathname').should('equal', '/dashboard');
});

Cypress.Commands.add('addTag', (tag) => {
  cy.get(`[data-testid=input]`).type(`${tag}{enter}`);
});

Cypress.Commands.add('checkCatalog', (option) => {
  cy.wait(2000);
  cy.getDataTest('container-title-input').should('contain.value', option.title);

  if (option.desc) cy.getDataTest('container-desc-input').should('contain.value', option.desc);
  if (option.item) {
    option.item.map((v, index) => {
      cy.getDataTest('item-title-input').eq(index).should('contain.value', v.title);
      if (v.desc) cy.getDataTest('item-desc-input').eq(index).should('contain.value', v.desc);
      if (v.imagePath) cy.getDataTest('item-file-input').eq(index).selectFile(v.imagePath);
      if (v.tags && v.tags.length > 0)
        v.tags.map((tag, i) => {
          cy.get(`:nth-child(${index + 1}) > :nth-child(2) > .ReactTags__tags > .ReactTags__selected > `)
            .eq(i)
            .should('contain.text', tag);
        });
    });
  }
});
