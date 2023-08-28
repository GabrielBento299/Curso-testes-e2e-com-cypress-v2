describe('Login', () => {
  it('successfuly logs in', () => {

    cy.guiLogin();

    cy.contains('a', 'Create a new note').should('be.visible');
  });
});