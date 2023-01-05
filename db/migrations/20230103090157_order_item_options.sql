-- migrate:up
CREATE TABLE order_item_options (
  id int NOT NULL AUTO_INCREMENT,
  order_item_id int NOT NULL,
  option_id int NOT NULL,
  PRIMARY KEY (id),
  KEY order_item_id_idx (order_item_id),
  KEY option_id_blabla_idx (option_id),
  CONSTRAINT option_id_blabla FOREIGN KEY (option_id) REFERENCES options (id),
  CONSTRAINT order_item_id FOREIGN KEY (order_item_id) REFERENCES order_items (id)
);

-- migrate:down
DROP TABLE order_item_options;
