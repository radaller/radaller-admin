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
                .click('.submit-button button')
                .wait(500)
                .wait('.error-snack')
                .evaluate(() => {
                    return document.querySelector('.error-snack').innerText
                })
                .end();
            expect(errorMessage).toEqual('Credentials are not valid.');
        }, 7000);

        it('should generate token on valid credentials', async function () {
            let isOpenButtonVisible = await nightmare
                .goto(appUrl)
                .click('.generate-button button')
                .insert('input[name="username"]', 'valid_username')
                .insert('input[name="password"]', 'valid_password')
                .click('.submit-button button')
                .wait('.repository-open')
                .visible('.repository-open')
                .end();
            expect(isOpenButtonVisible).toBeTruthy();
        }, 7000);

        it('should regenerate token on valid credentials', async function () {
            let isOpenButtonVisible = await nightmare
                .goto(appUrl)
                .click('.generate-button button')
                .insert('input[name="username"]', 'regenerate_token_username')
                .insert('input[name="password"]', 'regenerate_token_password')
                .click('.submit-button button')
                .wait(500)
                .wait('.repository-open')
                .visible('.repository-open')
                .end();
            expect(isOpenButtonVisible).toBeTruthy();
        }, 7000);

        it('should generate token on 2fa valid credentials', async function () {
            let isOpenButtonVisible = await nightmare
                .goto(appUrl)
                .click('.generate-button button')
                .insert('input[name="username"]', '2fa_username')
                .insert('input[name="password"]', '2fa_password')
                .click('.submit-button button')
                .wait(500)
                .wait('input[name="_2facode"]')
                .insert('input[name="_2facode"]', '2fa_code')
                .click('.submit-button button')
                .wait('.repository-open')
                .visible('.repository-open')
                .end();
            expect(isOpenButtonVisible).toBeTruthy();
        }, 7000);

    })
});