describe('Login user into a service', () => {
    beforeEach(() => {
        cy.visit('/signin')
    })

    it('Wrong credentials', () => {
        cy.loginUser(403, 'dasdsadd@wp.pl', '12345678')
    })

    it('Successfully logged into a service', () => {
        cy.loginUser(200, Cypress.env('LOGIN_EMAIL'), Cypress.env('LOGIN_PASSWORD'))
    })
})