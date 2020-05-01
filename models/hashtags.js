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
    dbPoolInstance.query(query, (err, result)=> {
      callback(err, result.rows);
    })

  }

  return {
    getAllHashtags: getAllHashtags,
    getHashtagById: getHashtagById,
  };
};
