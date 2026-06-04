describe('Central de Atendimento ao Cliente', () => {
  beforEach(() => {
    cy.visit ('/')
  } )
  
  it('verifica o título da aplicação', () => {  
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })
})