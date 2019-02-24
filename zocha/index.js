const Zombie = require('zombie');
const page  = new  Zombie();

const cases = [
    {s: '', xs: 'ego@yandex.ru'}, 
];
process.on('unhandledRejection',  e => console.log(e));
const URL = 'https://kodaktor.ru/g/lect_29d99';        
(async () => {
  for (const { xs } of cases) {
  	await page.visit(URL); 
  	setTimeout(async () => {
  		await page.pressButton('button');
  		setTimeout(async () => {
  		   console.log(page.document.title);
  		}, 2000);
  		
  	}    , 2000);
  	
    
  }
})();     
   
    
