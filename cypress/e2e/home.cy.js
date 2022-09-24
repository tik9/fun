
describe('my site', () => {
  beforeEach(() => { cy.visit("http://localhost:8888") })

  it.only('cm select', () => {
    cy.getByData('select_incm').select('170')
    cy.getByData('out_incm').should('exist').contains('5 feet, 7 inches')
  })

  it.only('feet select', () => {
    cy.getByData('select_infeet').select('6.4')
    cy.getByData('out_infeet').should('exist').contains('193 cm')
  })

  it("btn is correct", () => { cy.get('button').eq(0).contains('Fetch') })

  it('get jokes', () => {
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

  it('get utc', () => {
    cy.getByData('btnclock').scrollIntoView().click({ force: true })
    cy.getByData('resclock').invoke('text').should('match', /^\d{2}:\d{2} hours$/)
    cy.getByData('resclock').invoke('text').should('exist').contains((new Date()).toUTCHours() + ':' + (new Date()).toUTCMinutes() + ' hours')
  })
})