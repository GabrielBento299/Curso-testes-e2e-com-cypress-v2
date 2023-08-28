Cypress.Commands.add('fillSignupFormAndSubmit', (emailAddress, password) => {
  cy.intercept('GET', '**/notes').as('getNotes');
  cy.visit('/signup');
  cy.get('#email').type(emailAddress);
  cy.get('#password').type(password, { log: false });
  cy.get('#confirmPassword').type(password, { log: false });
  cy.contains('button', 'Signup').click();
  cy.get('#confirmationCode').should('be.visible');

  cy.mailosaurGetMessage(Cypress.env('MAILOSAUR_SERVER_ID'), {
    sentTo: emailAddress
  }).then(message => {
    const confirmationCode = message.html.body.match(/\d{6}/)[0];
    cy.get('#confirmationCode').type(`${confirmationCode}{enter}`);
    cy.wait('@getNotes');
  });
});

Cypress.Commands.add('guiLogin', (
  userName = Cypress.env('USER_EMAIL'),
  password = Cypress.env('USER_PASSWORD')
) => {
  cy.intercept('GET', '**/notes').as('getNotes');

  cy.visit('/login');
  cy.get('#email').type(userName);
  cy.get('#password').type(password, { log: false });
  cy.contains('button', 'Login').click();
  cy.wait('@getNotes');

  cy.contains('h1', 'Your Notes').should('be.visible');
});

Cypress.Commands.add('sessionLogin', (
  userName = Cypress.env('USER_EMAIL'),
  password = Cypress.env('USER_PASSWORD')
) => {
  const login = () => cy.guiLogin(userName, password);
  cy.session(userName, login);
});