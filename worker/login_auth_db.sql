DROP TABLE IF EXISTS login_auth;

CREATE TABLE login_auth (
    username VARCHAR(50) NOT NULL PRIMARY KEY,
    password VARCHAR(255) NOT NULL
);