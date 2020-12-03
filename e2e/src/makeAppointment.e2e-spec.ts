import { AppPage } from './app.po';
import { browser, logging, element, by } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should make an appointment', () => {
    // browser.waitForAngularEnabled(false)
    // browser.sleep(3000)
    // const dropDownLogin = element(by.id("to-hidden"))

    // const email = element(by.id("email"))
    // const pass = element(by.id("pass"))
    // const loginbtn = element(by.id("loginbtn"))

    // dropDownLogin.click()

    // email.sendKeys("a@a")
    // pass.sendKeys("Cisco123")
    // loginbtn.click()
    page.navigateTo();
    let logoutbtn = element(by.id("logoutbtn"))
    logoutbtn.click()
    const dropDownLogin = element(by.id("to-hidden"))
    const email = element(by.id("email"))
    const pass = element(by.id("pass"))
    const loginbtn = element(by.id("loginbtn"))

    dropDownLogin.click()
    email.sendKeys("a@a")
    pass.sendKeys("Cisco123")
    loginbtn.click()
    browser.sleep(3000)
    browser.get(browser.baseUrl + 'Appointment')
    browser.sleep(3000)
    const date = element(by.id('date'))
    const doctor = element(by.id('doctor'))
    const hour = element(by.id('hour'))
    const cause = element(by.id('cause'))
    date.sendKeys('24-12-2020')
    doctor.sendKeys('5fc84c7753ba5b001789b2fa')
    hour.sendKeys('10:00:00')
    cause.sendKeys("Tryout for testing")

    doctor.click()
    element(by.css("[value='5fc84c7753ba5b001789b2fa']")).click();
    browser.sleep(3000)
    
    hour.click()
    element(by.css("[value='11:00:00']")).click();

    browser.sleep(2000)
    const btnsubmit = element(by.id("btnsubmit"))
    btnsubmit.click()
    browser.sleep(1000)
    
    expect(element(by.css("[role='alertdialog']")).isPresent()).toBeTruthy()
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    // const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    // expect(logs).not.toContain(jasmine.objectContaining({
    //   level: logging.Level.SEVERE,
    // } as logging.Entry));
  });
});
