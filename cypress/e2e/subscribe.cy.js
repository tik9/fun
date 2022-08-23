
describe("Newsletter Subscribing", () => {
    beforeEach(() => { cy.visit("http://localhost:8888/contact.html") })

    it("subscribe to email list", () => {
        var address = 't@t.d'
        cy.getByData('nl-input').type(address)
        cy.getByData('nl-btn').click()

        cy.getByData('success-msg').should('exist').contains(address)
    })

    it.only("invalid address", () => {
        var falsy = 't'

        cy.getByData("nl-input").type(falsy)
        cy.getByData("nl-btn").click()

        // cy.getByData('success-msg').contains(falsy).then($el => {cy.wrap($el).should($el => {   expect(Cypress.dom.isAttached($el)).to.eq(false)})})
        cy.getByData("success-msg").contains(falsy).should("not.exist")
    })

})