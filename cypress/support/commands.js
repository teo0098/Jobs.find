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

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
