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
        cy.get('[name="errorsName"]').should('have.text',"The username must be at least 3 characters long")
        cy.get('input[name="name"]').type('b')
        cy.get('[name="errorsName"]').should('have.text','The username must be at least 3 characters long')
        cy.get('input[name="name"]').type('c')
        cy.get('[name="errorsName"]').should('have.text', "")
    })

    it('check email field validation', ()=>{
        cy.get('input[name="email"]').type('abc')
        cy.get('[name="errorsEmail"]').should('have.text',"this must be a valid email")
        cy.get('input[name="email"]').type('@asdf')
        cy.get('[name="errorsEmail"]').should('have.text','this must be a valid email')
        cy.get('input[name="email"]').type('.com')
        cy.get('[name="errorsEmail"]').should('have.text', "")
    })

    it('check password validation', ()=>{
        cy.get('input[name="password"]').type('1')
        cy.get('[name="errorsPassword"]').should('have.text',"Minimum password length is 6 characters")
        cy.get('input[name="password"]').type('2')
        cy.get('[name="errorsPassword"]').should('have.text','Minimum password length is 6 characters')
        cy.get('input[name="password"]').type('3456')
        cy.get('[name="errorsPassword"]').should('have.text', "")
    })

    it('checkbox functionality', ()=>{
        cy.get('[name="termsOfService"]')
        .click().should('have.value', 'on')
    })
})

describe('add a user', ()=>{
    it('fill out form then submit it', ()=>{
        cy.visit('http://localhost:3000')
        cy.get('input[name="name"]').type('abc')
        cy.get('input[name="email"]').type('abc@abc.com')
        cy.get('input[name="password"]').type('123456')
        cy.get('[name="termsOfService"]').click()
        cy.get('[name="submit"]').click()
        cy.get('.card-title').contains('abc')
    })

})