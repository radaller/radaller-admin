const Nightmare = require('nightmare');

describe('Login Page', function() {
    let nightmare = null;
    const appUrl = process.env.TEST_URL;

    beforeEach(() => {
        nightmare = new Nightmare({ show: false })
    });

    describe('Generate token', () => {
        it('should show error on wrong credentials', async function () {
            let errorMessage = await nightmare
                .goto(appUrl)
                .click('.generate-button button')
                .insert('input[name="username"]', 'wrong_username')
                .insert('input[name="password"]', 'wrong_password')
                .click('.next-button button')
                .wait(500)
                .wait('.error-snack')
                .evaluate(() => {
                    return document.querySelector('.error-snack').innerText
                })
                .end();
            expect(errorMessage).toEqual('Credentials are not valid.');
        }, 5000);

        it('should generate token on valid credentials', async function () {
            let isAddButtonVisible = await nightmare
                .goto(appUrl)
                .click('.generate-button button')
                .insert('input[name="username"]', 'valid_username')
                .insert('input[name="password"]', 'valid_password')
                .click('.next-button button')
                .wait('.add-button button')
                .visible('.add-button button')
                .end();
            expect(isAddButtonVisible).toBeTruthy();
        }, 5000);

        it('should regenerate token on valid credentials', async function () {
            let isAddButtonVisible = await nightmare
                .goto(appUrl)
                .click('.generate-button button')
                .insert('input[name="username"]', 'regenerate_token_username')
                .insert('input[name="password"]', 'regenerate_token_password')
                .click('.next-button button')
                .wait(500)
                .wait('.add-button button')
                .visible('.add-button button')
                .end();
            expect(isAddButtonVisible).toBeTruthy();
        }, 7000);

    })
});