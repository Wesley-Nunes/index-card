describe('Editor Page - Editing index card', () => {
  it('should be possible to change the text content of the input fields', () => {
    cy.visit('http://localhost:3000/editor')

    cy.presentElements([
      'scene heading',
      'synopsis',
      'conflict',
      'index-card-position',
      'Next Index Card',
      'Previous Index Card'
    ])

    cy.getThe('scene heading').should('have.value', 'EXT. Jardins suspensos')
    cy.getThe('synopsis').should(
      'have.value',
      'Luta entre o último guarda real e o regicida.'
    )
    cy.getThe('conflict').should(
      'have.value',
      'O guarda morre, a rainha está em apuros.'
    )

    cy.getThe('scene heading').clear()
    cy.getThe('synopsis').clear()
    cy.getThe('conflict').clear()

    cy.getThe('scene heading').type('INT. Cozinha do castelo')
    cy.getThe('synopsis').type('O cozinheiro envenena a comida da grande ceia.')
    cy.getThe('conflict').type(
      'Uma criada percebeu, ela deve decidir se vai ficar omissa ou não.'
    )

    cy.getThe('scene heading').should('have.value', 'INT. Cozinha do castelo')
    cy.getThe('synopsis').should(
      'have.value',
      'O cozinheiro envenena a comida da grande ceia.'
    )
    cy.getThe('conflict').should(
      'have.value',
      'Uma criada percebeu, ela deve decidir se vai ficar omissa ou não.'
    )
  })
})
