CREATE TABLE owners (
  id SERIAL PRIMARY KEY,
  username VARCHAR(40) NOT NULL, 
  email VARCHAR(255) NOT NULL UNIQUE,
  hashed BYTEA NOT NULL,
  firstname VARCHAR(40) ,
  lastname VARCHAR(40) ,
  pic VARCHAR(500),
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  owner_id INTEGER NOT NULL,
  name VARCHAR(255),
  country VARCHAR(255),
  area DECIMAL,
  output DECIMAL,
  capacity DECIMAL,
  year INT,
  lat DECIMAL,
  lng DECIMAL,
  station VARCHAR(255),
  tracker BOOLEAN,
  path DECIMAL[],
  FOREIGN KEY (owner_id) REFERENCES owners(id),
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
