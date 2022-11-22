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
router.post('/', rejectUnauthenticated, (req, res) => {
  // POST new trial code here
  console.log('this is the db info', req.body);

  const sqlText = `INSERT INTO "trial_list"
                    ("name", "cost", "expiration_date", "username", "user_id", "one_week_before", "three_days_before", "one_day_before")
                  VALUES
                    ($1, $2, $3, $4, $5, $6, $7, $8);`;

  const sqlParams = [
    req.body.data.name,
    req.body.data.cost,
    req.body.data.expiration_date,
    req.body.data.username,
    req.user.id,
    req.body.data.one_week_before,
    req.body.data.three_days_before,
    req.body.data.one_day_before
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

//GET specific trial
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const sqlText = `
    SELECT * FROM "trial_list"
    WHERE id = $1
    ORDER BY id ASC;
  `;
  const sqlParams = [id]; // $1 = req.params.id

  console.log(sqlParams);
  pool.query(sqlText, sqlParams)
    .then((dbRes) => {
      res.send(dbRes.rows[0]);
    })
    .catch((err) => {
      console.log(`Error making db query ${sqlText}`, err);
    });
})
// PUT route
router.put('/:id', (req, res) => {
  const sqlText = `
    UPDATE "trial_list"
    SET "name" = $1, "cost" = $2, "expiration_date" = $3, "username" = $4, "one_week_before" = $5, "three_days_before" = $6, "one_day_before" = $7
    WHERE id = $8`;

    const sqlParams = [
      req.body.name,
      req.body.cost,
      req.body.expiration_date,
      req.body.username,
      req.body.one_week_before,
      req.body.three_days_before,
      req.body.one_day_before,
      req.params.id
    ]

    console.log(sqlText, sqlParams);
    pool.query(sqlText, sqlParams)
      .then((dbRes) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log(`Error making database query ${sqlText}`, err);
        res.sendStatus(500);
      })
})

// DELETE route
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  console.log('the user id is currently', req.user.id);

  const sqlText = `DELETE FROM "trial_list" WHERE "id" = $1 AND "user_id" = $2;`
  const sqlParams = [req.params.id, req.user.id]
  
  pool.query(sqlText, sqlParams)
    .then((dbRes) => {
      res.send(200);
    })
    .catch((err) => {
      console.log('error deleting trial', err);
    })
});

router.post("/sms", (req,res) => {
  console.log('im in sms post');
  
  const username = req.user.username;
  const phoneNum = req.user.phone_num;
  console.log(phoneNum);
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require('twilio')(accountSid, authToken);
  
  client.messages
    .create({
       body: `Hello ${username}!`,
       from: '+15139514646',
       to: `+1${phoneNum}`
     })
    .then(message => {
      res.send(message.body)
    });
  
})

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = require('twilio')(accountSid, authToken);

// client.messages
//   .create({
//      body: 'This is another alert',
//      from: '+15139514646',
//      to: '+19185109383'
//    })
//   .then(message => console.log(message.body));

module.exports = router;
