/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {
    // `dbPoolInstance` is accessible within this function scope

    let getAllTattoos = (callback) => {
        let query = "SELECT * FROM tattoos";
        dbPoolInstance.query(query, (err, result) => {
            callback(err, result.rows);
        });
    };

    let getOneTattoo = (tattooId, callback) => {
        let query = `SELECT * FROM tattoos WHERE id = ${tattooId}`;
        dbPoolInstance.query(query, (err, result) => {
            callback(err, result.rows);
        });
    };

    let addTattoo = (artistId, imgUrl, callback) => {
      let query = `INSERT INTO tattoos(artist_id, tattoo_img) VALUES (${artistId}, '${imgUrl}') RETURNING *`
      console.log(query)
      dbPoolInstance.query(query, (err, result)=> {
        callback(err, result.rows[0]);
      })
    }

    let getTattooById = (tattooId, callback)=> {
      let query = `SELECT tattoos.*, artist_username, artist_displayname FROM tattoos INNER JOIN artists ON tattoos.artist_id = artists.artist_id WHERE tattoo_id = ${tattooId}`;

      dbPoolInstance.query(query, (err, result)=> {
        callback(err, result.rows[0])
      })
    }

    return {
        getAllTattoos: getAllTattoos,
        getOneTattoo: getOneTattoo,
        addTattoo: addTattoo,
        getTattooById: getTattooById
    };
};