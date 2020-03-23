class QueryBuilderBase {

    _from = "FROM ";
    _where = "WHERE ";

    hasWhere = false;

    where(condition={}) {
        const length = Object.keys(condition).length;

        if(length > 0){
            let i = 0;
            for(const key in condition){
                this._where += key + " = ?";
                if(i < length - 1)
                    this._where += " AND ";
                else
                    this._where += " ";
                i++;
            }
            this.hasWhere = true;
        }

        return this;
    }

    from(tableNames=[]){
        let tables = null;
        if(Array.isArray(tableNames))
            tables = tableNames;
        else
            tables = [tableNames];

        const length = Object.keys(tables).length;
        for(let i in tables){
            this._from += tables[i];
            if(i < length - 1){
                this._from += ', ';
            } else {
                this._from += ' ';
            }
        }
        return this;
    }
}

module.exports = QueryBuilderBase;