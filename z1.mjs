/*
 это сценарий, содержащий подключение через request и zombie
request+jsdom работает для любого серверного сценарий, когда
мы хотим получить готовый ответ в виде разметки и извлечь текст из тегов

здесь не используется тестирующий фреймворк, но можно создать
сценарий с Jest на его основе

с помощью этого сценария демонстрируется простая автоматизированная проверка
выполнения


*/

import Zombie from 'zombie';
import request from 'request';
import util from 'util';
import jsdom from 'jsdom';
import moment from 'moment';

let result = 'not received';
const page = new Zombie();
const g = URL => new Promise((rs,rj)=>page.visit(URL,e=>(e)?rj(e):rs()));
const pr = util.promisify(request);
const prt = util.promisify(setTimeout);
//const prt = x => new Promise(res=>setTimeout(()=>res(),x));

const s = async ()=>{
    const URL = process.argv[2] || 'https://php-study1-gossoudarev.c9users.io/kurs2017/goss/1a.php'

    /* вариант с request для c9 */
    const res = await pr(URL);
    const {JSDOM} = jsdom;
    const {document} = (new JSDOM(`<!doctype html><html><body>${res.body}</body></html>`)).window;
    /* вариант */

    /* вариант с zombie для kodaktor.ru/g/moment_e8783 */
    //await g(URL);
    /* вариант */

    const z = moment().format('DD/MM/YYYY HH:mm');
    await prt(3000); // нужно только для zombie
    try {
      result = document.querySelector('h1').textContent;  // page.document для zombie и document для req
    } catch (e) {
      console.log(e);
    }

    //устранение пробельных символов и стрингификация
    console.log(JSON.stringify(result.trim()) === JSON.stringify(z)); //true

    console.log(document.title);

};

s();  //true

/*

мой вариант:
на PHP
<?php
    date_default_timezone_set('Europe/Moscow');
    echo '<h1>' . date('j/m/Y H:i') . '</h1>';
?>
node --experimental-modules z1.mjs https://php-study1-gossoudarev.c9users.io/kurs2017/goss/1a.php
на Node
newkodaktor/routes/api2/index.js
router
      .route('/time')
        .get( r =>
                {
                   const z = moment().format('DD/MM/YYYY HH:mm');
                   r.res
                    .set({'Content-Type': 'text/html; charset=utf-8',
                          'Access-Control-Allow-Origin': '*',
                          'Access-Control-Allow-Methods': 'GET,POST,DELETE',
                          'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers'
                         })
                    .send( `<h1>${z}</h1>`  );
               }


      );


<title>Страница Кирилла</title>
<h1>
<?php
date_default_timezone_set('Europe/Moscow');
echo date ('d/m/Y H:i');
?>
</h1>
node --experimental-modules z1.mjs https://php-study1-gossoudarev.c9users.io/kurs2017/Pasko/1.php



следующий вызов клиентского сценарий
с request не сработает: нужен зомби или хромиум
node --experimental-modules z1.mjs https://kodaktor.ru/g/moment_e8783


следующий вызов серверного сценария
сработает и с request и с Zombie
node --experimental-modules z1.mjs https://kodaktor.ru/api2/time

*/
