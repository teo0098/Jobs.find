describe('Fetch more jobs from remote api', () => {
    it('Retrieves list of extra jobs', () => {
        cy.visit('/')
        cy.get('#moreJobsBtn').should('be.visible')
        cy.get('#moreJobsBtn').click()
        cy.get('#loader').should('be.visible')
        cy.request('GET', `${Cypress.env('GET_JOBS_API')}?page=2`).then(({ status, body }) => {
            cy.get('#loader').should('not.be.visible')
            cy.checkJobsApi(status, body)
            cy.get('#jobs').as('jobs')
            cy.get('@jobs').find('a').its('length').should('be.gte', 50)
        })
    })
})