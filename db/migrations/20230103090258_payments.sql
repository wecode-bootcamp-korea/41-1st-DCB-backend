-- migrate:up
CREATE TABLE payments (
  id int NOT NULL AUTO_INCREMENT,
  order_id int NOT NULL,
  total_price int NOT NULL,
  method_id int DEFAULT NULL,
  PRIMARY KEY (id),
  KEY order_id_idx (order_id),
  KEY method_id_fk_idx (method_id),
  CONSTRAINT method_id_fk FOREIGN KEY (method_id) REFERENCES payment_methods (id),
  CONSTRAINT order_id FOREIGN KEY (order_id) REFERENCES orders (id)
);

-- migrate:down
DROP TABLE payments;
