const Database = require('../../util/database/database');

async function test() {
    let client = await Database.getInstance();
    const db = client.db('test');
    db.collection('test1').find({'role.china':'citizen'}).toArray().then(items => {
        items.forEach((item) => {
            console.log(item);
        });
    });
}

test();