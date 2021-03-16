/* eslint-disable spaced-comment, @typescript-eslint/triple-slash-reference */
/// <reference path="../../support/index.d.ts" />

context('Functional - List', () => {
  beforeEach(() => {
    cy.openLocal();
  });

  it('should load correctly a list of breeds', () => {
    cy.dataCy('List')
      .get('a').should('have.length.greaterThan', 0);
  });

  it('should correctly search through breeds', () => {
    cy.dataCy('Search')
      .type('husky');

    cy.dataCy('List').get('a').should('have.length', 1);
  });

  it('should correctly go on detail of a breed', () => {
    cy.dataCy('List')
      .contains('a', 'husky')
      .click()
      .location('pathname')
      .should('eq', '/husky');
  });
});
