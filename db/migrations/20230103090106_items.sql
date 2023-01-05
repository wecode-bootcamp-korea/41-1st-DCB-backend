-- migrate:up
CREATE TABLE items (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  thumbnail varchar(500) NOT NULL,
  price decimal(10,3) NOT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  category_id int NOT NULL,
  contents varchar(500) DEFAULT NULL,
  descriptions varchar(1500) DEFAULT NULL,
  brand_id int DEFAULT NULL,
  PRIMARY KEY (id),
  KEY item_category_id_idx (category_id),
  KEY brand_id_fk_idx (brand_id),
  CONSTRAINT brand_id_fk FOREIGN KEY (brand_id) REFERENCES brands (id),
  CONSTRAINT item_category_id FOREIGN KEY (category_id) REFERENCES category (id)
);

-- migrate:down
DROP TABLE items;
