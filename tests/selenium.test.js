const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function runTest() {
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
    console.log("Chargement de la page...");
    await driver.get('https://localhost:3000/taskpane-test.html');
    console.log("Page chargée");

    const button = await driver.wait(until.elementIsVisible(driver.findElement(By.id('myButton'))), 10000);
    await driver.wait(until.elementIsEnabled(button), 10000);
    await button.click();

    const message = await driver.wait(until.elementLocated(By.id('message')), 5000);
    const visible = await message.isDisplayed();

    console.log("Test bouton visible:", visible);
  } catch (err) {
    console.error("Erreur pendant le test :", err);
  } finally {
    await driver.quit();
    console.log("Test terminé");
  }
}

runTest();
