require('dotenv').config();
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET request for past trials
router.get('/', (req,res) => {
    const sqlText = `SELECT * FROM "history";`;
  
    pool.query(sqlText)
    .then((dbRes) => {
      res.send(dbRes.rows);
  
    })
    .catch((err) => {
      console.log('error getting db info', err);
    })
  
  })

module.exports = router;