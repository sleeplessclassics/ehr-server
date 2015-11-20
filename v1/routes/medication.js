var express = require('express');
var router = express.Router();
var sql = require('sql-bricks-postgres');
var default_table = 'medication';

/**
 * get a list of medications
 */
router.get('/', function (req, res) {
    var sent = false;
    var params = {};
    var param_query = req.query;
    console.log(JSON.stringify(param_query));

    var token = param_query.token;
    if (!token) {
        res.status(401).send('Token is missing');
        sent = true;
    } else {
        params.token = token;
    }

    var diagnosis_id = param_query.diagnosis_id;
    if (diagnosis_id) {
        params.diagnosis_id = diagnosis_id;
    }

    var name = param_query.name;
    if (name) {
        params.name = name;
    }

    var form = param_query.form;
    if (form) {
        params.form = form;
    }

    var dosage = param_query.dosage;
    if (dosage) {
        params.dosage = dosage;
    }

    var concentration = param_query.concentration;
    if (concentration) {
        params.concentration = concentration;
    }

    var sql_query = sql
        .select()
        .from(default_table)
        .where(params)
        .toString();

    var limit = param_query.limit;
    if (limit) {
        sql_query.limit(limit);
    }

    var offset = param_query.offset;
    if (offset) {
        sql_query.offset(offset);
    }

    var sort_by = param_query.sort_by;
    if (!sort_by) { //Default sort by
        sql_query.orderBy(medication_id);
    } else {    //custom sort by
        //TODO check if custom sort by param is valid
        sql_query.orderBy(sort_by);
    }

    console.log(sql_query);

    if (!sent) {
        res.send('testing stuff');
    }

});

/**
 * get a medication by id
 */
router.get('/:id', function (req, res) {
    var sent = false;
    var params = {};
    var param_query = req.query;
    console.log(JSON.stringify(param_query));

    var user_id = req.params.id;
    params.user_id = user_id;
    var token = param_query.token;
    if (!token) {
        res.status(401).send('Token is missing');
        sent = true;
    } else {
        params.token = token;
    }

    var sql_query = sql
        .select()
        .from(default_table)
        .where(params)
        .toString();

    console.log(sql_query);

    if (!sent) {
        res.send('testing stuff');
    }

});

module.exports = router;