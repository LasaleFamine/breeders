/* eslint-disable spaced-comment, @typescript-eslint/triple-slash-reference */
/// <reference path="../../support/index.d.ts" />

context('Functional - Detail', () => {
  beforeEach(() => {
    cy.intercept('_next/image*').as('getImage');
    cy.openLocal('husky');
  });

  it('should correctly open a breed', () => {
    cy.get('h1').should('contain', 'husky');
  });

  it('should correctly go back', () => {
    cy.dataCy('BackButton')
      .click()
      .location('pathname').should('eq', '/');
  });

  it('should correctly fetch a new image and show history', () => {
    cy.wait(['@getImage']);

    cy.dataCy('CurrentImage')
      .then((el) => {
        const src = el.attr('src');
        cy
          .dataCy('FetchNewButton')
          .click()
          .wait(['@getImage'])
          .dataCy('CurrentImage')
          .then((newEl) => {
            const newSrc = newEl.attr('src');
            expect(src).to.not.be.eq(newSrc);
          });

        cy.dataCy('HistoryImage')
          .should('have.length.greaterThan', 0);
      });
  });

  it('should correctly select an image from the history', () => {
    cy.wait(['@getImage']);
    cy
      .dataCy('FetchNewButton')
      .click()
      .wait(['@getImage'])
      .dataCy('CurrentImage')
      .then((el) => {
        const src = el.attr('src');
        cy
          .dataCy('HistoryImage')
          .first()
          .click({ force: true })
          .dataCy('CurrentImage')
          .then((newEl) => {
            const newSrc = newEl.attr('src');
            expect(src).to.not.be.eq(newSrc);
          });
      });
  });

  it('should correctly copy url', () => {
    cy.wait(['@getImage']);
    cy
      .dataCy('CurrentImage')
      .then((el) => {
        const src = el.attr('data-full-url');
        cy
          .dataCy('CopyButton')
          .click()
          .get('@copy')
          .should('be.calledWithExactly', src);
      });
  });

  it('should correctly open in new tab the image', () => {
    cy.wait(['@getImage']);
    cy
      .dataCy('CurrentImage')
      .then((el) => {
        const src = el.attr('data-full-url');
        cy
          .dataCy('OpenNewTabButton')
          .then((btnEl) => {
            const link = btnEl.attr('href');
            const target = btnEl.attr('target');

            expect(link).to.be.eq(src);
            expect(target).to.be.eq('_blank');
          });
      });
  });
});
