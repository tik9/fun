
describe('my site', () => {
  beforeEach(() => {
    cy.visit("http://localhost:8888")
  })

  it("btn is correct", () => { cy.get('button').eq(0).contains('Fetch') })
  it('get jokes', () => {
    // cy.getByData('inputjoke').scrollIntoView().should('be.visible')
    cy.getByData('inputjoke').scrollIntoView().type('abc', { force: true })
    cy.getByData('btnjoke').scrollIntoView().click({ force: true })
  })
  it.only('get stock', () => {
    cy.getByData('inputstock').scrollIntoView().type('abc', { force: true })
    cy.getByData('btnstock').scrollIntoView().click({ force: true })
  })
})