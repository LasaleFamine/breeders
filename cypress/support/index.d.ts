// eslint-disable-next-line spaced-comment
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
    */
    dataCy: <T>(value: string) => Chainable<JQuery<T>>;
    /**
     * Command to open BREEDERS website at specific page.
     * @example cy.openBreeders('husky')
     * @example cy.openBreeders()
    */
    openBreeders: (page?: string) => Chainable<Element>;
    /**
     * Command to open LOCAL (at localhost:3000) website at specific page.
     * @example cy.openLocal('husky')
     * @example cy.openLocal()
    */
    openLocal: (page?: string) => Chainable<Element>;
  }
}
