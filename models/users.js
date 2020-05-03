/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {
  // `dbPoolInstance` is accessible within this function scope

  let getAll = (callback) => {
    let query = "SELECT * FROM users ORDER BY user_id ASC";

    dbPoolInstance.query(query, (err, result) => {
      if (err) {
        return callback(err, null);
      } else if (result.rows.length < 1) {
        return callback(null, null);
      }
      return callback(null, result.rows);
    });
  };

  let addUser = (username, user_pw, email, user_displayname, location_id, user_img, callback) => {
    let values = [username, user_pw, email, user_displayname, location_id, user_img];

    let query = `INSERT INTO users(username, user_pw, email,user_displayname, location_id, user_img) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;

    dbPoolInstance.query(query, values, (err, result) => {
            if (err) {
              return callback(err, null);
            } else if (result.rows.length < 1) {
              return callback(null, null);
            }
            return callback(null, result.rows[0]);
    });
  };

  const getUserLogin = (handle, pw, callback) => {
    let query = `SELECT * FROM users WHERE username = '${handle}' AND user_pw = '${pw}'`;

    dbPoolInstance.query(query, (err, result) => {
            if (err) {
              return callback(err, null);
            } else if (result.rows.length < 1) {
              return callback(null, null);
            }
            return callback(null, result.rows[0]);
    });
  };
 
  const getOneUser = (id, callback) => {
    let query = `SELECT * FROM users WHERE user_id = ${id}`;

    dbPoolInstance.query(query, (err, result) => {
            if (err) {
              return callback(err, null);
            } else if (result.rows.length < 1) {
              return callback(null, null);
            }
            return callback(null, result.rows[0]);
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
            if (err) {
              return callback(err, null);
            } else if (result.rows.length < 1) {
              return callback(null, null);
            }
            return callback(null, result.rows[0]);
    });
  };

  return {
    getAll: getAll,
    addUser: addUser,
    getUserLogin: getUserLogin,
    getOneUser: getOneUser,
    updateUser: updateUser,
  };
};
