const fs = require('fs');
const logFile = 'test-results.log';

function log(message) {
  console.log(message);
  fs.appendFileSync(logFile, message + '\n');
}

async function runTest() {
  const { Builder, By, until } = require('selenium-webdriver');
  const chrome = require('selenium-webdriver/chrome');

  const options = new chrome.Options();
  options.setChromeBinaryPath(process.env.CHROME_BIN);
  options.addArguments('--headless');
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');
  options.addArguments('--ignore-certificate-errors');

  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    log("Début du test");
    log("Chargement de la page...");
    await driver.get('https://localhost:3000/taskpane-test.html');
    log("Page chargée");

    const button = await driver.wait(until.elementLocated(By.id('myButton')), 10000);
    await button.click();
    log("Clic effectué");

    const message = await driver.wait(until.elementLocated(By.id('message')), 5000);
    const visible = await message.isDisplayed();
    log("Test bouton visible: " + visible);

  } catch (err) {
    log("Erreur pendant le test : " + err);
  } finally {
    await driver.quit();
    log("Test terminé");
  }
}

runTest();
