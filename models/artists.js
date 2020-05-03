/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {
    // `dbPoolInstance` is accessible within this function scope

    const getAll = (callback) => {
        let query =
          "SELECT * FROM artists INNER JOIN locations ON locations.location_id = artists.location_id ORDER BY artists.artist_id ASC";

        dbPoolInstance.query(query, (err, result) => {
            if (err) {
                return callback(err, null)
            } else if (result.rows.length < 1) {
                return callback(null, null)
            }
            console.log(`in model`)
            console.log(query)
            console.log(result.rows)
            return callback(null, result.rows)
        });
    };

    const addArtist = (username, displayname, pw, location_id, email, artist_img, callback) => {
        let values = [username, displayname, pw, location_id, email, true, artist_img];

        let query = `INSERT INTO artists(artist_username, artist_displayname, artist_pw, location_id, email, booking_avail, artist_img) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;

        dbPoolInstance.query(query, values, (err, result) => {
            if (err) {
                return callback(err, null)
            } else if (result.rows.length < 1) {
                return callback(null, null)
            }
            return callback(null, result.rows)
        });

    };

    const updateArtist = (artistId, username, displayname, location_id, email, callback) => {

        let query = `UPDATE artists SET artist_username = '${username}', artist_displayname='${displayname}', location_id = ${location_id}, email = '${email}' WHERE artist_id = ${artistId} RETURNING *`;

        console.log(query)

        dbPoolInstance.query(query, (err, result) => {
            if (err) {
                return callback(err, null)
            } else if (result.rows.length < 1) {
                return callback(null, null)
            }
            return callback(null, result.rows)
        });
    };


    const getArtistsByLocation = (locationId, callback) => {

        let query = `SELECT artists.artist_id, artist_username, artists.artist_img, artist_displayname, artists.location_id, location_name, email, booking_avail, created_at FROM artists INNER JOIN locations ON locations.location_id = artists.location_id WHERE artists.location_id = ${locationId} ORDER BY artist_id ASC`;

        dbPoolInstance.query(query, (err, result) => {
            if (err) {
                return callback(err, null)
            } else if (result.rows.length < 1) {
                return callback(null, null)
            }
            return callback(null, result.rows)
        });
    }

    const getArtistsByHashtag = (hashtagId, callback) => {
        let query = `SELECT artists.artist_id, artists.artist_img, artist_username, artist_displayname, artists.location_id, location_name, email, booking_avail, artists.created_at FROM artists INNER JOIN locations ON locations.location_id = artists.location_id INNER JOIN artists_hashtags ON artists.artist_id = artists_hashtags.artist_id WHERE artists_hashtags.hashtag_id = ${hashtagId} ORDER BY artist_id ASC`;
        dbPoolInstance.query(query, (err, result) => {
            if (err) {
                return callback(err, null)
            } else if (result.rows.length < 1) {
                return callback(null, null)
            }
            return callback(null, result.rows)
        });
    }

    const getArtistsByHashtagAndLocation = (hashtagId, locationId, callback) => {
        let query = `SELECT artists.artist_id, artists.artist_img, artist_username, artist_displayname, artists.location_id, location_name, email, booking_avail, artists.created_at FROM artists INNER JOIN locations ON locations.location_id = artists.location_id INNER JOIN artists_hashtags ON artists.artist_id = artists_hashtags.artist_id INNER JOIN hashtags ON hashtags.hashtag_id = artists_hashtags.hashtag_id WHERE artists_hashtags.hashtag_id = ${hashtagId} AND artists.location_id = ${locationId} ORDER BY artist_id ASC`;

        console.log(query);
        dbPoolInstance.query(query, (err, result) => {
            if (err) {
                return callback(err, null);
            } else if (result.rows.length < 1) {
                return callback(null, null);
            }
            return callback(null, result.rows);

        });
    }

    const getArtistLogin = (handle, pw, callback) => {
        let query = `SELECT * FROM artists WHERE artist_username = '${handle}' AND artist_pw = '${pw}'`;
        console.log(query)
        dbPoolInstance.query(query, (err, result) => {
            if (err) {
                return callback(err, null);
            } else if (result.rows.length < 1) {
                return callback(null, null);
            }
            return callback(null, result.rows[0]);
        });
    };


    const getArtistById = (artistId, callback) => {

        let query = `SELECT artists.artist_id, artists.email, artists.artist_username, artists.artist_displayname, artists.artist_img, artists.created_at, artists.booking_avail, artists.location_id, artists.created_at, artists.updated_at FROM artists WHERE artist_id = ${artistId}`;

        dbPoolInstance.query(query, (err, result) => {
            if (err) {
                return callback(err, null);
            } else if (result.rows.length < 1) {
                return callback(null, null);
            }
            return callback(null, result.rows[0]);
        })

    }



    return {
        getAll: getAll,
        addArtist: addArtist,
        getArtistsByLocation: getArtistsByLocation,
        getArtistsByHashtag: getArtistsByHashtag,
        getArtistsByHashtagAndLocation: getArtistsByHashtagAndLocation,
        getArtistLogin: getArtistLogin,
        getArtistById: getArtistById,
        updateArtist: updateArtist
    };
};