-- migrate:up
CREATE TABLE order_status (
  id int NOT NULL AUTO_INCREMENT,
  status varchar(100) NOT NULL,
  PRIMARY KEY (id)
);

-- migrate:down

DROP TABLE order_status;