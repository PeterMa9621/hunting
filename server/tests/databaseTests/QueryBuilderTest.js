const QueryBuilder = require('../../util/database/QueryBuilder/QueryBuilder');

function selectTest() {
    const condition = {username: 'AAA', email: 'email@a.com'};

    const query = QueryBuilder.getSelectQueryBuilder().from(['users', 'news']).where(condition).getQuery();

    console.log(query);
}

function updateTest() {
    const condition = {username: 'AAA', email: 'email@a.com'};

    const newValues = {email: 'test@gmail.com', password: 'aaaaa'};

    const query = QueryBuilder.getUpdateQueryBuilder().from(['users', 'news']).where(condition).set(newValues).getQuery();

    console.log(query);
}

function insertTest() {

    const columnAndValues = {email: 'test@gmail.com', password: 'aaaaa'};

    const query = QueryBuilder.getInsertQueryBuilder().from('users').column(columnAndValues).getQuery();

    console.log(query);
}

selectTest();

updateTest();

insertTest();