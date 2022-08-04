
describe('contact', () => {
  beforeEach(() => {
    cy.visit("http://localhost:8888/contact.html")
  })
  it('sending is correct', () => {
    cy.getByData('email').type('ho@la.de')
    cy.getByData('name')
    cy.getByData('msg')
    cy.getByData('btn')
  })
})