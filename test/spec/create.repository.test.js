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
            .wait('.repository-create');
    }, 10000);

    describe('Create Repository', () => {
        it('should show error for existing repository', async function () {
            let errorMessage = await nightmare
                .click('.repository-create')
                .wait('input[name="repository-name"]')
                .insert('input[name="repository-name"]', 'existing-repository')
                .click('.create-submit')
                .wait(500)
                .evaluate(() => {
                    return document.querySelector('.repository-name > div:last-child').innerText;
                })
                .end();
            expect(errorMessage).toEqual('Repository already exist.');
        }, 5000);

        it('should create new repository', async function () {
            let result = await nightmare
                .click('.repository-create')
                .wait('input[name="repository-name"]')
                .insert('input[name="repository-name"]', 'new-repository')
                .click('.create-submit')
                .wait(1000)
                .wait('span[to="/schemas"]')
                .evaluate(() => {
                    return true;
                })
                .end();
            expect(result).toEqual(true);
        }, 5000);

        it('should replace spaces with dashes', async function () {
            let repositoryName = await nightmare
                .click('.repository-create')
                .wait('input[name="repository-name"]')
                .type('input[name="repository-name"]', 'New Repository')
                .evaluate(() => {
                    return document.querySelector('input[name="repository-name"]').value;
                })
                .end();
            expect(repositoryName).toEqual('new-repository');
        }, 5000);
    });
});