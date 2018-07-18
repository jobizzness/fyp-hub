/// <reference types="Cypress" />

context('bn-feed', () => {
    beforeEach(() => {
        cy.visit('/');
    })

    describe('tests post card element', () => {

        it('ensure post card will render editor', () => {
            cy.get('bn-feed .create-post-card')
            .click()

            cy.get('bn-discussion-editor')
            .should('have.class', 'opened')
            .wait(500)
            .then(($node) => {
                $node[0].close()
            })
            .wait(500)
            .should('not.have.class', 'opened')

        })

    })
})
