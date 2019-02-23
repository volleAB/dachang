const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://music.163.com/');
  // await page.goto('https://www.baidu.com/');
  const musicName = '星月神话';
  // await page.type('.ph.j-flag', '.ph.j-flag', {delay: 100});
  await page.click('#srch')
  await page.type('星月神话', {delay: 100});
  // await page.keyboard.press('Enter');
  await page.keyboard.down('Enter');
  await page.keyboard.up('Enter');
  // page.click('#su')
  await page.waitFor(1000);
  // const targetLink = await page.evaluate(() => {
  //   return [...document.querySelectorAll('.result a')].filter(item => {
  //     return item.innerText && item.innerText.includes('Puppeteer的入门和实践')
  //   }).toString()
  // });
  // await page.goto(targetLink);
  await page.waitFor(1000);
  // browser.close();
})()