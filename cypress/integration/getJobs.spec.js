describe('Fetch jobs from remote api', () => {
    it('Retrieves list of jobs', () => {
        cy.request('GET', Cypress.env('GET_JOBS_API')).then(({ status, body }) => {
            expect(status).to.eq(200)
            expect(body).to.have.length(50)
        })
    })
})