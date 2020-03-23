const QueryBuilderBase = require('./QueryBuilderBase');

class InsertQueryBuilder extends QueryBuilderBase{

    _insert = "INSERT INTO ";
    _from = "";
    _column = "(";
    _values = "VALUES (";

    column(columnsAndValues={}){
        const length = Object.keys(columnsAndValues).length;

        if(length > 0){
            let i = 0;
            for(let key in columnsAndValues){
                this._column += key;
                this._values += "?";
                if(i < length - 1){
                    this._column += ', ';
                    this._values += ', ';
                } else {
                    this._column += ') ';
                    this._values += ') ';
                }
                i++;
            }
        }

        return this;
    }

    getQuery(){
        return this._insert + this._from + this._column + this._values;
    }
}

module.exports = InsertQueryBuilder;