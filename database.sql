
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "phone_num" VARCHAR (12)
);

CREATE TABLE "trial_list" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (255),
    "cost" INT,
    "expiration_date" DATE,
    "username" VARCHAR (255),
    "user_id" INT REFERENCES "user"("id"),
    "one_week_before" BOOLEAN DEFAULT FALSE,
    "three_days_before" BOOLEAN DEFAULT FALSE,
    "one_day_before" BOOLEAN DEFAULT FALSE,
    "link" VARCHAR (255)
);

CREATE TABLE "history" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (255),
    "cost" INT,
    "expiration_date" DATE,
    "username" VARCHAR (255),
    "user_id" INT REFERENCES "user"("id"),
    "one_week_before" BOOLEAN DEFAULT FALSE,
    "three_days_before" BOOLEAN DEFAULT FALSE,
    "one_day_before" BOOLEAN DEFAULT FALSE,
    "link" VARCHAR (255)
);