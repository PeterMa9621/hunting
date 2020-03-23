const QueryBuilderBase = require('./QueryBuilderBase');

class SelectQueryBuilder extends QueryBuilderBase{

    _select = "SELECT * ";

    getQuery(){
        if(this.hasWhere)
            return this._select + this._from + this._where;
        else
            return this._select + this._from;
    }
}

module.exports = SelectQueryBuilder;