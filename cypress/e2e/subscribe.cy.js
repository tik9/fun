
describe("Newsletter Subscribing", () => {
    // beforeEach(() => { cy.visit("http://localhost:8888/contact.html") })

    it("correct address", () => {
        var address = 't@t.d'
        cy.getByData('nl_input').type(address)
        cy.getByData('nl_btn').click()

        cy.getByData('success_msg').should('exist').contains(address)
    })

    it.only("invalid address", () => {
        var address = 't'

        cy.getByData("nl_input").type(address)
        cy.getByData("nl_btn").click()

        cy.getByData("success_msg").contains(address).should("not.exist")
    })

})