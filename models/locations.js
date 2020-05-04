/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {
    // `dbPoolInstance` is accessible within this function scope

    let getAllLocations = (callback) => {
        let query = "SELECT * FROM locations";
        dbPoolInstance.query(query, (err, result) => {
            if (err) {
              return callback(err, null);
            } else if (result.rows.length < 1) {
              return callback(null, null);
            }
            return callback(null, result.rows);

        });
    };

    let getLocationById = (id, callback) => {
        let query = `SELECT * FROM locations WHERE location_id = ${id}`;
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

    return {
        getAllLocations: getAllLocations,
        getLocationById: getLocationById
    };
};