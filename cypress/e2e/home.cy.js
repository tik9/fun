
describe('my site', () => {
  beforeEach(() => { cy.visit("http://localhost:8888") })

  it("btn is correct", () => { cy.get('button').eq(0).contains('Fetch') })
  it('get jokes', () => {
    // cy.getByData('inputjoke').scrollIntoView().should('be.visible')
    cy.getByData('inputjoke').scrollIntoView().type('abc', { force: true })
    cy.getByData('btnjoke').scrollIntoView().click({ force: true })
  })
  it('get stock', () => {
    // cy.getByData('inputstock').scrollIntoView().type('abc', { force: true })
    cy.getByData('btnstock').scrollIntoView().click({ force: true })
    cy.getByData('resstock').should('exist').contains('145')
    cy.getByData('resstock').invoke('text').should('match', /^\d{3}$/)
    // cy.getByData('resstock').should(value => { expect(Number.isInteger(+value), 'input should be an integer').to.eq(true) })
  })
  it.only('get utc', () => {
    cy.getByData('btnclock').scrollIntoView().click({ force: true })
    cy.getByData('resclock').invoke('text').should('match', /^\d{2}:\d{2} hours$/)
  })
})