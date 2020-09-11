CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(40) NOT NULL, 
  email VARCHAR(255) NOT NULL UNIQUE,
  hashed_password BYTEA NOT NULL,
  firstname VARCHAR(40) ,
  lastname VARCHAR(40) ,
  profile_pic VARCHAR(500),
  created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  name VARCHAR(255),
  country VARCHAR(255),
  area DECIMAL,
  output DECIMAL,
  year INT,
  lat DECIMAL,
  lng DECIMAL,
  tracker BOOLEAN,
  path DECIMAL[],
  FOREIGN KEY (user_id) REFERENCES users(id),
  created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
