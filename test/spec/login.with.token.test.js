const Nightmare = require('nightmare');

describe('Login Page', function() {
    let nightmare = null;
    beforeEach(() => {
        nightmare = new Nightmare({ show: false })
    });

    it('should see correct title',  async function () {
        let title = await nightmare.goto('http://localhost:8080/')
            .evaluate(() => {
                return document.title;
            })
            .end();
        expect(title).toEqual('Radaller');
    });

    describe('Login with token', () => {
        it('should login on valid token', async function () {
            let errorMessage = await nightmare
                .goto('http://localhost:8080/')
                .type('input[name="token"]', 'wrong_token')
                .click('.next-button button')
                .wait(50)
                .wait('.error-snack')
                .evaluate(() => {
                    return document.querySelector('.error-snack').innerText
                })
                .end();
            expect(errorMessage).toEqual('Token is not valid');
        }, 5000);

        it('should show error on wrong token', async function () {
            let isAddButtonVisible = await nightmare
                .goto('http://localhost:8080/')
                .type('input[name="token"]', 'valid_token')
                .click('.next-button button')
                .wait('.add-button button')
                .visible('.add-button button')
                .end();
            expect(isAddButtonVisible).toBeTruthy();
        }, 5000);

        //  it('should load without error', async function () {
        //     let text = await nightmare
        //         .goto('http://localhost:8030/')
        //         .wait(5000)
        //         .type('input[name="token"]', '7c94c94ee0ac3ed570e2fdc507acc99b3c53fa9e')
        //         .click('.next-button button')
        //         .wait('.add-button button')
        //         .click('.add-button button')
        //         .type('input[name="repo_name"]', 'radaller/radaller-mock-data')
        //         .click('.save-button')
        //         .wait('.touch-button')
        //         .click('.touch-button')
        //         .wait('.logout')
        //         .wait(5000)
        //         .evaluate(() => document.querySelector('.logout').innerText)
        //         .end();
        //     expect(text).toEqual('Repositories');
        // }, 30000);

    })
});