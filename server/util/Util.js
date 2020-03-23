class Util {
    static getMySQLFormatDateTime(){
        const date = new Date();
        return date.toISOString().split('T')[0] + ' ' + date.toTimeString().split(' ')[0];
    }
}

module.exports = Util;