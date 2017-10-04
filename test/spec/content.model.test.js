const Nightmare = require('nightmare');

describe('Content Model', () => {
    let nightmare = null;
    const appUrl = process.env.TEST_URL;

    beforeEach(() => {
        nightmare = new Nightmare({ show: true });
        return nightmare
            .goto(appUrl)
            .insert('input[name="token"]', 'valid_token')
            .click('.next-button button')
            .wait(500)
            .wait('.add-button button')
            .click('.add-button button')
            .insert('input[name="repo_name"]', 'test/test-repository-1')
            .type('input[name="repo_name"]', '\u000d')
            .wait('.repo-item')
            .click('.repo-item')
            .wait(500)
            .wait('span[to="/schemas"]');
    }, 10000);


    describe('Model Details Page', () => {
        it('should see models list', async function () {
            let modelsList = await nightmare
                .click('span[to="/schemas"]')
                .wait(1000)
                .wait('.datagrid-body')
                .evaluate(() => {
                    return Array.from(document.querySelectorAll('.datagrid-body .column-id span')).map(item => item.innerText);
                })
                .end();
            expect(modelsList).toEqual(['posts.yaml', 'menus_items.yaml']);
        }, 8000);

        it('should see model\'s details', async function () {
            let modelsList = await nightmare
                .click('span[to="/schemas"]')
                .wait(500)
                .wait('.datagrid-body')
                .click('a[href="#/schemas/posts.yaml"]')
                .wait(500)
                .evaluate(() => {
                    return document.querySelector('input[name="title"]').value;
                })
                .end();
            expect(modelsList).toEqual('Posts');
        }, 5000);
    });

    describe('Add New Model', () => {
        it('should see models list', async function () {
            let modelsList = await nightmare
                .click('span[to="/schemas"]')
                .wait(500)
                .wait('.datagrid-body')
                .evaluate(() => {
                    return Array.from(document.querySelectorAll('.datagrid-body .column-id span')).map(item => item.innerText);
                })
                .end();
            expect(modelsList).toEqual(['posts.yaml', 'menus_items.yaml']);
        }, 7000);

        it('should see model\'s details', async function () {
            let modelsList = await nightmare
                .click('span[to="/schemas"]')
                .wait(500)
                .wait('.datagrid-body')
                .click('a[href="#/schemas/posts.yaml"]')
                .wait(500)
                .evaluate(() => {
                    return document.querySelector('input[name="title"]').value;
                })
                .end();
            expect(modelsList).toEqual('Posts');
        }, 5000);
    });
});