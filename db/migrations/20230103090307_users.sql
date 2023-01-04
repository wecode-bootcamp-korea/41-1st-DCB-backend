-- migrate:up
CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  email varchar(200) NOT NULL,
  password varchar(200) NOT NULL,
  point decimal(10,3) NOT NULL,
  phone_number int DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

-- migrate:down

DROP TABLE users;