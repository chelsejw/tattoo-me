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
      let query = `SELECT * FROM tattoos WHERE id = ${tattooId}` ;
      dbPoolInstance.query(query, (err, result) => {
        callback(err, result.rows);
      });
    };

  return {
    getAllTattoos: getAllTattoos,
  };
};
