describe('Central de Atendimento ao Cliente', () => {
  beforeEach(() => {
    cy.visit('/src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preencha os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._.repeat('teste de automação com cypress!!', 10)

    cy.preencherFormulario('Eduardo P', 'Brigatti', 'edubrigatti@gmail.com')
    cy.get('#open-text-area').type(longText, { delay: 20 }).should('have.value', longText)
    cy.get('.button[type="submit"]').click()

    cy.get('.success').should('be.visible')
  })

  it('exibir mensagem de erro ao submeter o formulário com e-mail de formatação inválida', () => {
    cy.preencherFormulario('Eduardo P', 'Brigatti', 'edubrigatti@gmai,com')
    cy.get('#open-text-area').type('teste').should('have.value', 'teste')
    cy.get('.button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })

  it('campo telefone continua vazio quando preenchido com valor não numérico', () => {
    cy.get('#phone').type('abcde').should('have.value', '')
  })

  it('mensagem de erro quando telefone se torna obrigatório mas não é preenchido antes do envio de formulário', () => {
    cy.preencherFormulario('Eduardo P', 'Brigatti', 'edubrigatti@gmail.com')
    cy.get('#open-text-area').type('teste').should('have.value', 'teste')
    cy.get('#phone-checkbox').check()
    cy.get('.button[type="submit"]').click()

    cy.get('.error').should('be.visible').and('contain.text', 'campos obrigatórios')
  })

  it('limpar campo para posterior digitação', () => {
    cy.get('#firstName').type('Eduardo B', { delay: 100 }).should('have.value', 'Eduardo B')
    cy.get('#firstName').clear().should('have.value', '')
    cy.get('#firstName').type('Eduardo Pina', { delay: 100 })
    cy.get('#lastName').type('Brigatto', { delay: 100 }).clear().type('Brigatti', { delay: 100 })
    cy.get('#email').type('edubrigatti@gmail.com')
  })

  it('mensagem de erro quando clicar em gravar sem preencher todos os campos', () => {
    cy.get('.button[type="submit"]').should('have.text', 'Enviar').click()
    cy.get('.error').should('be.visible').and('contain.text', 'campos obrigatórios')
  })
})
