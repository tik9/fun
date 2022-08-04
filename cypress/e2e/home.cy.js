
describe('my site', () => {
  beforeEach(() => {
    cy.visit("http://localhost:8888")
  })
  it('h4 has correct text', () => {
    cy.getByData('header').contains('Tiko\'s website with serverless Api examples')
  })
  it("btn is correct", () => {
    cy.get('button').eq(0).contains('Fetch')
  })
  it('get jokes', () => {
    cy.getByData('inputjoke')
    cy.getByData('btnjoke').click()
  })
})