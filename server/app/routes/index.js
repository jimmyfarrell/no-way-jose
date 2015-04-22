'use strict';
var router = require('express').Router();
var path = require('path');
module.exports = router;

router.get('/firebase', function(req, res) {
	var FIREBASE_URL = require(path.join(__dirname, '../../env')).FIREBASE_URL;
	res.send(FIREBASE_URL);
});

router.use('/tutorial', require('./tutorial'));
router.use('/members', require('./members'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
