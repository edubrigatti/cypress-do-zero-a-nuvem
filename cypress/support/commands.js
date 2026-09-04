/*Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
  cy.get('#firstName').type('Eduardo')

  cy.get('#lastName').type('Brigatti')

  cy.get('#email').type('edubrigatti74@gmail.com')

  cy.get('#open-text-area').type('Teste')

  cy.get('button[type="submit"]').click()
});*/

Cypress.Commands.add(
  'fillMandatoryFieldsAndSubmit',
  (
    data = {
      firstName: 'Eduardo',
      lastName: 'Ferreira',
      email: 'eduardop@teste.com',
      text: 'testando123...',
    }
  ) => {
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.text)
  }
)

Cypress.Commands.add('clickEnviar', () => {
  cy.contains('button', 'Enviar').click()
})
