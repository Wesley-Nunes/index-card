/// <reference types="cypress" />
// eslint-disable-next-line import/no-extraneous-dependencies
import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command'

addMatchImageSnapshotCommand()

Cypress.Commands.add('getThe', element => cy.get(`[data-testid='${element}']`))

Cypress.Commands.add('presentElements', elements =>
  elements.forEach(element => cy.getThe(element).should('exist'))
)

Cypress.Commands.add('goTo', element => cy.getThe(element).click())
