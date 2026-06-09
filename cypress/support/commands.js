
Cypress.Commands.add(
  'preencherFormulario',
  (nome, sobrenome, email) => {
    cy.get('#firstName')
      .type(nome)
      .should('have.value', nome)

    cy.get('#lastName')
      .type(sobrenome)
      .should('have.value', sobrenome)

    cy.get('#email')
      .type(email)
      .should('have.value', email)
  }
)
  

