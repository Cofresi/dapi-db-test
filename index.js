const ipfsapi = require('ipfs-api');
const	OrbitDB = require('orbit-db');
const	parseArgs = require('minimist')

main();

async function main() {
	try {
		const opts={ boolean : true }
		const argv = parseArgs(process.argv.slice(2), opts);
		const isActive = Boolean(argv.true);
		const orbitdb = new OrbitDB(ipfsapi('127.0.0.1', 5001));
		const access = {
			// Give write access to everyone
			write: ['*'],
		}
		const db = await orbitdb.kvstore('mynamespace', access);
		db.events.on('replicated', () => {
			const result = db.iterator({ limit: -1 }).collect().map(e => e.payload.value)
			console.log(result.join('\n'))
		});
		if(isActive) {
			let hash;
			let counter = 0;
			const wait = setInterval(async () => {
				if (counter >= 10) {
					clearInterval(wait);
				}
				else {
					hash = await db.put(`hello ${counter}`, { name: `World ${counter}`});
					console.log('hash', hash);
					counter+=1;
				}
			}, 2000);
		}
	} catch(err) {
		console.log(err);
	}
}

