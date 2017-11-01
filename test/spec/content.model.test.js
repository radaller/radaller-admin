const Nightmare = require('nightmare');

describe('Content Model', () => {
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
            .click('.repository-list .list-item')
            .wait(1000)
            .wait('.logout')
            .wait(500)
            .wait('span[to="/schemas"]')
            .click('span[to="/schemas"]')
            .wait(1000)
            .wait('.datagrid-body');
    }, 15000);


    describe('Model Details Page', () => {
        it('should see models list', async function () {
            let modelsList = await nightmare
                .evaluate(() => {
                    return Array.from(document.querySelectorAll('.datagrid-body .column-id span')).map(item => item.innerText);
                })
                .end();
            expect(modelsList).toEqual(['posts.yaml', 'menus_items.yaml']);
        }, 8000);

        it('should see model\'s details', async function () {
            let modelsList = await nightmare
                .click('a[href="#/schemas/posts.yaml"]')
                .wait(500)
                .evaluate(() => {
                    return document.querySelector('input[name="title"]').value;
                })
                .end();
            expect(modelsList).toEqual('Posts');
        }, 8000);
    });

    describe('Add New Model', () => {
        it('should see model\'s details', async function () {
            let modelsList = await nightmare
                .click('a[href="#/schemas/posts.yaml"]')
                .wait(500)
                .evaluate(() => {
                    return document.querySelector('input[name="title"]').value;
                })
                .end();
            expect(modelsList).toEqual('Posts');
        }, 8000);
    });
});