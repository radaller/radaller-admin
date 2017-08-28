const Nightmare = require('nightmare');

describe('Load a Page', function() {
    let nightmare = null;
    beforeEach(() => {
        nightmare = new Nightmare({ show: true })
    });

    describe('Login', () => {
        it('should load without error', async function () {
            let text = await nightmare
                .goto('http://localhost:8080/')
                .type('input[name="user_name"]', 'osvarychevskyi')
                .type('input[name="token"]', '7c94c94ee0ac3ed570e2fdc507acc99b3c53fa9e')
                .click('.next-button button')
                .wait('.add-button button')
                .click('.add-button button')
                .type('input[name="repo_name"]', 'radaller/radaller-mock-data')
                .click('.save-button')
                .wait('.touch-button')
                .click('.touch-button')
                .wait('.logout')
                .wait(5000)
                .evaluate(() => document.querySelector('.logout').innerText)
                .end();
            expect(text).toContain('Repositories');
        }, 30000)
    })
});