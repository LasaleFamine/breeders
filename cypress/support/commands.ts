// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('dataCy', (value: string) => cy.get(`[data-cy="${value}"]`));
Cypress.Commands.add('openLocal', (page?: string) => cy.visit(`http://localhost:3000/${page ?? ''}`, {
  onBeforeLoad(win: Window): void {
    cy.spy(win.navigator.clipboard, 'writeText').as('copy');
  },
}));
Cypress.Commands.add('openBreeders', (page?: string) => cy.visit(`https://breeders.vercel.app/${page ?? ''}`));
