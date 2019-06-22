describe('petstore.swagger.io automation test - pet', () => {

    // Testing /addPet 
    it('Test add /pet', () => {
        cy.request('POST', 'https://petstore.swagger.io/v2/pet', {
            "id": 0,
            "category": {
                "id": 0,
                "name": "string"
            },
            "name": "doggie",
            "photoUrls": [
                "string"
            ],
            "tags": [
                {
                    "id": 0,
                    "name": "string"
                }
            ],
            "status": "available"
        }).then($response => {
            expect($response.status).to.eq(200)
            expect($response.body).to.have.property('id', 9199424981609307000)
            expect($response.body).to.have.property('name', 'doggie')
            expect($response.body).to.have.property('status', 'available')
        })
    })

    // Testing /updatePet 
    it('Test update /pet', () => {
        cy.request('PUT', 'https://petstore.swagger.io/v2/pet', {
            "id": 3,
            "category": {
                "id": 0,
                "name": "string"
            },
            "name": "kitty",
            "photoUrls": [
                "string"
            ],
            "tags": [
                {
                    "id": 0,
                    "name": "string"
                }
            ],
            "status": "available"
        }).then($response => {
            expect($response.status).to.eq(200)
            expect($response.body).to.have.property('id', 3)
            expect($response.body).to.have.property('name', 'kitty')
            expect($response.body).to.have.property('status', 'available')
        })
    })

    // Testing /findByStatus
    // It seems like there is an issue with this api
    // Selecting available or sold returns a 500 server error
    it('Test /findByStatus', () => {
        cy.request('GET', 'https://petstore.swagger.io/v2/pet/findByStatus?status=pending')
            .then($response => {
                expect($response.status).to.eq(200)
            })
    })

    // Testing findByPetID
    it('Test add /pet/{petId}', () => {

        // adding pet entry
        cy.request('POST', 'https://petstore.swagger.io/v2/pet', {
            "id": 3,
            "category": {
                "id": 0,
                "name": "string"
            },
            "name": "birdy",
            "photoUrls": [
                "string"
            ],
            "tags": [
                {
                    "id": 0,
                    "name": "string"
                }
            ],
            "status": "available"
        })

        // verifying name
        cy.request('GET', 'https://petstore.swagger.io/v2/pet/3')
            .then($response => {
                expect($response.status).to.eq(200)
                expect($response.body).to.have.property('name', 'birdy')
            })
    })

    // Testing updatePetData
    it('Test update /pet/{petId}', () => {

        cy.visit('https://petstore.swagger.io')

        // adding pet entry
        cy.request('POST', 'https://petstore.swagger.io/v2/pet', {
            "id": 3,
            "category": {
                "id": 0,
                "name": "string"
            },
            "name": "birdy",
            "photoUrls": [
                "string"
            ],
            "tags": [
                {
                    "id": 0,
                    "name": "string"
                }
            ],
            "status": "available"
        })

        // change name and status
        cy.get('#operations-pet-updatePetWithForm').click().within(() => {

            cy.contains('button', 'Try it out').click()
            cy.get('[data-param-name=petId] input').type('3')
            cy.get('[data-param-name=name] input').type('monkey')
            cy.get('[data-param-name=status] input').type('pending')

            cy.contains('button', 'Execute').click()
        })
        cy.log('Note: expecting to fail for unknown reason')
        // verify name and status has been changed
        cy.request('POST', 'https://petstore.swagger.io/v2/pet/3')
            .then($response => {
                expect($response.status).to.eq(200)
                expect($response.body).to.have.property('name', 'monkey')
                expect($response.body).to.have.property('status', 'pending')
            })

          
    })

    // Testing delete PetData
    it('Test delete /pet/{petId}', () => {

        cy.visit('https://petstore.swagger.io')

        // adding pet entry
        cy.request('POST', 'https://petstore.swagger.io/v2/pet', {
            "id": 3,
            "category": {
                "id": 0,
                "name": "string"
            },
            "name": "birdy",
            "photoUrls": [
                "string"
            ],
            "tags": [
                {
                    "id": 0,
                    "name": "string"
                }
            ],
            "status": "available"
        })

        // delete
        cy.request('DELETE', 'https://petstore.swagger.io/v2/pet/3')
            .then($response => {
                expect($response.status).to.eq(200)
            })
    })
})