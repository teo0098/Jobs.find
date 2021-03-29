describe('Login user into a service', () => {

    before(() => {
        cy.visit('/signin')
        cy.clearDB()
        cy.registerUser(201)
    })

    it('Wrong credentials', () => {
        cy.loginUser(403, 'dasdsadd@wp.pl', `${Cypress.env('LOGIN_PASSWORD')}`)
    })

    it('Successfully logged into a service', () => {
        cy.loginUser(200, Cypress.env('LOGIN_EMAIL'), Cypress.env('LOGIN_PASSWORD'))
        cy.visit('/dashboard')
        cy.getCookie('refreshToken').should('exist')
    })
})