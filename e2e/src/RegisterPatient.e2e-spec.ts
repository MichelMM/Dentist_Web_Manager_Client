import { AppPage } from './app.po';
import { browser, logging, element, by } from 'protractor';

describe('workspace-project App', () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('should display home (Register)', () => {
        page.navigateTo();
        expect(page.getTitleText()).toEqual('BIENVENIDO A DENTLAB');
    });
    
    it('should register', () => {
        let logoutbtn = element(by.id("logoutbtn"))
        logoutbtn.click()
        browser.sleep(2000)
        const goToRegister = element(by.id('goToRegister'))
        goToRegister.click()
        browser.waitForAngularEnabled(false)
        browser.sleep(2000)
        const formName = element(by.id('formName'))
        const formDate = element(by.id("somedate"))
        const formLName = element(by.id('formLName'))
        const emailInput = element(by.id('emailInput'))
        const formPhone = element(by.id('formPhone'))
        const formRFC = element(by.id('formRFC'))
        const formPass = element(by.id('formPass'))
        const formPassC = element(by.id('formPassC'))
        
        formName.sendKeys('Aurelio') 
        formDate.sendKeys('1997-02-23') 
        formLName.sendKeys('Aureliano Aureliado') 
        emailInput.sendKeys('au.au.au@tesata.com') 
        formPhone.sendKeys('3349658831') 
        formRFC.sendKeys('AAAU9902022G4') 
        formPass.sendKeys('Cisco123') 
        formPassC.sendKeys('Cisco123') 
        
        const formButtonR = element(by.id('formButtonR'))
        formButtonR.click()
        browser.sleep(3000)
        expect(page.getTitleText()).toEqual('BIENVENIDO A DENTLAB');
    });

    afterEach(async () => {
        // // Assert that there are no errors emitted from the browser
        // const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        // expect(logs).not.toContain(jasmine.objectContaining({
        //     level: logging.Level.SEVERE,
        // } as logging.Entry));
    });
});
