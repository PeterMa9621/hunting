class SelectQueryBuilder {
    query = "";
    _select = "SELECT * ";
    _from = "FROM ";
    _where = " WHERE ";

    hasWhere = false;
}

SelectQueryBuilder.prototype.where = function where(condition={}) {
    const length = Object.keys(condition).length;

    if(length !== 0){
        let i = 0;
        for(const key in condition){
            this._where += key + " = '" + condition[key] + "'";
            if(i < length - 1)
                this._where += " AND ";
            i++;
        }
        this.hasWhere = true;
    }

    return this;
};

SelectQueryBuilder.prototype.from = function from(tableNames=[]){
    const length = Object.keys(tableNames).length;
    for(let i in tableNames){
        this._from += tableNames[i];
        if(i < length - 1){
            this._from += ', ';
        }
    }
    return this;
};

SelectQueryBuilder.prototype.getQuery = function getQuery(){
    if(this.hasWhere)
        return this._select + this._from + this._where;
    else
        return this._select + this._from;
};

module.exports = SelectQueryBuilder;