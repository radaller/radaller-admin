const Nightmare = require('nightmare');

describe('Repository Page', function() {
    let nightmare = null;
    const appUrl = process.env.TEST_URL;

    beforeEach(() => {
        nightmare = new Nightmare({ show: false });
        return nightmare
            .goto(appUrl)
            .insert('input[name="token"]', 'valid_token')
            .click('.submit-button')
            .wait('.repository-open');
    }, 10000);

    describe('Open Repository', () => {
        it('should show repository list', async function () {
            let repositoryNames = await nightmare
                .click('.repository-open')
                .wait('.suggested-repositories')
                .evaluate(() => {
                    return Array.from(
                        document.querySelectorAll('.suggested-repositories .list-item')
                    ).map(item => item.innerText.split('\n')[1]);
                })
                .end();
            expect(repositoryNames).toContain('test-repository-1');
            expect(repositoryNames).toContain('test-a-repository-2');
            expect(repositoryNames).toContain('test-a-repository-3');
            expect(repositoryNames).toContain('test-b-repository-4');
            expect(repositoryNames).toContain('test-b-repository-5');
        }, 5000);

        it('should filter repository list', async function () {
            let suggestedRepositoryNames = await nightmare
                .click('.repository-open')
                .wait('.suggested-repositories')
                .type('input[name="list-filter"]', 'test-a')
                .evaluate(() => {
                    return Array.from(
                        document.querySelectorAll('.suggested-repositories .list-item')
                    ).map(item => item.innerText.split('\n')[1]);
                })
                .end();
            expect(suggestedRepositoryNames).toEqual([
                'test-a-repository-2',
                'test-a-repository-3'
            ]);
        }, 5000);
    });
});