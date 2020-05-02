module.exports = (dbPoolInstance) => {
    // `dbPoolInstance` is accessible within this function scope

    let getAllHashtags = (callback) => {
        let query = "SELECT * FROM hashtags";
        dbPoolInstance.query(query, (err, result) => {
            callback(err, result.rows);
        });
    };

    let getHashtagById = (id, callback) => {
        let query = `SELECT * FROM hashtags WHERE hashtag_id = ${id}`;
        dbPoolInstance.query(query, (err, result) => {
            callback(err, result.rows[0]);
        })

    }

    let addHashtagToTattoo = (hashtagId, tattooId, callback) => {

        let query = `INSERT INTO tattoos_hashtags(tattoo_id, hashtag_id) VALUES (${tattooId}, ${hashtagId}) RETURNING *`;

        dbPoolInstance.query(query, (err, result) => {
            if (err) {
                return callback(err, null);
            } else if (result.rows.length < 1) {
                return callback(null, null);
            }
            return callback(null, result.rows);
        });
    }



    return {
        getAllHashtags: getAllHashtags,
        getHashtagById: getHashtagById,
        addHashtagToTattoo: addHashtagToTattoo
    };
};