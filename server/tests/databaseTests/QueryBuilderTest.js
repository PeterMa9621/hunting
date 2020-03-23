const QueryBuilder = require('../../util/database/QueryBuilder');

function test() {
    const condition = {username: 'AAA', email: 'email@a.com'};

    const query = new QueryBuilder().from(['users', 'news']).where(condition).getQuery();

    console.log(query);
}

test();