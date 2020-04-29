/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {
  // `dbPoolInstance` is accessible within this function scope

  const getAll = (callback) => {
    let query = "SELECT * FROM artists ORDER BY artist_id ASC";

    dbPoolInstance.query(query, (err, result) => {
      callback(err, result);
    });
  };

  const addArtist = (username, displayname, pw, location_id, email, artist_img, callback) => {
    let values = [username, displayname, pw, location_id, email, true, artist_img];

    let query = `INSERT INTO artists(artist_username, artist_displayname, artist_pw, location_id, email, booking_avail, artist_img) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;

    dbPoolInstance.query(query, values, (err, result) => {
      callback(err, result);
    });

  };

 

  return {
    getAll: getAll,
    addArtist: addArtist
  };
};
