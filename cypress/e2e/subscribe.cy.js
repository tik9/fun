
describe("Newsletter Subscribing", () => {
    beforeEach(() => {
        cy.visit("http://localhost:8888/contact.html")
    })

    it("allows to subscribe to email list", () => {
        cy.getByData('nl-input').type('t@t')
        cy.getByData('nl-btn').click()
    })
})