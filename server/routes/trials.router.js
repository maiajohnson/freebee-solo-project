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
  const sqlText = `SELECT * FROM "trial_list"
                    WHERE "user_id" = $1;`;

  const sqlParams = [req.user.id];
  pool.query(sqlText, sqlParams)
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
                    ("name", "cost", "expiration_date", "username", "user_id", "one_week_before", "three_days_before", "one_day_before", "link")
                  VALUES
                    ($1, $2, $3, $4, $5, $6, $7, $8, $9);`;

  const sqlParams = [
    req.body.data.name,
    req.body.data.cost,
    req.body.data.expiration_date,
    req.body.data.username,
    req.user.id,
    req.body.data.one_week_before,
    req.body.data.three_days_before,
    req.body.data.one_day_before,
    req.body.data.link
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
    SET "name" = $1, "cost" = $2, "expiration_date" = $3, "username" = $4, "one_week_before" = $5, "three_days_before" = $6, "one_day_before" = $7, "link" = $8
    WHERE id = $9`;

    const sqlParams = [
      req.body.name,
      req.body.cost,
      req.body.expiration_date,
      req.body.username,
      req.body.one_week_before,
      req.body.three_days_before,
      req.body.one_day_before,
      req.body.link,
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

  const sqlText = `WITH past_trials AS (
                    DELETE FROM "trial_list" 
                    WHERE "id" = $1 AND "user_id" = $2
                    RETURNING *
                    )
                    INSERT INTO "history"
                    SELECT * FROM past_trials;`
  const sqlParams = [req.params.id, req.user.id]
  
  pool.query(sqlText, sqlParams)
    .then((dbRes) => {
      res.send(200);
    })
    .catch((err) => {
      console.log('error deleting trial', err);
    })
});

// Function to send SMS messages
async function checkTrials(req, res) {
  console.log('in checktrials');

  const sqlText = `SELECT * FROM "trial_list" WHERE user_id=$1;`;
  const sqlParams = [req.user.id];

  const dbRes = await pool.query(sqlText, sqlParams);
  res.send(dbRes.rows);

  const trials = dbRes.rows;
  const username = req.user.username;
  const phoneNum = req.user.phone_num;
  const DAY = 1000 * 60 * 60 * 24;
  
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require('twilio')(accountSid, authToken);
  
  for (let i = 0; i < trials.length; i++) {
    let howLongUntilExpiration = new Date(trials[i].expiration_date) - new Date();
    console.log('in trial loop')

    if (trials[i].one_week_before && howLongUntilExpiration <= DAY * 7) {
      client.messages
      .create({
         body: `Hello ${username}, your trial: ${trials[i].name} expires in one week`,
         from: '+15139514646',
         to: `+1${phoneNum}`
       })
      .then(message => {
        console.log(message.body)
      });
    
  } else if (trials[i].three_days_before && howLongUntilExpiration <= DAY * 3) {
    client.messages
      .create({
         body: `Hello ${username}, your trial: ${trials[i].name} expires in 3 days`,
         from: '+15139514646',
         to: `+1${phoneNum}`
       })
      .then(message => {
        console.log(message.body)
      });

  } else if (trials[i].one_day_before && howLongUntilExpiration <= DAY) {
    client.messages
      .create({
         body: `Hello ${username}, your trial: ${trials[i].name} expires tomorrow`,
         from: '+15139514646',
         to: `+1${phoneNum}`
       })
      .then(message => {
        console.log(message.body)
      });
      
  } else {
    console.log("there are no alerts");
  }
    }
  
  }


// POST request to send SMS messages
router.post("/sms", (req,res) => {
  console.log('im in sms post', req.body);
  
  checkTrials(req, res);

})

module.exports = router;
