
describe('my site', () => {
  beforeEach(() => { cy.visit("http://localhost:8888") })

  it("btn is correct", () => { cy.get('button').eq(0).contains('Fetch') })

  it.only('get jokes', () => {
    // cy.getByData('inputjoke').scrollIntoView().should('be.visible')
    // cy.getByData('inputjoke').scrollIntoView().type('abc', { force: true })
    cy.getByData('btnjoke').scrollIntoView().click({ force: true })
    cy.getByData('resjoke').invoke('text').should('match', /^Value/)

  })

  it('get stock', () => {
    // cy.getByData('inputstock').scrollIntoView().type('abc', { force: true })
    cy.getByData('btnstock').scrollIntoView().click({ force: true })
    cy.getByData('resstock').should('exist').contains('145')
    cy.getByData('resstock').invoke('text').should('match', /^\d{3}$/)
  })

  it.only('get utc', () => {
    cy.getByData('btnclock').scrollIntoView().click({ force: true })
    cy.getByData('resclock').invoke('text').should('match', /^\d{2}:\d{2} hours$/)
  })
})