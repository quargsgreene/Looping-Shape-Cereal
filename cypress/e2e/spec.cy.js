describe('Looping Shape Cereal Browser Tests', () => {
  it('visits Looping Shape Cereal', () => {
    cy.visit('https://quargsgreene.github.io/looping-shape-cereal/');
  });

  it('should capture user input in a form', () => {
    cy.get('.input')
      .type('platypus')
      .should('have.value', 'platypus');
  });

  it('should play the audio files', () => {
    cy.get('.button-light')
      .invoke('attr', 'src')
      .then((audioFile) => {
        const audio = new Audio(audioFile);
        audio.play();
      });

    cy.get('.button-dark')
      .invoke('attr', 'src')
      .then((audioFile) => {
        const audio = new Audio(audioFile);
        audio.play();
      });
  });

  it('should access invisible buttons', () => {
    cy.get('.invisible').click({ multiple: true, force: true });
  });

  it('should display the word \'inhabitants\'', () => {
    cy.contains('inhabitants').click({ force: true });
  });
});
