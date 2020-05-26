const mysql = require('mysql');
const QueryBuilder = require('./QueryBuilder/QueryBuilder');

class MySqlDatabase {
    connection = null;

    async connect() {
        if(this.connection == null){
            this.connection = mysql.createConnection({
                host     : 'localhost',
                user     : 'mjy',
                password : 'mjy159357',
                database : 'hunting'
            });
            this.connection.connect(function(err) {
                if (err) {
                    console.error('error connecting: ' + err.stack);
                    throw err;
                }
            });
        }
        return this.connection;
    }

    async find(condition={}, tableName, orderBy={}) {
        let queryBuilder = QueryBuilder.getSelectQueryBuilder().from(tableName).where(condition);
        if(Object.keys(orderBy).length > 0)
            queryBuilder = queryBuilder.orderBy(orderBy);
        const query = queryBuilder.getQuery();
        //console.log(query);
        const conditionValue = Object.values(condition);
        return new Promise((resolve, reject) => {
            this.connection.query(query, conditionValue, (error, result, fields) => {
                if(!error){
                    resolve(JSON.parse(JSON.stringify(result)));
                } else {
                    reject(error);
                }
            });
        })
    }

    async update(condition, newValues, tableName) {
        const query = QueryBuilder.getUpdateQueryBuilder().from(tableName).where(condition).set(newValues).getQuery();
        //console.log(query);
        const values = Object.values(newValues);
        const conditionValue = Object.values(condition);
        return new Promise((resolve, reject) => {
            this.connection.query(query, values.concat(conditionValue), (error, result, fields) => {
                if(!error){
                    // Do this aims to make data abstract layer to be compatible with mongodb
                    result.result = {};
                    result.result.n = result.affectedRows;
                    //console.log(result);
                    resolve(result);
                } else {
                    reject(error);
                }
            })
        });
    }

    async insert(doc, tableName, uniqueKeys=null) {
        const query = QueryBuilder.getInsertQueryBuilder().from(tableName).column(doc).getQuery();
        const values = Object.values(doc);
        //console.log(query);
        return new Promise((resolve, reject) => {
            this.connection.query(query, values, (error, result, fields) => {
                if(!error){
                    // Do this aims to make data abstract layer to be compatible with mongodb
                    result.result = {};
                    result.result.n = result.affectedRows;
                    //console.log(result);
                    resolve(result);
                } else {
                    reject(error);
                }
            });
        });
    }

    async delete(condition, tableName) {
        const query = QueryBuilder.getDeleteQueryBuilder().from(tableName).where(condition).getQuery();
        const conditionValue = Object.values(condition);

        return new Promise((resolve, reject) => {
            this.connection.query(query, conditionValue, (error, result, fields) => {
                if(!error){
                    // Do this aims to make data abstract layer to be compatible with mongodb
                    result.result = {};
                    result.result.n = result.affectedRows;
                    //console.log(result);
                    resolve(result);
                } else {
                    reject(error);
                }
            });
        });
    }
}

module.exports = MySqlDatabase;