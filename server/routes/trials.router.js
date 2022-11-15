require('dotenv').config();
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET trials data code here
  const sqlText = `SELECT * FROM "trial_list";`;

  pool.query(sqlText)
    .then((dbRes) => {
      res.send(dbRes.rows);
    })
    .catch((err) => {
      console.log('error getting db info', err);
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST new trial code here
});

module.exports = router;
