const Nightmare = require('nightmare');

describe('Repository Page', function() {
    let nightmare = null;
    const appUrl = process.env.TEST_URL;

    beforeEach(() => {
        nightmare = new Nightmare({ show: false });
        return nightmare
            .goto(appUrl)
            .insert('input[name="token"]', 'valid_token')
            .click('.next-button button')
            .wait('.add-button button');
    });

    describe('Add Repository', () => {
        it('should add repository', async function () {
            let repoName = await nightmare
                .click('.add-button button')
                .insert('input[name="repo_name"]', 'test/test-repository-1')
                .type('input[name="repo_name"]', '\u000d')
                .wait('.repo-item')
                .evaluate(() => {
                    return document.querySelector('.repo-item span').innerText
                })
                .end();
            expect(repoName).toEqual('test/test-repository-1');
        }, 5000);

        it('should show suggestions', async function () {
            let suggestions = await nightmare
                .click('.add-button button')
                .type('input[name="repo_name"]', 'test/test')
                .evaluate(() => {
                    document.querySelector('input[name="repo_name"]').focus();
                    return document.querySelectorAll('span[role="menuitem"]').length;
                })
                .end();
            expect(suggestions).toEqual(5);
        }, 5000);
    });
});