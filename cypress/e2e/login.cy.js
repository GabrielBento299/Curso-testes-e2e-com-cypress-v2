describe('Login', () => {
  it('successfuly logs in', () => {
    cy.intercept('GET', '**/notes').as('getNotes');

    cy.login();
    cy.wait('@getNotes');

    cy.contains('a', 'Create a new note').should('be.visible');
  });
});