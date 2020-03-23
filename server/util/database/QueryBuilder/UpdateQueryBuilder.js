const QueryBuilderBase = require('./QueryBuilderBase');

class UpdateQueryBuilder extends QueryBuilderBase{

    _update = "UPDATE ";
    _set = "SET ";
    _from = "";

    set(keysAndValues={}){
        const length = Object.keys(keysAndValues).length;

        if(length > 0){
            let i = 0;
            for(let key in keysAndValues){
                this._set += key + " = ?";
                if(i < length - 1){
                    this._set += ', ';
                } else {
                    this._set += ' ';
                }
                i++;
            }
        }
        return this;
    }

    getQuery(){
        if(this.hasWhere)
            return this._update + this._from + this._set + this._where;
        else
            return this._update + this._from + this._set;
    }
}

module.exports = UpdateQueryBuilder;