-- SQLite
SELECT name, age, breed FROM pets WHERE name = "Chop";


UPDATE pets SET age = 12 WHERE name = "Rose";

DELETE FROM pets WHERE name = "Rose";

INSERT INTO pets(name, age, breed, favorite_treats, image_url, owner_id)
VALUES ("Rose", 8, "poodle", "cheese", "https://roseimages.com/44", 2 );

SELECT * FROM pets WHERE last_fed_at IS NULL;


SELECT pets.name, owners.name as 'owner'
FROM pets
JOIN owners ON pets.owner_id = owners.id;


CREATE TABLE handlers(
  id INTEGER PRIMARY KEY,
  name TEXT,
  email TEXT,
  phone INTEGER
);

DROP Table appointments;

CREATE TABLE appointments(
  id INTEGER PRIMARY KEY,
  purpose TEXT,
  time DATETIME,
  pet_id INTEGER,
  handler_id INTEGER,
  FOREIGN KEY (handler_id) REFERENCES handlers(id),
  FOREIGN KEY (pet_id) REFERENCES pets(id)
  );

INSERT INTO handlers(name, email, phone)
VALUES ("Jake", "j@gmail.com", 1111111111);

INSERT INTO handlers(name, email, phone)
VALUES ("Jane", "j2@gmail.com", 1211111111);

INSERT INTO appointments(time, purpose, pet_id, handler_id)
VALUES ("2023-04-08 00:00:00", "walk", 1, 2);

INSERT INTO appointments(time, purpose, pet_id, handler_id)
VALUES ("2023-04-08 00:00:00", "feed", 3, 2);

INSERT INTO appointments(time, purpose, pet_id, handler_id)
VALUES ("2023-04-08 00:00:00", "walk", 2, 1);

INSERT INTO appointments(time, purpose, pet_id, handler_id)
VALUES ("2023-04-08 00:00:00", "taught how to read", 1, 1);


SELECT pets.name as 'pet', appointments.purpose, appointments.time
FROM appointments
LEFT JOIN pets
  ON appointments.pet_id = pets.id;
JOIN handlers
  ON appointments.handler_id = handlers.id;