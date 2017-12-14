import request from 'request';
import util from 'util';
import jsdom from 'jsdom';

let result = 'not received';

const pr = util.promisify(request);
const prt = util.promisify(setTimeout);

const s = async (a,b)=>{
    const BASE = process.argv[2] || 'https://kodaktor.ru/api2/z4'
    const URL = `${BASE}?a=${a}&b=${b}`;

    const res = await pr(URL);
    const {JSDOM} = jsdom;
    const {document} = (new JSDOM(`<!doctype html><html><body>${res.body}</body></html>`)).window;

    const powr = (x=2,y=3) => x**y;  // powr(undefined, undefined) === 8
    const z = powr(a,b);
    await prt(3000);
    try {
      result = document.querySelector('h1').textContent;
    } catch (e) {
      console.log(e);
    }
    console.log(result);
    console.log(z);
    console.log( result == z );




};

// s();  // 1   8  false   для node --experimental-modules z4.mjs https://php-study1-gossoudarev.c9users.io/kurs2017/Pasko/4.php
         // NaN 8  false   для node --experimental-modules z4.mjs

s(3,4);  // 81  81 true и  для node --experimental-modules z4.mjs https://php-study1-gossoudarev.c9users.io/kurs2017/Pasko/4.php
         //             и  для node --experimental-modules z4.mjs
/*

<?php
  $num1 = $_GET['a'] ?? 2;
  $num2 = $_GET['b'] ?? 3; //coalesce operator
  echo '<h1>'. $num1 ** $num2 .'</h1>';
?>

если не передавать ничего (внутри это null для PHP и undefined для JS)
https://php-study1-gossoudarev.c9users.io/kurs2017/Pasko/4.php
https://kodaktor.ru/api2/z4
должно быть 8

если хотя бы упомянуть имя
https://php-study1-gossoudarev.c9users.io/kurs2017/Pasko/4.php?a&b
https://kodaktor.ru/api2/z4?a&b
то 1 (не срабатывает coalesce который только для отсутствия, для null)

но если вызвать в этом сценарии s()
и node --experimental-modules z4.mjs
то получается фактически https://kodaktor.ru/api2/z4?a=undefined&b=undefined
и это NaN

а если s()
и node --experimental-modules z4.mjs https://php-study1-gossoudarev.c9users.io/kurs2017/Pasko/4.php
то получается фактически  https://php-study1-gossoudarev.c9users.io/kurs2017/Pasko/4.php?a=undefined&b=undefined
и это 1


php > echo 'undefined'**'undefined';
PHP Warning:  A non-numeric value encountered in php shell code on line 1

Warning: A non-numeric value encountered in php shell code on line 1
PHP Warning:  A non-numeric value encountered in php shell code on line 1

Warning: A non-numeric value encountered in php shell code on line 1
1

 $ node
> console.log(undefined**undefined)
NaN
> console.log('undefined'**'undefined')
NaN


работа, аналогичная coalesce, в JS-коде выполняется аргументами-функции-по-умолчанию

router
      .route('/z4')
        .get( r =>
                {
                   const powr = (x=2,y=3) => x**y;
                   const z = powr(r.query.a,  r.query.b);
                   r.res
                    .set({'Content-Type': 'text/html; charset=utf-8',
                          'Access-Control-Allow-Origin': '*',
                          'Access-Control-Allow-Methods': 'GET,POST,DELETE',
                          'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers'
                         })
                    .send( `<h1>${z}</h1>`  );
               }


      );


node --experimental-modules z4.mjs https://php-study1-gossoudarev.c9users.io/kurs2017/Pasko/4.php

а так
node --experimental-modules z4.mjs
вызывается сценарий по умполчанию https://kodaktor.ru/api2/z4
*/
