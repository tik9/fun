
describe('contact', () => {
  beforeEach(() => { cy.visit("http://localhost:8888/contact.html") })

  it("address", () => {
    var address = 't@t.'
    var address = 'a@2.1'
    cy.getByData('contact_input').type(address)
    cy.getByData('message').type(1)
    cy.getByData('name').type(1)
    cy.getByData('contact_btn').click()
    cy.getByData('success_msg').should('exist').contains(address)
    // cy.getByData("success_msg").contains(address).should("not.exist")

  })

})