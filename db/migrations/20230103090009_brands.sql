-- migrate:up
CREATE TABLE brands (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(200) NOT NULL,
  PRIMARY KEY (id)
);

-- migrate:down
DROP TABLE brands;