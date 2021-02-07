describe('Responsive Navigation Test', () => {
    it('Animates menu after user clicks hamburger', () => {
        cy.visit('/')
        cy.viewport(360, 600)
        cy.get('#hamburger').click()
        cy.wait(400)
        cy.get('#menu').should('be.visible')
        cy.get('#hamburger').click()
        cy.wait(400)
        cy.get('#menu').should('not.be.visible')
    })
})