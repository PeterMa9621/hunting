const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://mjy:mjy159357@cluster0-8auco.mongodb.net/hunting?retryWrites=true&w=majority";

function iterateCursor(doc){
    console.log(JSON.stringify(doc, null, 4));
}

function errorFunc(err){
    console.log(err);
}

class Database {

    static async getInstance() {
        if(!Database.instance) {
            console.log('Init');
            Database.instance = new _Database();
            await Database.instance.connect();
        }
        return Database.instance.client;
    }
}

class _Database {
    client = null;

    async connect() {
        if(!this.client) {
            this.client = await MongoClient.connect(uri, {
                useNewUrlParser: true ,
                useUnifiedTopology: true
            });
        }
        return this.client;
    }

    close() {
        return new Promise((resolve, reject) => {
            try {
                this.client.close().then(()=>{resolve()});
            } catch (e) {
                reject(e);
            }
        })
    }
}

module.exports = Database;