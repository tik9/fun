
describe("Newsletter Subscribing", () => {
    beforeEach(() => { cy.visit("http://localhost:8888/contact.html") })

    it("allows to subscribe to email list", () => {
        var address = 't@t'
        cy.getByData('nl-input').type(address)
        cy.getByData('nl-btn').click()

        cy.getByData('success-msg').should('exist').contains(address)
    })

    it.only("not allow invalid address", () => {
        cy.getByData("nl-input").type("t")
        cy.getByData("nl-btn").click()
        cy.getByData("success-msg").should("not.exist")
    })

})