-- migrate:up
CREATE TABLE carts (
  id int NOT NULL AUTO_INCREMENT,
  quantity int NOT NULL,
  user_id int NOT NULL,
  item_id int NOT NULL,
  PRIMARY KEY (id),
  KEY user_id_idx (user_id),
  KEY item_id_idx (item_id),
  CONSTRAINT item_id FOREIGN KEY (item_id) REFERENCES items (id),
  CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES users (id)
);

-- migrate:down

DROP TABLE carts;