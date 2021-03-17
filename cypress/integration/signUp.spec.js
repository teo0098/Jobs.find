describe('Register user in a service', () => {

    before(() => {
        cy.visit('/signup')
        cy.clearDB()
    })

    beforeEach(() => {
        cy.get('input[name=name]').clear().type("Jan")
        cy.get('input[name=surname]').clear().type("Kowalski")
        cy.get('input[name=password]').clear().type(`${Cypress.env('LOGIN_PASSWORD')}`)
        cy.get('input[name=rpassword]').clear().type(`${Cypress.env('LOGIN_PASSWORD')}`)
        cy.get('input[type="checkbox"]').check()
    })

    it('Bad data entered', () => {
        cy.get('input[name=email]').clear().type("dasdsadd")
        cy.get('button[type="submit"]').click()
        cy.get('#emailField').children().should('have.length', 2)
    })

    it('Successfully register user in a service', () => {
        cy.get('input[name=email]').clear().type(`${Cypress.env('LOGIN_EMAIL')}`)
        cy.get('button[type="submit"]').click()
        cy.registerUser(201)
        cy.get('#loader').should('not.be.visible')
    })

    it('User exists', () => {
        cy.get('input[name=email]').clear().type(`${Cypress.env('LOGIN_EMAIL')}`)
        cy.get('button[type="submit"]').click()
        cy.registerUser(409)
        cy.get('#loader').should('not.be.visible')
    })
})