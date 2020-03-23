class QueryBuilder {
    query = "";
    _select = "SELECT * ";
    _from = "FROM ";
    _where = " WHERE ";

    hasWhere = false;

    constructor() {
    }
}

QueryBuilder.prototype.where = function(condition={}){
    // Do something
};

QueryBuilder.prototype.from = function(tableNames=[]){
    // Do something
};

QueryBuilder.prototype.getQuery = function(){
    // Do something
};

module.exports = QueryBuilder;