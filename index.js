const ipfsapi = require('ipfs-api');
const	OrbitDB = require('orbit-db');

main();

async function main() {
	try {
		const orbitdb = new OrbitDB(ipfsapi('127.0.0.1', 5001));
		const access = {
			// Give write access to everyone
			write: ['*'],
		}
		const kvs = await orbitdb.kvstore('mynamespace', access);
		let hash;
		let counter = 0;
		const wait = setInterval(async () => {
			if (counter >= 10) {
			clearInterval(wait);
		}
	else {
			hash = await kvs.set(`hello ${counter}`, { name: `World ${counter}`});
			console.log('hash', hash);
			counter+=1;
		}
	}, 2000);
	} catch(err) {
		console.log(err);
	}
}

