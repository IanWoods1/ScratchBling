CREATE TABLE users
    (username           text     NOT NULL,
     user_password      text     NOT NULL,
     admin              boolean
    PRIMARY KEY (username));