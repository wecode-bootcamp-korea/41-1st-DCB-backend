-- migrate:up
CREATE TABLE images (
  id int NOT NULL AUTO_INCREMENT,
  item_id int NOT NULL,
  image_url varchar(1000) NOT NULL,
  PRIMARY KEY (id),
  KEY item_id_idx (item_id),
  CONSTRAINT item_id_bla FOREIGN KEY (item_id) REFERENCES items (id)
);

-- migrate:down

DROP TABLE images;