-- migrate:up
CREATE TABLE option_categories (
  id int NOT NULL AUTO_INCREMENT,
  category varchar(200) NOT NULL,
  PRIMARY KEY (id)
);

-- migrate:down

DROP TABLE option_categories;