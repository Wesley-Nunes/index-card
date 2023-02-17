/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    getThe(dataTestAttribute: string): Chainable<JQuery<HTMLElement>>
    presentElements(
      dataTestAttributeArr: string[]
    ): Chainable<JQuery<HTMLElement>>
    hasTextValueOf(text: string): Chainable<JQuery<HTMLElement>>
    goTo(dataTestAttribute: string): Chainable<JQuery<HTMLElement>>
  }
}
