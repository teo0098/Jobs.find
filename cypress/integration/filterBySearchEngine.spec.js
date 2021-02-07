describe('Filter jobs by typing certain properties', () => {
    it('Filters jobs by typed url query search parameter', () => {
        cy.visit('/')
        cy.get('#searchInput').type('Angular').should('have.value', 'Angular')
        cy.get('#searchInputBtn').click()
        cy.url().should('include', '/jobs?search=Angular')
        cy.requestSeekJobs('Angular')
    })
})