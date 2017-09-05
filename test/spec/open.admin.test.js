const Nightmare = require('nightmare');

describe('Admin', function() {
    let nightmare = null;
    const appUrl = process.env.TEST_URL;

    beforeEach(() => {
        nightmare = new Nightmare({ show: false });
        return nightmare
            .goto(appUrl)
            .insert('input[name="token"]', 'valid_token')
            .click('.next-button button')
            .wait('.add-button button')
            .click('.add-button button')
            .insert('input[name="repo_name"]', 'test/test-repository-1')
            .type('input[name="repo_name"]', '\u000d')
            .wait('.repo-item')
    });

    describe('Repository Admin', () => {
        it('should open/close admin', async function () {
            let repoName = await nightmare
                .click('.repo-item')
                .wait('.logout')
                .click('.logout')
                .wait('.add-button button')
                .evaluate(() => {
                    return document.querySelector('.repo-item span').innerText
                })
                .end();
            expect(repoName).toEqual('test/test-repository-1');
        }, 20000);
    })

});