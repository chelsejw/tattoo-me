/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {
    // `dbPoolInstance` is accessible within this function scope

    const getAll = (callback) => {
        let query = "SELECT artist_id, artist_username, artist_displayname, artists.location_id, location_name, email, booking_avail FROM artists INNER JOIN locations ON locations.location_id = artists.location_id ORDER BY artist_id ASC";

        dbPoolInstance.query(query, (err, result) => {
            callback(err, result.rows);
        });
    };

    const addArtist = (username, displayname, pw, location_id, email, artist_img, callback) => {
        let values = [username, displayname, pw, location_id, email, true, artist_img];

        console.log(`in model`, location_id)

        let query = `INSERT INTO artists(artist_username, artist_displayname, artist_pw, location_id, email, booking_avail, artist_img) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;

        dbPoolInstance.query(query, (err, result) => {
            //If more than one item is returned
            if (result.rows.length > 1) {
                return callback(err, result.rows);
                //If only one item is returned
            } else if (result.rows.length === 1) {
                return callback(err, result.rows[0]);
            }

            return callback(err, `No results`);
        });

    };


    const getArtistsByLocation = (locationId, callback) => {

        let query =
            `SELECT artists.artist_id, artist_username, artist_displayname, artists.location_id, hashtag_name, location_name, email, booking_avail FROM artists INNER JOIN locations ON locations.location_id = artists.location_id INNER JOIN artists_hashtags ON artists.artist_id = artists_hashtags.artist_id INNER JOIN hashtags ON hashtags.hashtag_id = artists_hashtags.hashtag_id WHERE artists.location_id = ${locationId} ORDER BY artist_id ASC`;

        dbPoolInstance.query(query, (err, result) => {
            //If more than one item is returned
            if (result.rows.length > 1) {
                return callback(err, result.rows);
                //If only one item is returned
            } else if (result.rows.length === 1) {
                return callback(err, [result.rows[0]]);
            }

            return callback(err, `No results`);
        });
    }

    const getArtistsByHashtag = (hashtagId, callback) => {
        let query = `SELECT artists.artist_id, artist_username, artist_displayname, artists.location_id, hashtag_name, location_name, email, booking_avail FROM artists INNER JOIN locations ON locations.location_id = artists.location_id INNER JOIN artists_hashtags ON artists.artist_id = artists_hashtags.artist_id INNER JOIN hashtags ON hashtags.hashtag_id = artists_hashtags.hashtag_id WHERE artists_hashtags.hashtag_id = ${hashtagId} ORDER BY artist_id ASC`;
        dbPoolInstance.query(query, (err, result) => {
            //If more than one item is returned
            if (result.rows.length > 1) {
                return callback(err, result.rows);
                //If only one item is returned
            } else if (result.rows.length === 1) {
                return callback(err, [result.rows[0]]);
            }

            return callback(err, `No results`);
        });
    };

    const getArtistsByHashtagAndLocation = (hashtagId, locationId, callback) => {
        let query = `SELECT artists.artist_id, artist_username, artist_displayname, artists.location_id, hashtag_name, location_name, email, booking_avail FROM artists INNER JOIN locations ON locations.location_id = artists.location_id INNER JOIN artists_hashtags ON artists.artist_id = artists_hashtags.artist_id INNER JOIN hashtags ON hashtags.hashtag_id = artists_hashtags.hashtag_id WHERE artists_hashtags.hashtag_id = ${hashtagId} AND artists.location_id = ${locationId} ORDER BY artist_id ASC`;

        dbPoolInstance.query(query, (err, result) => {

          console.log(result.rows);
            //If more than one item is returned
            if (result.rows.length > 1) {
                return callback(err, result.rows)
                //If only one item is returned
            } else if (result.rows.length === 1) {
                return callback(err, [result.rows[0]])
            }

            return callback(err, `No results`)

        });
    }


    return {
        getAll: getAll,
        addArtist: addArtist,
        getArtistsByLocation: getArtistsByLocation,
        getArtistsByHashtag: getArtistsByHashtag,
        getArtistsByHashtagAndLocation: getArtistsByHashtagAndLocation
    };
};