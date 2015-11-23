var express = require('express');
var router = express.Router();
var pg = require('pg');
var util = require('../utils');
var valid = require('../valid');
var sql = require('sql-bricks-postgres');

var default_table = 'diagnosis';

/**
 * Get a list of diagnosis
 */
router.get('/', function (req, res) {
    var sent = false;
    var params = {};
    var param_query = req.query;
    console.log(JSON.stringify(param_query));

    var token = param_query.token;
    if (!token) {
        res.status(499).send('Token is missing');
        sent = true;
    } else {
        params.token = token;
    }

    var chief_complain_id = param_query.chief_complain_id;
    if (chief_complain_id) {
        params.chief_complain_id = chief_complain_id;
    }

    var medication_id = param_query.medication_id;
    if (medication_id) {
        params.medication_id = medication_id;
    }

    var name = param_query.name;
    if (name) {
        params.name = name;
    }

    var sql_query = sql
        .select()
        .from(default_table)
        .where(params)
        .toString();

    var sort_by = param_query.sort_by;
    if (!sort_by) { //Default sort by
        sql_query.orderBy('medication_id');
    } else {    //custom sort by
        //TODO check if custom sort by param is valid
        sql_query.orderBy(sort_by);
    }

    var limit = param_query.limit;
    if (limit) {
        sql_query.limit(limit);
    } else {    //Default limit
        sql_query.limit(100);
    }

    console.log(sql_query);

    if (!sent) {
        res.send('testing stuff');
    }
});

module.exports = router;