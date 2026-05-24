DROP TABLE IF EXISTS login_auth;

CREATE TABLE login_auth (
    username VARCHAR(50) NOT NULL PRIMARY KEY,
    password VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS token;

CREATE TABLE token (
    username VARCHAR(50) NOT NULL PRIMARY KEY,
    refresh_token VARCHAR(500) NOT NULL,
    expires_at DATETIME NOT NULL,
    FOREIGN KEY (username) REFERENCES login_auth(username) ON DELETE CASCADE
);