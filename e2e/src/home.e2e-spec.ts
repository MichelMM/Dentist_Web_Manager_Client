import { AppPage } from './app.po';
import { browser, logging, element, by } from 'protractor';

describe('workspace-project App', () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('should display welcome message', () => {
        page.navigateTo();
        expect(page.getTitleText()).toEqual('BIENVENIDO A DENTLAB');
    });

    it('should not login', () => {
        browser.waitForAngularEnabled(false)
        const dropDownLogin = element(by.id("to-hidden"))
        const email = element(by.id("email"))
        const pass = element(by.id("pass"))
        const loginbtn = element(by.id("loginbtn"))

        dropDownLogin.click()
        email.sendKeys("a@a")
        pass.sendKeys("Cisco1213")
        loginbtn.click()
        browser.sleep(3000)
        let logoutbtn = element(by.id("logoutbtn"))
        expect(logoutbtn.isPresent()).toBeFalsy()
    });
    
    it('should login', () => {
        page.navigateTo();
        browser.waitForAngularEnabled(false)
        const dropDownLogin = element(by.id("to-hidden"))
        const email = element(by.id("email"))
        const pass = element(by.id("pass"))
        const loginbtn = element(by.id("loginbtn"))

        dropDownLogin.click()
        email.sendKeys("a@a")
        pass.sendKeys("Cisco123")
        loginbtn.click()
        browser.sleep(3000)
        let logoutbtn = element(by.id("logoutbtn"))
        expect(logoutbtn.isPresent()).toBeTruthy()
    });

    afterEach(async () => {
        // // Assert that there are no errors emitted from the browser
        // const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        // expect(logs).not.toContain(jasmine.objectContaining({
        //     level: logging.Level.SEVERE,
        // } as logging.Entry));
    });
});
