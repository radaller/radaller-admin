const Nightmare = require('nightmare');

describe('Admin', function() {
    let nightmare = null;
    const appUrl = process.env.TEST_URL;

    beforeEach(() => {
        nightmare = new Nightmare({ show: false });
        return nightmare
            .goto(appUrl)
            .evaluate(() => {
                window.localStorage.setItem('auth', '{"username":"osvarychevskyi","token":"valid_token"}');
                window.localStorage.setItem('current', 'test/test-repository-1');
                window.localStorage.setItem('repos', '[{"name":"test/test-repository-1"}]');
            })
            .goto(appUrl)
            .wait('.repo-item')
    });

    describe('Repository Admin', () => {
        it('should open/close admin', async function () {
            let repoName = await nightmare
                .click('.repo-item')
                .wait(1000)
                .wait('.logout')
                .click('.logout')
                .wait(500)
                .wait('.add-button button')
                .evaluate(() => {
                    return document.querySelector('.repo-item span').innerText
                })
                .end();
            expect(repoName).toEqual('test/test-repository-1');
        }, 30000);
    })

});