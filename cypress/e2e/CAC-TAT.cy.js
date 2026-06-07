describe('Central de Atendimento ao Cliente', () => {
  beforeEach(() => {
    cy.visit('/src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preencha os campos obrigatórios e envia o formulário', () => {
    const LongText = Cypress._.repeat('teste de automação com cypress!!', 10)

    cy.get('#firstName').type('Eduardo P', { delay: 100 })
    cy.get('#firstName').should('have.value', 'Eduardo P')
    cy.get('#lastName').type('Brigatti')
    cy.get('#email').type('edubrigatti@gmail.com')
    cy.get('#open-text-area').type(LongText, { delay: 20 })
    cy.get('#open-text-area').should('have.value', LongText)
    cy.get('.button[type="submit"]').click()

    cy.get('.success').should('be.visible')
  })
  it('exibir mensagem de erro ao submeter o formulário com e-mail de formatação inválida', () => {
    cy.get('#firstName').type('Eduardo P', { delay: 100 })
    cy.get('#firstName').should('have.value', 'Eduardo P')
    cy.get('#lastName').type('Brigatti')
    cy.get('#email').type('edubrigatti@gmai,com')
    /*cy.get ('#email').then(($email) =>{
      expect($email[0].checkValidity()).to.be.false//
    })*/
    cy.get('#open-text-area').type('teste')
    cy.get('#open-text-area').should('have.value', 'teste')
    cy.get('.button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })

  it('campo telefone continua vazio quando preenchido com valor não numérico', () => {
    cy.get('#phone').type('abcde').should('have.value', '')
  })

  it.only('mensagem de erro quando telefone se torna obrigatório mas não é preenchido antes do envio de formulário', () => {
    cy.get('#firstName').type('Eduardo P', { delay: 100 })
    cy.get('#firstName').should('have.value', 'Eduardo P')
    cy.get('#lastName').type('Brigatti')
    cy.get('#email').type('edubrigatti@gmai,com')
    cy.get('#open-text-area').type('teste')
    cy.get('#open-text-area').should('have.value', 'teste')
    cy.get('#phone-checkbox').check()
    cy.get('.button[type="submit"]').click()
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible').and('contain.text', 'campos obrigatórios')
  })
})
