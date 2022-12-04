describe('My First Test', () => {
  it('Visits the Kitchen Sink', () => {
    cy.visit('https://quargsgreene.github.io/looping-shape-cereal/');
    cy.get('[data-cy="type"]')
      .type('platypus')
      .should('have.value', 'platypus');
  });
});
