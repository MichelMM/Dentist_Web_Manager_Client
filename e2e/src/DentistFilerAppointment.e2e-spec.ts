import { AppPage } from './app.po';
import { browser, logging, element, by } from 'protractor';

describe('workspace-project App', () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('should display home (Dentist)', () => {
        page.navigateTo();
        expect(page.getTitleText()).toEqual('BIENVENIDO A DENTLAB');
    });
    
    it('should get appointment by filter', () => {
        browser.get(browser.baseUrl+'/dentistLogin');
        browser.waitForAngularEnabled(false)
        browser.sleep(2000)

        
        const email = element(by.id('emailL'))
        const pass = element(by.id("passL"))
        email.sendKeys('mmich91@hotmail.es')
        pass.sendKeys('Cisco123')

        browser.sleep(1000)
        const loginDentist = element(by.id('loginDentist'))

        loginDentist.click()
        browser.sleep(2000)

        browser.get(browser.baseUrl+'/dentist/myAppointment');

        browser.sleep(2000)

        const nameSearch = element(by.id('nameSearch'))
        nameSearch.click()

        const NAME = element(by.id('NAME'))
        const LNAME = element(by.id('LNAME'))
        NAME.sendKeys('Michel')
        LNAME.sendKeys('Maris Mora')

        const BUTTON = element(by.id('BUTTON'))
        BUTTON.click()
        browser.sleep(3000)

        const gridAppointment = element(by.id('gridAppointment'))

        
        expect(gridAppointment.isPresent()).toBeTruthy()
    });

    afterEach(async () => {
        // // Assert that there are no errors emitted from the browser
        // const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        // expect(logs).not.toContain(jasmine.objectContaining({
        //     level: logging.Level.SEVERE,
        // } as logging.Entry));
    });
});
