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
            cy.visit('/')
            cy.get('#jobs').as('jobs')
            cy.get('@jobs').should('be.visible')
            cy.get('@jobs').find('a').should('have.length', 50)
            cy.get('@jobs').find('a').each((link, index) => {
                cy.wrap(link[0]).should('have.attr', 'href').and('include', `/jobs/${body[index].id}`)
            })
            cy.get('@jobs').find('a').eq(0).click()
            cy.visit(`/jobs/${body[0].id}`)
            cy.get('#jobPage').should('be.visible')
        })
    })
})