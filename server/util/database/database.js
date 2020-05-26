const MongoDatabase = require('./mongodb');
const MySqlDatabase = require('./mysql');

const databaseType = 'mongodb';

class Database {

    static async getInstance() {
        if(!Database.instance) {
            console.log('Init Database');
            if(databaseType === 'mongodb'){
                Database.instance = new MongoDatabase();
            } else if(databaseType === 'mysql'){
                Database.instance = new MySqlDatabase();
            }

            await Database.instance.connect();
            console.log('Connected Database Successfully');
        }
        return Database.instance;
    }
}

module.exports = Database;