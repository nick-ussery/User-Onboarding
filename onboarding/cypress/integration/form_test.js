describe('check site basic functionality', ()=>{
    it('navigate to site', ()=>{
        cy.visit('http://localhost:3000')
    })

    it('submit should be disabled on render', ()=>{
        cy.get('[name="submit"]').should('be.disabled')
    })

    it('enter info into name field', ()=>{
        cy.get('input[name="name"]')
        .type('abcd').should('have.value','abcd')
    })

    it('enter info into email field', ()=>{
        cy.get('input[name="email"]')
        .type('abcd@efgh.com').should('have.value', 'abcd@efgh.com')
    })

    it('enter info into password field', ()=>{
        cy.get('input[name="password"]')
        .type('blahblah').should('have.value', 'blahblah')
    })

    it('check the terms of service checkbox', ()=>{
        cy.get('[name="termsOfService"]')
        .click();
    })

    it('Submit button should now be enabled', ()=>{
        cy.get('[name="submit"]').should('not.be.disabled')
    })
})

describe('check form validation', ()=>{
    it('reload site', ()=>{
        cy.visit('http://localhost:3000')
    })

    it('check name field validation', ()=>{
        cy.get('input[name="name"]').type('a')
        cy.get('[name="errorsName"]').should('have.value',"")
        cy.get('input[name="name"]').type('b')
        cy.get('[name="errorsName"]').should('have.value','')
        cy.get('input[name="name"]').type('c')
        cy.get('[name="errorsName"]').should('have.value', "")
    })
})



