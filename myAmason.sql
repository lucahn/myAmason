DROP DATABASE IF EXISTS myAmason_db;
CREATE database myAmason_db;

USE myAmason_db;

CREATE TABLE product (
  id INT AUTO_INCREMENT NOT NULL,
  name VARCHAR(100) NULL,
  department VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  stock INT NULL,

  PRIMARY KEY (id)
);

INSERT INTO product (name, department, price, stock)
VALUES ("apple", "groceries", 1.99, 500);

INSERT INTO product (name, department, price, stock)
VALUES ("banana", "groceries", 0.99, 700);

INSERT INTO product (name, department, price, stock)
VALUES ("beanie", "clothes", 7.99, 250);

INSERT INTO product (name, department, price, stock)
VALUES ("foam finger", "clothes", 14.99, 80);

INSERT INTO product (name, department, price, stock)
VALUES ("oranges", "groceries", 2.99, 500);

INSERT INTO product (name, department, price, stock)
VALUES ("Hamlet", "books", 10.99, 100);

INSERT INTO product (name, department, price, stock)
VALUES ("toaster", "appliances", 29.99, 280);

INSERT INTO product (name, department, price, stock)
VALUES ("blender", "appliances", 39.99, 340);

INSERT INTO product (name, department, price, stock)
VALUES ("tutu", "clothes", 14.99, 240);

INSERT INTO product (name, department, price, stock)
VALUES ("deck", "game", 29.99, 80);

SELECT * FROM product;