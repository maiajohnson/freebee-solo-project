require('dotenv').config();
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require("../modules/authentication-middleware");

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
router.post('/addtrial', rejectUnauthenticated, (req, res) => {
  // POST new trial code here
  console.log(req.body);

  const sqlText = `INSERT INTO "trial_list"
                    ("name", "cost", "expiration_date", "username", "user_id")
                  VALUES
                    ($1, $2, $3, $4, $5);`;

  const sqlParams = [
    req.body.data.name,
    req.body.data.cost,
    req.body.data.expiration_date,
    req.body.data.username,
    req.user.id
  ]
  console.log('sql params are: ', sqlParams);

  pool.query(sqlText, sqlParams)
    .then((dbRes) => {
      res.sendStatus(200);
    })
    .catch(err => {
      res.sendStatus(500);
      console.log('error adding trial', err);
    })

});

module.exports = router;
