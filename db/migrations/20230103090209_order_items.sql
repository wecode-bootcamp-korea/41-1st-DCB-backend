-- migrate:up
CREATE TABLE order_items (
  id int NOT NULL AUTO_INCREMENT,
  order_id int NOT NULL,
  item_id int NOT NULL,
  quantity int NOT NULL,
  PRIMARY KEY (id),
  KEY order_id_fk_idx (order_id),
  KEY item_id_fk_idx (item_id),
  CONSTRAINT item_id_fk FOREIGN KEY (item_id) REFERENCES items (id),
  CONSTRAINT order_id_fk FOREIGN KEY (order_id) REFERENCES orders (id)
);

-- migrate:down
DROP TABLE order_items;
