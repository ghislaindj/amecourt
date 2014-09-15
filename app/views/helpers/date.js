var express = require('express'),
    app = express();

var padStr = function(i) {
    return (i < 10) ? "0" + i : "" + i;
}

app.locals.dateToDDMMYYYY = function(dte) {
    if (dte == null)
        return "-";
    return padStr(dte.getDate()) + '/' + padStr(1 + dte.getMonth()) + '/' + padStr(dte.getFullYear());
}