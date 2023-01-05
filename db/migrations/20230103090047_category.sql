-- migrate:up
CREATE TABLE category (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  PRIMARY KEY (id)
);

-- migrate:down

DROP TABLE category;