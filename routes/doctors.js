const express = require('express');
const router = express.Router();
const {doctors} = require('./../mock-db/index')


/* GET doctors listing. */
router.get('/', function(req, res, next) {
  // usually uses async await because should be async
  const allDoctors = doctors.list();
  res.send(allDoctors);
});

module.exports = router;
