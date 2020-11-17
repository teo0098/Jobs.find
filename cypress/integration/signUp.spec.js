describe('Register user in a service', () => {
    beforeEach(() => {
        cy.visit('/signup')
        cy.get('input[name=name]').type("Jan")
        cy.get('input[name=surname]').type("Kowalski")
        cy.get('input[name=password]').type("12345678")
        cy.get('input[name=rpassword]').type("12345678")
        cy.get('input[type="checkbox"]').check()
    })

    it('Bad data entered', () => {
        cy.get('input[name=email]').type("dasdsadd")
        cy.get('button[type="submit"]').click()
        cy.get('#emailField').children().should('have.length', 2)
    })

    it('Successfully register user in a service', () => {
        cy.registerUser(201)
    })

    it('User exists', () => {
        cy.registerUser(500)
    })
})