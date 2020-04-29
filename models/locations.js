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
            callback(err, result.rows);
        });
    };

    return {
      getAllLocations: getAllLocations,
    };
};