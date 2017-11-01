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
                window.localStorage.setItem('repos', '{"1":{"id":1,"name":"test-repository-1","full_name":"test/test-repository-1","description":"Test repository 1 Description.","openedAt":1508152604141}}');
            })
            .goto(appUrl)
            .wait('.repository-list')
    });

    describe('Repository Admin', () => {
        it('should open/close admin', async function () {
            let repoName = await nightmare
                .click('.repository-list .list-item')
                .wait(1000)
                .wait('span[to="/schemas"]')
                .click('.logout')
                .wait(500)
                .wait('.repository-list')
                .evaluate(() => {
                    return document.querySelector('.repository-list .list-item').innerText.split('\n')[1];
                })
                .end();
            expect(repoName).toEqual('test-repository-1');
        }, 15000);
    })

});