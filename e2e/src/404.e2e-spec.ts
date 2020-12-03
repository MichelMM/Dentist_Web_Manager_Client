import { AppPage } from './app.po';
import { browser, logging, element, by } from 'protractor';

describe('workspace-project App', () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('should display home (404)', () => {
        page.navigateTo();
        expect(page.getTitleText()).toEqual('BIENVENIDO A DENTLAB');
    });

    it('should display 404', () => {
        browser.get(browser.baseUrl+'/link');
        expect(element(by.id("title404")).getText()).toEqual('404');
    });

    afterEach(async () => {
        // // Assert that there are no errors emitted from the browser
        // const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        // expect(logs).not.toContain(jasmine.objectContaining({
        //     level: logging.Level.SEVERE,
        // } as logging.Entry));
    });
});
