describe('Fetch jobs from remote api', () => {
    it('Retrieves list of jobs', () => {
        cy.request('GET', Cypress.env('GET_JOBS_API')).then(({ status, body }) => {
            cy.checkJobsApi(status, body)
            cy.visit('/')
            cy.get('#jobs').as('jobs')
            cy.get('@jobs').should('be.visible')
            cy.get('@jobs').find('a').should('have.length', 50)
            cy.checkLinksHref(body)
            cy.checkJobPage(0, 0, body)
        })
    })
})