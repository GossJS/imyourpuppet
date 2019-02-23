const xmldoc = require('xmldoc');
const URL = 'http://kodaktor.ru/x/unsafe_20229';
 
function pr(){
  return new Promise((rs, rj) => {
		require('http').get(URL, (r, b = '') => {
	      // r.readableFlowing === null;
	      r.on('data', d => b += d);
	      r.on('end', () => {      	
	        // r.readableFlowing === true;
	      	const doc = new xmldoc.XmlDocument(b);
	      	rs(doc);
	      });
	     }
	   );
  });	   
}

// pr().then(x => console.log(x.children[7].val));
module.exports = pr;
      
