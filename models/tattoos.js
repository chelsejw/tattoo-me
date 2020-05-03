/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {
    // `dbPoolInstance` is accessible within this function scope

    let getAllTattoos = (callback) => {
        let query = `SELECT tattoos.*, artist_username, artist_displayname FROM tattoos INNER JOIN artists ON tattoos.artist_id = artists.artist_id`;
        dbPoolInstance.query(query, (err, result) => {
                        if (err) {
                          return callback(err, null);
                        } else if (result.rows.length < 1) {
                          return callback(null, null);
                        }
                        return callback(null, result.rows);
        });
    };

    let getOneTattoo = (tattooId, callback) => {
        let query = `SELECT * FROM tattoos WHERE id = ${tattooId}`;
        dbPoolInstance.query(query, (err, result) => {
                        if (err) {
                          return callback(err, null);
                        } else if (result.rows.length < 1) {
                          return callback(null, null);
                        }
                        return callback(null, result.rows[0]);
        });
    };

    let addTattoo = (artistId, imgUrl, callback) => {
        let query = `INSERT INTO tattoos(artist_id, tattoo_img) VALUES (${artistId}, '${imgUrl}') RETURNING *`
        console.log(query)
        dbPoolInstance.query(query, (err, result) => {
                        if (err) {
                          return callback(err, null);
                        } else if (result.rows.length < 1) {
                          return callback(null, null);
                        }
                        return callback(null, result.rows[0]);
        })
    }

    let getTattooById = (tattooId, callback) => {
        let query = `SELECT tattoos.*, artist_username, artist_displayname FROM tattoos INNER JOIN artists ON tattoos.artist_id = artists.artist_id WHERE tattoo_id = ${tattooId}`;
        console.log(query)
        dbPoolInstance.query(query, (err, result) => {
                        if (err) {
                          return callback(err, null);
                        } else if (result.rows.length < 1) {
                          return callback(null, null);
                        }
                        return callback(null, result.rows[0]);
        })
    }


    let getTattoosByHashtag = (hashtagId, callback) => {

        let query = `SELECT hashtag_name, tattoos.*, artist_username, artist_displayname FROM tattoos INNER JOIN artists ON tattoos.artist_id = artists.artist_id INNER JOIN tattoos_hashtags ON tattoos.tattoo_id = tattoos_hashtags.tattoo_id INNER JOIN hashtags ON hashtags.hashtag_id = tattoos_hashtags.hashtag_id WHERE hashtags.hashtag_id =${hashtagId}`;

        dbPoolInstance.query(query, (err, result) => {
                        if (err) {
                return callback(err, null);
            } else if (result.rows.length < 1) {
                return callback(null, null);
            }
            return callback(null, result.rows);
        })
    }

    let getHashtagsByTattooId = (tattooId, callback) => {
 
        let query = `SELECT hashtags.* FROM hashtags INNER JOIN tattoos_hashtags ON hashtags.hashtag_id = tattoos_hashtags.hashtag_id WHERE tattoos_hashtags.tattoo_id = ${tattooId}`;

        dbPoolInstance.query(query, (err, result) => {

            if (err) {
                return callback(err, null)
            } else if (result.rows.length < 1) {
                return callback(null, null)
            }
            return callback(null, result.rows)

        })

    }

    let addHashtagToTattoo = (tattooId, hashtagId, callback) => {

        let query = `INSERT INTO tattoos_hashtags(tattoo_id, hashtag_id) VALUES (${tattooId}, ${hashtagId}) RETURNING *`

        dbPoolInstance.query(query, (err, result) => {
            if (err) {
                return callback(err, null);
            } else if (result.rows.length < 1) {
                return callback(null, null);
            }
            return callback(null, result.rows[0]);


        })
    }

    let getTattoosByArtist = (artistId, callback) => {

        let query = `SELECT * FROM tattoos WHERE artist_id = ${artistId}`;

        dbPoolInstance.query(query, (err, result) => {

            if (err) {
                return callback(err, null);
            } else if (result.rows.length < 1) {
                return callback(null, null);
            }
            return callback(null, result.rows);

        })

    }

    return {
        getAllTattoos: getAllTattoos,
        getOneTattoo: getOneTattoo,
        addTattoo: addTattoo,
        getTattooById: getTattooById,
        getTattoosByHashtag: getTattoosByHashtag,
        getHashtagsByTattooId: getHashtagsByTattooId,
        addHashtagToTattoo: addHashtagToTattoo,
        getTattoosByArtist: getTattoosByArtist
    };
};