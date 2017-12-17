import request from 'request';
import util from 'util';
import jsdom from 'jsdom';
import RandExp  from 'randexp';

let result = 'not received';

const pr = util.promisify(request);
const prt = util.promisify(setTimeout);

const s = async txt=>{
    const BASE = process.argv[2] || 'https://php-study1-gossoudarev.c9users.io/kurs2017/goss/5.php'
    const URL = `${BASE}?txt=${txt}`;

    const res = await pr(URL);
    const {JSDOM} = jsdom;
    const {document} = (new JSDOM(`<!doctype html><html><body>${res.body}</body></html>`)).window;

    const repl = (x='aaa') =>  x.replace(/a/g,'*'); //b*b**bb*
    const z = repl(txt);

    await prt(3000);
    try {
      result = document.querySelector('h2').textContent;
    } catch (e) {
      console.log(e);
    }
    console.log(result);
    console.log(z);
    console.log( result == z );

};

const txt = new RandExp(/^[ab]{5,10}$/).gen();  //babaabba
s(txt);
