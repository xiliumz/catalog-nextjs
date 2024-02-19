/// <reference types="cypress" />

interface itemProps {
  title: string;
  desc: string;
  imagePath?: string;
}

interface createCatalogProps {
  title: string;
  desc?: string;
  item?: itemProps[];
}

declare namespace Cypress {
  interface Chainable {
    getDataTest(dataTestAttribute: string): Chainable<JQuery<HTMLElement>>;
    createCatalog(option: createCatalogProps): void;
  }
}

Cypress.Commands.add('getDataTest', (selector) => {
  return cy.get(`[data-test=${selector}]`);
});

Cypress.Commands.add('createCatalog', (option) => {
  cy.getDataTest('create-catalog-button').click();
  cy.getDataTest('container-title-input').type(option.title);

  if (option.desc) cy.getDataTest('container-desc-input').type(option.desc);
  if (option.item) {
    option.item.map((v, index) => {
      cy.getDataTest('add-catalog-item-button').click();
      cy.getDataTest('catalog-item').should('exist');
      cy.getDataTest('item-title-input').type(v.title);
      cy.getDataTest('item-desc-input').type(v.desc);
      if (v.imagePath) cy.getDataTest('item-file-input').eq(index).selectFile(v.imagePath);
    });
  }
  cy.getDataTest('create-submit-button').click();
  cy.location('pathname').should('equal', '/dashboard');
});
