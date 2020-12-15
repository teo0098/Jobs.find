Cypress.Commands.add('checkJobsApi', (status, body) => {
    expect(status).to.eq(200)
    expect(body).to.be.an('array')
    expect(body).to.have.length(50)
    cy.wrap(body).each(job => {
        const jobKeys = Object.keys(job)
        expect(jobKeys).to.have.length(11)
        expect(jobKeys).to.include.members(['company', 'company_logo', 'company_url', 'created_at', 'description', 'how_to_apply', 'id', 'location', 'title', 'type', 'url'])
    })
})

Cypress.Commands.add('checkLinksHref', body => {
    cy.get('#jobs').find('a').each((link, index) => {
        cy.wrap(link[0]).should('have.attr', 'href').and('include', `/jobs/${body[index].id}`)
    })
})

Cypress.Commands.add('checkJobPage', (index, position, body) => {
    cy.get('#jobs').find('a').eq(index).click()
    cy.visit(`/jobs/${body[position].id}`)
    cy.get('#jobPage').should('be.visible')
    cy.get('#jobTitle').should($jobTitle => {
        expect($jobTitle).to.contain(body[position].title)
    })
})

Cypress.Commands.add('requestSeekJobs', filter => {
    cy.get('#loader').should('be.visible')
    cy.request('GET', `${Cypress.env('GET_JOBS_API')}?search=${filter}`).then(({ status, body }) => {
        cy.get('#loader').should('not.be.visible')
        expect(status).to.eq(200)
        expect(body).to.be.an('array')
    })
})

Cypress.Commands.add('registerUser', code => {
    cy.get('input[name=email]').type("something@wp.pl")
    cy.get('button[type="submit"]').click()
    cy.request('POST', '/api/account', {
        name: 'Jan',
        surname: 'Kowalski',
        email: 'something@wp.pl',
        password: '12345678',
        rpassword: '12345678',
        adult: true
    }).then(({ body, status }) => {
        cy.get('#loader').should('not.be.visible')
        expect(status).to.eq(code)
        expect(body).to.be.a('string')
    })
})