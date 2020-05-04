--CREATE USERS_FOLLOWING TBALE--
-- CREATE TABLE IF NOT EXISTS following(
--       user_id INTEGER,
--       artist_id INTEGER,
--       FOREIGN KEY (user_id) REFERENCES users(user_id),
--       FOREIGN KEY (artist_id) REFERENCES artists(artist_id)
-- );

-- CREATE TABLE IF NOT EXISTS likes(
--       user_id INTEGER,
--       tattoo_id INTEGER,
-- FOREIGN KEY
-- (user_id) REFERENCES users
-- (user_id),
--       FOREIGN KEY
-- (tattoo_id) REFERENCES tattoos
-- (tattoo_id)
-- );

--INSERT LIKES AND FOLLOWING--

-- INSERT INTO likes (user_id, tattoo_id) VALUES(4, 34);
-- INSERT INTO likes
--       (user_id, tattoo_id)
-- VALUES(4, 33);
-- INSERT INTO likes
--       (user_id, tattoo_id)
-- VALUES(4, 22);

-- INSERT INTO following (user_id, artist_id) VALUES(4, 12);
-- INSERT INTO following
--       (user_id, artist_id)
-- VALUES(4, 11);