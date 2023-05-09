-- SQLite
CREATE TABLE owners(
  id INTEGER PRIMARY KEY,
  name TEXT,
  address TEXT,
  email TEXT,
  phone INTEGER
);

CREATE TABLE pets(
  id INTEGER PRIMARY KEY,
  name TEXT,
  owner_id INTEGER,
  birthdate INTEGER,
  breed TEXT,
  favorite_treats TEXT,
  last_fed_at DATETIME,
  FOREIGN KEY (owner_id) REFERENCES owners(id)
);

ALTER TABLE pets ADD COLUMN image_url TEXT;

ALTER TABLE pets RENAME COLUMN birthdate TO age;

INSERT INTO owners(name, address, email, phone)
VALUES ("Morgan", "123 St", "m@gmail.com", 5555555555 );

INSERT INTO owners(name, address, email, phone)
VALUES ("A", "144 St", "a@gmail.com", 5555555555 );


INSERT INTO pets(name, age, breed, favorite_treats, image_url, owner_id)
VALUES ("Luke", 2, "domestic longhair", "headphones", "https://lukeimages.com/3", 1 );

INSERT INTO pets(name, age, breed, favorite_treats, image_url, owner_id)
VALUES ("Rose", 8, "poodle", "cheese", "https://roseimages.com/44", 2 );

INSERT INTO pets(name, age, breed, favorite_treats, image_url, owner_id)
VALUES ("Chop", 5, "golden retriever", "cheese", "https://chopimages.com/41", 1 );


SELECT name, age, breed FROM pets WHERE age > 3;

SELECT name, age, breed FROM pets WHERE name = "Chop";