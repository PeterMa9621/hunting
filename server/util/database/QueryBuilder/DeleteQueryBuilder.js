const QueryBuilderBase = require('./QueryBuilderBase');

class DeleteQueryBuilder extends QueryBuilderBase{

    _delete = "DELETE ";

    getQuery(){
        if(this.hasWhere)
            return this._delete + this._from + this._where;
        else
            return this._delete + this._from;
    }
}

module.exports = DeleteQueryBuilder;