// chromiumHandler.js
const puppeteer = require('puppeteer');

async function handleChromium(modifiedName) {
  const executablePath = '/usr/bin/chromium';

  const browser = await puppeteer.launch({
    executablePath,
    timeout: 30000,
  });

  const page = await browser.newPage();

  // Use page.on('dialog') to handle alerts
  let alertTriggered = false;
  page.on('dialog', async (dialog) => {
    if (dialog.type() === 'alert') {
      alertTriggered = true;
      await dialog.accept();
    }
  });

  await page.setContent(`<input type="text" id="name" name="name" value="${modifiedName}">`);
  await page.waitForTimeout(1000);

  // Simulate user interaction by triggering events
  await page.evaluate(() => {
    const inputElement = document.getElementById('name');

    // Simulate a mouseover event
    const mouseOverEvent = new Event('mouseover');
    inputElement.dispatchEvent(mouseOverEvent);

    // Simulate a mouseup event
    const mouseUpEvent = new Event('mouseup');
    inputElement.dispatchEvent(mouseUpEvent);

    // Simulate a mousedown event
    const mouseDownEvent = new Event('mousedown');
    inputElement.dispatchEvent(mouseDownEvent);

    // Simulate a mouseout event
    const mouseOutEvent = new Event('mouseout');
    inputElement.dispatchEvent(mouseOutEvent);

    // Simulate a change event
    const changeEvent = new Event('change');
    inputElement.dispatchEvent(changeEvent);

    // Simulate a click event
    const clickEvent = new Event('click');
    inputElement.dispatchEvent(clickEvent);

    // Simulate a load event
    const loadEvent = new Event('load');
    window.dispatchEvent(loadEvent); // assuming you want to simulate a load event on the window
  });

  // Close the browser after processing
  await browser.close();

  return alertTriggered;
}

module.exports = { handleChromium };

