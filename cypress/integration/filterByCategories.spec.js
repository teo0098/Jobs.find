describe('Filter jobs by selecting certain properties', () => {
    it('Filters jobs by url query search parameter', () => {
        cy.visit('/')
        cy.get('#filters').click()
        cy.wait(200)
        cy.get('#categories').should('be.visible')
        cy.get('#filterCategories').children().contains('React').click()
        cy.get('#approveFilter').click()
        cy.url().should('include', '/jobs?search=React')
        cy.get('#filters').should($filter => {
            expect($filter).to.contain('React')
        })
        cy.requestSeekJobs('React')
    })
})