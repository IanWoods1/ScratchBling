CREATE TABLE users
    (username           text     NOT NULL,
     password      text     NOT NULL,
     admin              boolean,
    PRIMARY KEY (username));