describe('Looping Shape Cereal Browser Tests', () => {
  it('visits Looping Shape Cereal', () => {
    cy.visit('https://quargsgreene.github.io/looping-shape-cereal/');
  });

  it('should capture user input in a form', () => {
    cy.get('[data-cy="type"]')
      .type('platypus')
      .should('have.value', 'platypus');
  });

  it('should play the audio file associated with the $ button', () => {
    cy.get('[data-cy="sound2')
      .invoke('attr', 'src')
      .then((audioFile) => {
        const audio = new Audio(audioFile);
        audio.play();
      });
  });
});
