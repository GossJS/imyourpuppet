import request from 'request';
import util from 'util';
import jsdom from 'jsdom';

import Rand from 'gossrandom';

const pr = util.promisify(request);
const BASE = process.argv[2] || 'https://kodaktor.ru/api2/z4'

beforeAll(async () => {
  console.log('Starting...');
});
afterAll(() => {
  console.log('Finishing...');
});

describe('degree calculator', () => {
  test('URL gives a in the power of b in h1', async () => {

    const a = Math.ceil(Rand.interval(4,7));
    const b = Math.ceil(Rand.interval(4,7));
    const URL = `${BASE}?a=${a}&b=${b}`;                      // например https://kodaktor.ru/api2/z4?a=4&b=4
     
    const powr = (x=2,y=3) => x**y;                           // powr(undefined, undefined) === 8
    const z = String(powr(a,b));

    const res = await pr(URL);
    const {JSDOM} = jsdom;
    const {document} = (new JSDOM(`<!doctype html><html><body>${res.body}</body></html>`)).window;
    const result = document.querySelector('h1').textContent; // это проходит если h1 существует там
                                                             // 256 для https://kodaktor.ru/api2/z4?a=4&b=4

    expect(result).toBe(z);

  }, 5000);
});
