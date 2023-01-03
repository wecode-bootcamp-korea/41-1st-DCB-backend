-- migrate:up
CREATE TABLE options (
  id int NOT NULL AUTO_INCREMENT,
  item_id int NOT NULL,
  category_id int NOT NULL,
  content varchar(200) NOT NULL,
  PRIMARY KEY (id),
  KEY item_id_nana_idx (item_id),
  KEY option_id_nana_idx (category_id),
  CONSTRAINT item_id_nana FOREIGN KEY (item_id) REFERENCES items (id),
  CONSTRAINT option_id_nana FOREIGN KEY (category_id) REFERENCES option_categories (id)
);

-- migrate:down

DROP TABLE options;