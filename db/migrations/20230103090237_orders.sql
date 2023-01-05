-- migrate:up
CREATE TABLE orders (
  id int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  status_id int DEFAULT NULL,
  order_number varchar(100) DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY order_number_UNIQUE (order_number),
  KEY user_id_idx (user_id),
  KEY status_id_fk_idx (status_id),
  CONSTRAINT status_id_fk FOREIGN KEY (status_id) REFERENCES order_status (id),
  CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES users (id)
);

-- migrate:down

DROP TABLE orders;