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
        let query = `SELECT * FROM users INNER JOIN locations ON users.location_id = locations.location_id WHERE user_id = ${id}`;

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
      userId,
      username,
      displayName,
      email,
      dpUrl,
      locationId,
      callback
    ) => {

      let query;

      if (dpUrl!==null){
        query = `UPDATE users SET username = '${username}', user_displayname = '${displayName}', user_img = '${dpUrl}', email = '${email}', location_id = ${locationId} WHERE id=${userId} RETURNING *`;
      } else {
        query = `UPDATE users SET username = '${username}', user_displayname = '${displayName}', email = '${email}', location_id = ${locationId} WHERE user_id=${userId} RETURNING *`;
      }

      console.log(`update query!!!!!!!`, query)

      dbPoolInstance.query(query, (err, result) => {
        if (err) {
          return callback(err, null);
        } else if (result.rows.length < 1) {
          return callback(null, null);
        }
        return callback(null, result.rows[0]);
      });
    };

    const changeUserPassword = (userId, newPassword, callback) => {
        let query = `UPDATE users SET user_pw = '${newPassword}' WHERE user_id = ${userId} RETURNING *`;

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
        changeUserPassword: changeUserPassword
    };
};