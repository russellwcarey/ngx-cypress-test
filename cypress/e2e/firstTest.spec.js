/// <reference types="cypress" />

describe('Our first suite', () => {

     it('first test', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //by Tag Name
        cy.get('input')

        //by ID
        cy.get('#inputEmail1')

        //by Class name
        cy.get('.input-full-width')

        //by Attribute name
        cy.get('[placeholder]')

        //by Attribute name and value
        cy.get('[placeholder="Email"]')

        //by Class value
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        //by Tage name and Attribute with value
        cy.get('input[placeholder="Email"]')

        //by two different Attributes
        cy.get('[placeholder="Email"][type="email"]')

        //by Tag name, Attribute with Value, ID and Class name
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

        //The most recommended way by Cypress
        cy.get('[data-cy="imputEmail1"]')

        //creating your own locator is ideal, in case elements or attributes change

    })

    it('second test', () => {


        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.get('[data-cy="signInButton"]')

        cy.contains('Sign in')
        //When you are using text as a locator always make sure to check the upper/lower-case of text.  
        //CSS styles can override the case/behavior of button, and the text may look different than what is in the HTML on the page

        cy.contains('[status="warning"]','Sign in')

        cy.get('#inputEmail3')
        //.get is searching elements in the entire DOM and you chain the .get from the 'cy'
        .parents('form')
        .find('button')
        .should('contain', 'Sign in')
        .parents('form')
        .find('nb-checkbox')
        //.find is to find the child elements from the parent elements 
        // A child command must be chained after a parent because it operates on a previous subject
        //.parents method is to locate the parents element from the current key element which you are in (would the key element be the 'cy.get()' above?)
        //accepts the same type of selectors
        .click()

        cy.contains('nb-card','Horizontal form').find('[type="email"]')


    })

    it('then and wrap methods', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
        // cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')
        // //Above seems redundant - below is simplified using a variable

        // cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email address')
        // cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password')
        // //Above seems redundant - below is simplified using a variable


        // //Selenium 'style'
        // const firstForm = cy.contains('nb-card', 'Using the Grid')
        // const secondForm = cy.contains('nb-card', 'Basic form')

        // firstForm.find('[for="inputEmail1"]').should('contain', 'Email')
        // firstForm.find('[for="inputPassword2"]').should('contain', 'Password')

        // secondForm.find('[for="exampleInputEmail1"]').should('contain', 'Email address')
        // //secondForm.find('[for="exampleInputPassword1"]').should('contain', 'Password')

        //Cypress 'style'
        cy.contains('nb-card', 'Using the Grid').then(firstForm => { //executed cy.contains to find the locator of nb-card and HTML form which contains text 'Using the Grid' which is unique for this page //Got the result of this function and saved it into the firstForm parameter  //also can be written: like  cy.contains('nb-card', 'Using the Grid').then(function(firstForm) { <--Looks like this when written in ES5 //when you call the .then() function, the parameter of this function becomes a jquery object --- not a cypress object anymore

            const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text() //getting text for web element, save it into the variable //in JQuery format, not a cypress format --- save it and use it later on //When you are in the JQuery format you are not able to use Cypress methods like click, type, and expect

            const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text() //getting text for web element, save it into the variable (again) //method, which is .text()

            expect(emailLabelFirst).to.equal('Email') //Doing assertion //expect is a Chai assertion library, should is from a Cypress assertion library


            expect(passwordLabelFirst).to.equal('Password') //When making assertions with JQuery elements, you will have to use the Chai library //When using should method to make assertions, you will be using the Cypress library

                cy.contains('nb-card', 'Basic form').then( secondForm => {
                    const passwordSecondText = secondForm.find('[for="exampleInputPassword1"]').text()
                    expect(passwordLabelFirst).to.equal(passwordSecondText)//Second cy.contains is nested inside of the first, then function and then used another then function to grab the context of the second form //The variable saved in the first function will be available and visible for each next, nested function (eg., .then(someVar =>{ }) functions) //If you put code below the '})', as is noted immediately below this comment, then passwordLabelFirst is not defined, // because it is outside of the lexical scope of that function.  The result of the previous variable will not be visible outside of the function //Since this is a JQuery format, What do you do if you want to change the context back to Cypress, and continue to write your test in Cypress format?
                    cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password')

                })

            })
        
        })

    it.only('invoke command', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //1
        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

        //2 - got result of function, saved it as input label (jquery element) then we used a jquery method
        // .text()  to get the text from this label, then we made the assertion to the email address
        cy.get('[for="exampleInputEmail1"]').then( label => {
            expect(label.text()).to.equal('Email address')

        //3 - pretty much the same as #2, but we used the cypress invoke method to get the text from the page
        // then we saved this text as a parameter of our function and then we made the assertion that text was
        // equal to Email address
        cy.get('[for="exampleInputEmail1"]').invoke('text').then( text => {
            expect(text).to.equal('Email address')

        //4 - check to see if the checkbox is actually checked
        // 
        // 
        cy.contains('nb-card','Basic form')
            .find('nb-checkbox')
            .click()
            .find('.custom-checkbox')
            .invoke('attr', 'class')
            //.should('contain', 'checked')
            .then(classValue => {
                expect(classValue).to.contain('checked')
            })
        })
        })
    })

})