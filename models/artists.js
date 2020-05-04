/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {
    // `dbPoolInstance` is accessible within this function scope

    const getAll = (sortBy, callback) => {
        console.log(sortBy)

        let sortQuery = `artist_id DESC`;
        switch (sortBy) {
            case "created_desc":
                sortQuery = `artists.created_at DESC`;
                break;
            case "created_asc":
                sortQuery = `artists.created_at ASC`;
                break;
            case "name_asc":
                sortQuery = `artists.artist_username ASC`;
                break;
            case "name_desc":
                sortQuery = `artists.artist_username DESC`;
                break;
            default:
                sortQuery = `artist_id DESC`;
                break;
        }
        let query =
            `SELECT * FROM artists INNER JOIN locations ON locations.location_id = artists.location_id ORDER BY ${sortQuery}`;

        dbPoolInstance.query(query, (err, result) => {
            if (err) {
                return callback(err, null)
            } else if (result.rows.length < 1) {
                return callback(null, null)
            }
            return callback(null, result.rows)
        });
    };

    const addArtist = (username, displayname, pw, location_id, email, artist_img, website, callback) => {
        let values = [username, displayname, pw, location_id, email, true, artist_img, website];

        let query = `INSERT INTO artists(artist_username, artist_displayname, artist_pw, location_id, email, booking_avail, artist_img, website) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;

        dbPoolInstance.query(query, values, (err, result) => {
            if (err) {
                return callback(err, null)
            } else if (result.rows.length < 1) {
                return callback(null, null)
            }
            return callback(null, result.rows[0])
        });

    };

    const updateArtist = (artistId, username, displayname, location_id, email, availability, image, website, callback) => {

        //If there's no image. 
        if (!image) {

            let query = `UPDATE artists SET artist_username = '${username}', artist_displayname='${displayname}', location_id = ${location_id}, email = '${email}', booking_avail = ${availability}, website = '${website}' WHERE artist_id = ${artistId} RETURNING *`;

            console.log(query)
            return dbPoolInstance.query(query, (err, result) => {
                if (err) {
                    return callback(err, null);
                } else if (result.rows.length < 1) {
                    return callback(null, null);
                }
                return callback(null, result.rows[0]);
            });
        }

        //If there is an image. 
        let query = `UPDATE artists SET artist_username = '${username}', artist_displayname='${displayname}', location_id = ${location_id}, email = '${email}', booking_avail = ${availability}, website = '${website}', artist_img = '${image}' WHERE artist_id = ${artistId} RETURNING *`;
        console.log(` image query:`, query);

        dbPoolInstance.query(query, (err, result) => {
            if (err) {
                return callback(err, null)
            } else if (result.rows.length < 1) {
                return callback(null, null)
            }
            return callback(null, result.rows[0])
        });
    };

    const changeArtistPassword = (artistId, newPassword, callback) => {

        let query = `UPDATE artists SET artist_pw = '${newPassword}' WHERE artist_id = ${artistId} RETURNING *`

        dbPoolInstance.query(query, (err, result) => {
            if (err) {
                return callback(err, null);
            } else if (result.rows.length < 1) {
                return callback(null, null);
            }
            return callback(null, result.rows[0]);
        });
    };


    const getArtistsByLocation = (sortBy, locationId, callback) => {

        let sortQuery = `artist_id DESC`;
        switch (sortBy) {
            case "created_desc":
                sortQuery = `artists.created_at DESC`;
                break;
            case "created_asc":
                sortQuery = `artists.created_at ASC`;
                break;
            case "name_asc":
                sortQuery = `artists.artist_username ASC`;
                break;
            case "name_desc":
                sortQuery = `artists.artist_username DESC`;
                break;
            default:
                sortQuery = `artist_id DESC`;
                break;
        }

        let query = `SELECT artists.artist_id, website, artist_username, artists.artist_img, artist_displayname, artists.location_id, location_name, email, booking_avail, created_at FROM artists INNER JOIN locations ON locations.location_id = artists.location_id WHERE artists.location_id = ${locationId} ORDER BY ${sortQuery}`;

        dbPoolInstance.query(query, (err, result) => {
            if (err) {
                return callback(err, null)
            } else if (result.rows.length < 1) {
                return callback(null, null)
            }
            return callback(null, result.rows)
        });
    }

    const getArtistsByHashtag = (sortBy, hashtagId, callback) => {

        let sortQuery = `artist_id DESC`;
        switch (sortBy) {
            case "created_desc":
                sortQuery = `artists.created_at DESC`;
                break;
            case "created_asc":
                sortQuery = `artists.created_at ASC`;
                break;
            case "name_asc":
                sortQuery = `artists.artist_username ASC`;
                break;
            case "name_desc":
                sortQuery = `artists.artist_username DESC`;
                break;
            default:
                sortQuery = `artist_id DESC`;
                break;
        }
        let query = `SELECT artists.artist_id, website, artists.artist_img, artist_username, artist_displayname, artists.location_id, location_name, email, booking_avail, artists.created_at FROM artists INNER JOIN locations ON locations.location_id = artists.location_id INNER JOIN artists_hashtags ON artists.artist_id = artists_hashtags.artist_id WHERE artists_hashtags.hashtag_id = ${hashtagId} ORDER BY ${sortQuery}`;
        dbPoolInstance.query(query, (err, result) => {
            if (err) {
                return callback(err, null)
            } else if (result.rows.length < 1) {
                return callback(null, null)
            }
            return callback(null, result.rows)
        });
    }

    const getArtistsByHashtagAndLocation = (sortBy, hashtagId, locationId, callback) => {

        let sortQuery = `artist_id DESC`;
        switch (sortBy) {
            case "created_desc":
                sortQuery = `artists.created_at DESC`;
                break;
            case "created_asc":
                sortQuery = `artists.created_at ASC`;
                break;
            default:
                sortQuery = `artist_id DESC`;
                break;
        }
        let query = `SELECT artists.artist_id, website, artists.artist_img, artist_username, artist_displayname, artists.location_id, location_name, email, booking_avail, artists.created_at FROM artists INNER JOIN locations ON locations.location_id = artists.location_id INNER JOIN artists_hashtags ON artists.artist_id = artists_hashtags.artist_id INNER JOIN hashtags ON hashtags.hashtag_id = artists_hashtags.hashtag_id WHERE artists_hashtags.hashtag_id = ${hashtagId} AND artists.location_id = ${locationId} ORDER BY ${sortQuery}`;
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

        let query = `SELECT artists.artist_id, artists.email, website, artists.artist_username, artists.artist_displayname, artists.artist_img, artists.created_at, artists.booking_avail, artists.location_id, artists.created_at, artists.updated_at, location_name FROM artists INNER JOIN locations ON artists.location_id = locations.location_id WHERE artist_id = ${artistId}`;

        dbPoolInstance.query(query, (err, result) => {
            if (err) {
                return callback(err, null);
            } else if (result.rows.length < 1) {
                return callback(null, null);
            }
            return callback(null, result.rows[0]);
        })

    }

    const getArtistByUsername = (usernameQuery, callback) => {

        let query = `SELECT * FROM artists WHERE artists.artist_username = '${usernameQuery}'`;

        dbPoolInstance.query(query, (err, result) => {
            if (err) {
                return callback(err, null);
            } else if (result.rows.length < 1) {
                return callback(null, null);
            }
            return callback(null, result.rows[0]);
        });
    }

    const deleteAllArtistHashtags = (artistId, callback) => {

        let query = `DELETE FROM artists_hashtags WHERE artist_id = ${artistId}`;

        dbPoolInstance.query(query, (err, result) => {
            if (err) {
                return callback(err, null);
            } else if (result.rows.length < 1) {
                return callback(null, null);
            }
            return callback(null, result.rows[0]);
        });

    }



    return {
        getAll: getAll,
        addArtist: addArtist,
        getArtistsByLocation: getArtistsByLocation,
        getArtistsByHashtag: getArtistsByHashtag,
        getArtistsByHashtagAndLocation: getArtistsByHashtagAndLocation,
        getArtistLogin: getArtistLogin,
        getArtistById: getArtistById,
        updateArtist: updateArtist,
        changeArtistPassword: changeArtistPassword,
        getArtistByUsername: getArtistByUsername,
        deleteAllArtistHashtags: deleteAllArtistHashtags
    };
};