import './commands'
import 'cypress-mochawesome-reporter/register';

afterEach(function () {
  const testName = this.currentTest.title;
  const screenshotName = `${testName}`;
  cy.screenshot(screenshotName);
});