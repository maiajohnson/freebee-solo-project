
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
    "user_id" INT,
    CONSTRAINT fk_"user"
        FOREIGN KEY("user_id")
            REFERENCES "user"("id")
            ON DELETE SET NULL
);