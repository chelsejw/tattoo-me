module.exports = (dbPoolInstance) => {
    // `dbPoolInstance` is accessible within this function scope

    let likeTattoo = (tattooId, userId, callback) => {
        let query = `INSERT INTO likes(user_id, tattoo_id) VALUES (${userId}, ${tattooId} RETURNING *)`;
        dbPoolInstance.query(query, (err, result) => {
            if (err) {
                return callback(err, null);
            } else if (result.rows.length < 1) {
                return callback(null, null);
            }
            return callback(null, result.rows[0]);
        });
    };


    let unlikeTattoo = (tattooId, userId, callback) => {
        let query = `DELETE FROM likes WHERE user_id=${userId} AND tattoo_id=${tattooId})`;
        dbPoolInstance.query(query, (err, result) => {
            if (err) {
                return callback(err, null);
            } else if (result.rows.length < 1) {
                return callback(null, null);
            }
            return callback(null, null);
        });
    };

    let getUsersLikes = (userId, callback) => {
        let query = `SELECT * FROM likes INNER JOIN tattoos ON likes.tattoo_id=tattoos.tattoo_id INNER JOIN artists ON artists.artist_id = tattoos.artist_id WHERE likes.user_id = ${userId}`;

        console.log(query)
        dbPoolInstance.query(query, (err, result) => {
            if (err) {
                return callback(err, null);
            } else if (result.rows.length < 1) {
                return callback(null, null);
            }
            return callback(null, result.rows);
        });
    };

    let followArtist = (userId, artistId, callback) => {
        let query = `INSERT INTO following(user_id, artist_id) VALUES(${userId}, ${artistId}) RETURNING *`;
        dbPoolInstance.query(query, (err, result) => {
            if (err) {
                return callback(err, null);
            } else if (result.rows.length < 1) {
                return callback(null, null);
            }
            return callback(null, result.rows[0]);
        });
    }

    let unfollowArtist = (userId, artistId, callback) => {
        let query = `DELETE FROM following WHERE user_id = ${userId} AND artist_id = ${artistId}`;
        dbPoolInstance.query(query, (err, result) => {
            if (err) {
                return callback(err, null);
            } else if (result.rows.length < 1) {
                return callback(null, null);
            }
            return callback(null, result.rows);
        });
    };

    let getUsersFollowing = (userId, callback) => {
        let query = `SELECT * FROM artists INNER JOIN following ON artists.artist_id = following.artist_id WHERE following.user_id = ${userId}`;
        dbPoolInstance.query(query, (err, result) => {
            if (err) {
                return callback(err, null);
            } else if (result.rows.length < 1) {
                return callback(null, null);
            }
            return callback(null, result.rows);
        });
    }

    let checkIfFollowing = (userId, artistId, callback) => {

        let query = `SELECT * FROM following WHERE user_id = ${userId} AND artist_id = ${artistId}`
        dbPoolInstance.query(query, (err, result) => {
            if (err) {
                return callback(err, null);
            } else if (result.rows.length < 1) {
                return callback(null, null);
            }
            return callback(null, result.rows[0]);
        });
    }

    let checkIfLiked = (userId, tattooId, callback) => {

        let query = `SELECT * FROM likes WHERE user_id = ${userId} AND tattoo_id = ${tattooId}`;
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
        likeTattoo: likeTattoo,
        unlikeTattoo: unlikeTattoo,
        followArtist: followArtist,
        unfollowArtist: unfollowArtist,
        getUsersFollowing: getUsersFollowing,
        getUsersLikes: getUsersLikes,
        checkIfFollowing: checkIfFollowing,
        checkIfLiked: checkIfLiked
    };
};