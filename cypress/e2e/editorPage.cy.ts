describe('Editor Page - Viewer and navigation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/editor')

    cy.presentElements([
      'scene heading',
      'synopsis',
      'conflict',
      'index-card-position',
      'Next Index Card',
      'Previous Index Card'
    ])
  })

  it('should show all the correct content', () => {
    cy.getThe('scene heading').should('have.value', 'EXT. Jardins suspensos')

    cy.getThe('synopsis').should(
      'have.value',
      'Luta entre o último guarda real e o regicida.'
    )

    cy.getThe('conflict').should(
      'have.value',
      'O guarda morre, a rainha está em apuros.'
    )

    cy.getThe('index-card-position').contains('1')
  })

  it('should go to the next index card', () => {
    cy.goTo('Next Index Card')

    cy.getThe('scene heading').should('have.value', 'EXT. Patio')

    cy.getThe('synopsis').should('have.value', '')

    cy.getThe('conflict').should('have.value', '')

    cy.getThe('index-card-position').contains('2')
  })

  it('should go to the last index card and then not proceed further', () => {
    // first index card
    cy.getThe('scene heading').should('have.value', 'EXT. Jardins suspensos')
    cy.goTo('Next Index Card')

    // second index card
    cy.getThe('scene heading').should('have.value', 'EXT. Patio')
    cy.goTo('Next Index Card')

    // third index card
    cy.getThe('scene heading').should('have.value', '')
    cy.goTo('Next Index Card')

    // fourth(last) index card
    cy.getThe('scene heading').should('have.value', 'INT. Palácio de Okie')

    // still the fourth(last) index card, the button is disabled now.
    cy.getThe('Next Index Card').should('be.disabled')
    cy.getThe('scene heading').should('have.value', 'INT. Palácio de Okie')
  })

  it('should go to the previous index card', () => {
    // second index card
    cy.goTo('Next Index Card')
    cy.getThe('scene heading').should('have.value', 'EXT. Patio')

    // first index card
    cy.goTo('Previous Index Card')
    cy.getThe('scene heading').should('have.value', 'EXT. Jardins suspensos')
  })

  it('should not be possible to return before the first index card', () => {
    // Add these milliseconds because the test is too small,
    // when taking a snapshot, the page is not yet fully loaded.
    cy.wait(500)

    cy.getThe('Previous Index Card').should('be.disabled')
  })
})
