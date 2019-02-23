const puppeteer = require('puppeteer');
const pr = require('./xml2');
const APP = 'https://kodaktor.ru/g/lect_29d99';

let page;
const width = 1920;
const height = 1080;
( async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: [`--window-size=${width},${height}`]
  });
  page = await browser.newPage();
  await page.setViewport({ width, height });
 
   
  await page.goto(APP);
  await page.waitForSelector('button');
  await page.click('button');
  const pageTitle = await page.title();
  console.log(pageTitle);
  const result = await pr();
  console.log( result.children[7].val === pageTitle );
})();  

   // browser.close();
