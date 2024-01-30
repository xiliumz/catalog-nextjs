/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    getDataTest(dataTestAttribute: string): Chainable<JQuery<HTMLElement>>;
  }
}

Cypress.Commands.add('getDataTest', (selector) => {
  return cy.get(`[data-test=${selector}]`);
});
