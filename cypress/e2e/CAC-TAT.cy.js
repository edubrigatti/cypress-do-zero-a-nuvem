describe('Central de Atendimento ao Cliente', () => {
  beforeEach(() => {
    cy.visit('/src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preencha os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._.repeat('teste de automação com cypress!!', 10)

    cy.fillMandatoryFieldsAndSubmit()
    //cy.get('#open-text-area').type(longText, { delay: 20 }).should('have.value', longText)
    cy.get('.button[type="submit"]').click()

    cy.get('.success').should('be.visible')
  })

  it('exibir mensagem de erro ao submeter o formulário com e-mail de formatação inválida', () => {
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.button[type="submit"]').click()
    //cy.get('.error').should('be.visible')
  })

  it('campo telefone continua vazio quando preenchido com valor não numérico', () => {
    cy.get('#phone').type('abcde').should('have.value', '')
  })

  it('mensagem de erro quando telefone se torna obrigatório mas não é preenchido antes do envio de formulário', () => {
    cy.fillMandatoryFieldsAndSubmit()
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

  it('envia o formuário com sucesso usando um comando customizado', () => {
    /*const data = {
      firstName: 'Eduardo',
      lastName: 'Brigatti',
      email: 'edubrigatti@gmail.com',
      text: 'Teste',
    }*/
    cy.fillMandatoryFieldsAndSubmit()
    cy.clickEnviar()
    cy.get('.success').should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product').select('YouTube').should('have.value', 'youtube')
  })
  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product').select('mentoria').should('have.value', 'mentoria')
  })
  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product').select(1).should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('[type="radio"]').check().should('be.checked')
  })
  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('[type="radio"][value="feedback"]').check().should('be.checked')
  })
  it('marca o tipo de atendimento', () => {
    cy.get('[type="radio"]').each((typeOfService) => {
      cy.wrap(typeOfService).check().should('be.checked')
    })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  //UPLOAD DE ARQUIVOS//
  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json')
      .should((input) => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })
  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should((input) => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })
  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('#file-upload')
      .selectFile('@sampleFile')
      .should((input) => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  //LINKS QUE ABREM EM OUTRA ABA//
  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
  })
  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade').invoke('removeAttr', 'target').click()
    cy.contains('h1', 'CAC TAT - Política de Privacidade')
  })
  
  
  
  
})
