const SelectQueryBuilder = require('./SelectQueryBuilder');
const UpdateQueryBuilder = require('./UpdateQueryBuilder');
const InsertQueryBuilder = require('./InsertQueryBuilder');
const DeleteQueryBuilder = require('./DeleteQueryBuilder');

class QueryBuilder {

    static getSelectQueryBuilder() {
        return new SelectQueryBuilder();
    }

    static getUpdateQueryBuilder() {
        return new UpdateQueryBuilder();
    }

    static getInsertQueryBuilder() {
        return new InsertQueryBuilder();
    }

    static getDeleteQueryBuilder() {
        return new DeleteQueryBuilder();
    }
}

module.exports = QueryBuilder;