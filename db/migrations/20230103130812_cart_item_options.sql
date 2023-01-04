-- migrate:up
CREATE TABLE cart_item_options (
  id int NOT NULL AUTO_INCREMENT,
  cart_item_id int NOT NULL,
  option_id int NOT NULL,
  PRIMARY KEY (id),
  KEY cart_item_id_fk_idx (cart_item_id),
  KEY option_id_fk_idx (option_id),
  CONSTRAINT cart_item_id_fk FOREIGN KEY (cart_item_id) REFERENCES carts (id),
  CONSTRAINT option_id_fk FOREIGN KEY (option_id) REFERENCES options (id)
) 

-- migrate:down
DROP TABLE cart_item_options;
