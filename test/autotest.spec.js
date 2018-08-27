require('should');
const puppeteer = require('puppeteer');
let page;
let browser;
const [ width, height] = [600, 350];
before(async () => {
  browser = await puppeteer.launch({
    waitUntil: 'domcontentloaded',
    headless: false,
    slowMo: 30,
    devtools: false,
    args: [`--window-size=${width},${height}`, `--window-position=30,160`]
  });
  page = await browser.newPage();
  await page.setViewport({ width, height });
});

// after(async () => { await browser.close(); }); // в демонстрационных целях закомментить чтобы окно осталось

const cases = [
    {s: 'abc', xs: 'CBA'},
    {s: 'zyx', xs: 'XYZ'},
];

const URL = 'https://kodaktor.ru/g/autocase';

cases.forEach(({ s, xs }) =>
    describe(xs + ' asyncREV()', () => {
      it('respond with revers', async () => {
        await page.goto(URL);
        page.evaluate(s => document.querySelector('#inp').value = s, s);

        await page.$eval('#button_do', el => el.click());
        (await page.$eval('#ans', el => el.value)).should.equal(xs);
      }).timeout(0);
    })
);
