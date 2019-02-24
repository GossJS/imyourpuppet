const should = require('should');
const Zombie = require('zombie');
const page  = new  Zombie();

const cases = [
    {s: '', xs: 'ego@yandex.ru'}, 
];

const URL = 'https://kodaktor.ru/g/lect_29d99';        
console.clear = () => {};     
cases.forEach(({ s, xs }) =>
    describe(xs + ' xml', () => 
      it('respond with 4th login', async () => {
               await page.visit(URL);  
               page.pressButton('button'); 
               setTimeout(async () => {
                  page.document.title.should.equal(xs);
               }, 2000);
        
      })
    )
);
