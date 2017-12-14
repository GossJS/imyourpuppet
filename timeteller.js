// usage node --experimental-modules timeteller.mjs https://kodaktor.ru/g/016a45c_5d65a
/*
PetrS
true
true
7170 Days
false
7170 days
*/

import Zombie from 'zombie';
import moment from 'moment';

const URL = process.argv[2] || 'https://kodaktor.ru/g/pain_9c0c4'  ;
const page = new Zombie();
const g=URL=>new Promise((rs,rj)=>page.visit(URL,e=>(e)?rj(e):rs()));
const pr=x=>new Promise(res=>setTimeout(()=>res(),x));

const lead = {
  firstname: 'Jim',
  lastname: 'Moriarty',
  startdate: '28.04.1998'
};

const z = moment().diff(moment(lead.startdate, "DD.MM.YYYY"), 'days') + ' days';

const s2 = async ()=>{
    await g(URL);
    await pr(7000);  //важно!!!
    console.log(page.document.querySelector('h4#author').textContent );
    console.log(page.document.querySelector('h1').textContent === lead.firstname );
    console.log(page.document.querySelector('h2').textContent === lead.lastname );
    console.log(page.document.querySelector('h3').textContent);
    console.log(page.document.querySelector('h3').textContent === z);
    console.log(z);
};

s2();
