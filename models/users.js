/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {
  // `dbPoolInstance` is accessible within this function scope

  let getAll = (callback) => {
    let query = "SELECT * FROM users ORDER BY user_id ASC";

    dbPoolInstance.query(query, (error, queryResult) => {
      if (error) {
        // invoke callback function with results after query has executed
        callback(error, null);
      } else {
        // invoke callback function with results after query has executed
        if (queryResult.rows.length > 0) {
          callback(null, queryResult.rows);
        } else {
          callback(null, null);
        }
      }
    });
  };

  let addUser = (username, user_pw, email, user_displayname, location_id, user_img, callback) => {
    let values = [username, user_pw, email, user_displayname, location_id, user_img];

    let query = `INSERT INTO users(username, user_pw, email,user_displayname, location_id, user_img) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;

    dbPoolInstance.query(query, values, (err, result) => {
      callback(err, result);
    });
  };

  const getUserLogin = (handle, pw, callback) => {
    let query = `SELECT * FROM users WHERE handle = '${handle}' AND hashed_pw = '${pw}'`;

    dbPoolInstance.query(query, (err, result) => {
      callback(err, result.rows[0]);
    });
  };

  const getCurrentUserDetails = (id, callback) => {
    let query = `SELECT * FROM users WHERE user_id = ${id}`;

    dbPoolInstance.query(query, (err, result) => {
      callback(err, result.rows[0]);
    });
  };


 
  const getOneUser = (id, callback) => {
    let query = `SELECT * FROM users WHERE user_id = ${id}`;

    dbPoolInstance.query(query, (err, result) => {
      callback(err, result.rows[0]);
    });
  };

  const updateUser = (
    currentUserId,
    handle,
    displayName,
    dpUrl,
    hashedPw,
    callback
  ) => {
    let query = `UPDATE users SET handle = '${handle}', display_name = '${displayName}',dp_url = '${dpUrl}', hashed_pw = '${hashedPw}' WHERE id=${currentUserId} RETURNING *`;

    dbPoolInstance.query(query, (err, result) => {
      callback(err, result.rows[0]);
    });
  };

  return {
    getAll: getAll,
    addUser: addUser,
    getUserLogin: getUserLogin,
    getCurrentUserDetails: getCurrentUserDetails,
    getOneUser: getOneUser,
    updateUser: updateUser,
  };
};
