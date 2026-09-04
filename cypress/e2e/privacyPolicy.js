it.only('testa a página da política de privacidade de forma independente', () => {
  cy.visit('./src/privacy.html')
  cy.url().should('include', 'privacy.html')
  cy.contains('Política de Privacidade').should('be.visible')
})
