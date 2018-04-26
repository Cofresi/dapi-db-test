const ipfsapi = require('ipfs-api');
const	OrbitDB = require('orbit-db');

main();

async function main() {
	try {
		const orbitdb = new OrbitDB(ipfsapi('127.0.0.1', 5001));
		const kvs = await orbitdb.kvstore('mynamespace');
		const hash = await kvs.set('hello', { name: 'World' });
		console.log('hash', hash);
	} catch(err) {
		console.log(err);
	}
}

