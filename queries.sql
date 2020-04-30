SELECT artists.artist_id, artist_username, artist_displayname, artists.location_id, hashtag_name, location_name, email, booking_avail
FROM artists
INNER JOIN locations ON locations.location_id = artists.location_id
INNER JOIN artists_hashtags ON artists.artist_id = artists_hashtags.artist_id
INNER JOIN hashtags ON hashtags.hashtag_id = artists_hashtags.hashtag_id
WHERE hashtags.hashtag_id AND artists.location_id = 4
ORDER BY artist_id ASC