/// <reference types="cypress" />

Cypress.Commands.add('getThe', element => cy.get(`[data-testid='${element}']`))

Cypress.Commands.add('presentElements', elements =>
  elements.forEach(element => cy.getThe(element).should('exist'))
)

Cypress.Commands.add('goTo', element => cy.getThe(element).click())
