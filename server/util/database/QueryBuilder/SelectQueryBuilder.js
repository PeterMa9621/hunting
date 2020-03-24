const QueryBuilderBase = require('./QueryBuilderBase');

class SelectQueryBuilder extends QueryBuilderBase{

    _select = "SELECT * ";
    _orderBy = "ORDER BY ";

    hasOrderBy = false;

    orderBy(info={}){
        this._orderBy += info.by + " " + info.order;
        this.hasOrderBy = true;
        return this;
    }

    getQuery(){
        let query = this._select + this._from;
        if(this.hasWhere)
            query += this._where;

        if(this.hasOrderBy)
            query += this._orderBy;
        return query;
    }
}

module.exports = SelectQueryBuilder;