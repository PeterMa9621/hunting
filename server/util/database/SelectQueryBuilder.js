class SelectQueryBuilder {
    query = "";
    _select = "SELECT * ";
    _from = "FROM ";
    _where = " WHERE ";

    hasWhere = false;
    needAnd = false;
    needComma = false;

    constructor() {
    }

    where(condition={}) {
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
    }

    from(tableNames=[]){
        const length = Object.keys(tableNames).length;
        for(let i in tableNames){
            this._from += tableNames[i];
            if(i < length - 1){
                this._from += ', ';
            }
        }
        return this;
    }

    getQuery(){
        if(this.hasWhere)
            return this._select + this._from + this._where;
        else
            return this._select + this._from;
    }
}

module.exports = QueryBuilder;