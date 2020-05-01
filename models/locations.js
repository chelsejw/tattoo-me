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
            if (!result) {
                return callback(err, `No results`);
            }

            //If more than one item is returned
            if (result.rows.length > 1) {
                return callback(err, result.rows);
                //If only one item is returned
            } else if (result.rows.length === 1) {
                return callback(err, [result.rows[0]]);
            }

        });
    };

    let getLocationById = (id, callback) => {
        let query = `SELECT * FROM locations WHERE location_id = ${id}`;

        dbPoolInstance.query(query, (err, result) => {
            if (!result) {
                return callback(err, `No results`);
            }

            //If more than one item is returned
            if (result.rows.length > 1) {
                return callback(err, result.rows);
                //If only one item is returned
            } else if (result.rows.length === 1) {
                return callback(err, [result.rows[0]]);
            }

        })
    }

    return {
        getAllLocations: getAllLocations,
        getLocationById: getLocationById
    };
};