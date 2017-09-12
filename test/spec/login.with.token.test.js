const Nightmare = require('nightmare');

describe('Login Page', function() {
    let nightmare = null;
    const appUrl = process.env.TEST_URL;

    beforeEach(() => {
        nightmare = new Nightmare({ show: false })
    });

    it('should see correct title',  async function () {
        let title = await nightmare.goto(appUrl)
            .evaluate(() => {
                return document.title;
            })
            .end();
        expect(title).toEqual('Radaller');
    });

    describe('Login with token', () => {
        it('should show error on wrong token', async function () {
            let errorMessage = await nightmare
                .goto(appUrl)
                .insert('input[name="token"]', 'wrong_token')
                .click('.next-button button')
                .wait(500)
                .wait('.error-snack')
                .evaluate(() => {
                    return document.querySelector('.error-snack').innerText
                })
                .end();
            expect(errorMessage).toEqual('Token is not valid.');
        }, 5000);

        it('should login on valid token', async function () {
            let isAddButtonVisible = await nightmare
                .goto(appUrl)
                .insert('input[name="token"]', 'valid_token')
                .click('.next-button button')
                .wait('.add-button button')
                .visible('.add-button button')
                .end();
            expect(isAddButtonVisible).toBeTruthy();
        }, 5000);
    })
});