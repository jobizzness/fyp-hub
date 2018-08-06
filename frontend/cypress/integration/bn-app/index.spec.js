/// <reference types="Cypress" />

context('bn-app', () => {
    before(() => {
        cy.visit('/');
    })

    describe('tests all elements are rendered', () => {

        it('esures current users name is visible', () => {
            cy.contains('Matarr Jobe');
        })

        it('esures current users username is visible', () => {
            cy.contains('@Jobizzness');
        })

        it('ensures Navigation is visible', () => {
            //cy.contains();
        })
    })
})
