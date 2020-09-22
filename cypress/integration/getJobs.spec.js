describe('Fetch jobs from remote api', () => {
    it('Retrieves list of jobs', () => {
        cy.request('GET', Cypress.env('GET_JOBS_API')).then(({ status, body }) => {
            expect(status).to.eq(200)
            expect(body).to.be.an('array')
            expect(body).to.have.length(50)
            cy.wrap(body).each(job => {
                const jobKeys = Object.keys(job)
                expect(jobKeys).to.have.length(11)
                expect(jobKeys).to.include.members(['company', 'company_logo', 'company_url', 'created_at', 'description', 'how_to_apply', 'id', 'location', 'title', 'type', 'url'])
            })
        })
    })
})