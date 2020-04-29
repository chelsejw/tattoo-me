CREATE TABLE
IF NOT EXISTS locations(
      location_id SERIAL PRIMARY KEY,
      location_name TEXT,
      location_icon TEXT
);


CREATE TABLE IF NOT EXISTS users (
      user_id SERIAL PRIMARY KEY,
      username VARCHAR(15),
      user_pw TEXT,
      user_displayname VARCHAR(25),
      location_id INTEGER,
      user_img TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      FOREIGN KEY (location_id) REFERENCES locations(location_id)
);

CREATE TABLE IF NOT EXISTS artists(
      artist_id SERIAL PRIMARY KEY,
      artist_username VARCHAR (15),
      artist_displayname VARCHAR (25),
      artist_pw TEXT,
      location_id INTEGER,
      email TEXT,
      booking_avail BOOLEAN,
      artist_img TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      FOREIGN KEY
(location_id) REFERENCES locations
(location_id)
);

CREATE TABLE IF NOT EXISTS hashtags(
      hashtag_id SERIAL PRIMARY KEY,
      hashtag_name VARCHAR (25)
);

CREATE TABLE IF NOT EXISTS tattoos(
      tattoo_id SERIAL PRIMARY KEY,
      artist_id INTEGER,
      tattoo_img TEXT,
      created_at TIMESTAMPTZ
NOT NULL DEFAULT NOW
(),
updated_at TIMESTAMPTZ
NOT NULL DEFAULT NOW
(),
FOREIGN KEY (artist_id) REFERENCES artists(artist_id)
);

CREATE TABLE IF NOT EXISTS artists_hashtags(
      ah_id SERIAL PRIMARY KEY,
      artist_id INTEGER,
      hashtag_id INTEGER,
      FOREIGN KEY (artist_id) REFERENCES artists(artist_id),
      FOREIGN KEY (hashtag_id) REFERENCES hashtags(hashtag_id)
);

CREATE TABLE
IF NOT EXISTS tattoos_hashtags
(
      th_id SERIAL PRIMARY KEY,
      tattoo_id INTEGER,
      hashtag_id INTEGER,
      FOREIGN KEY (tattoo_id) REFERENCES tattoos
(tattoo_id),
      FOREIGN KEY (hashtag_id) REFERENCES hashtags
(hashtag_id)
);