/*
 * ===================================================
 * ===================================================
 * ===================================================
 * ===================================================
 * ======             CONFIGURATION          =========
 * ===================================================
 * ===================================================
 * ===================================================
 * ===================================================
 */



const pg = require('pg');
const url = require('url');

var configs;

if( process.env.DATABASE_URL ){

  const params = url.parse(process.env.DATABASE_URL);
  const auth = params.auth.split(':');

  configs = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: {
      rejectUnauthorized: false
    }
  };

}else{
  configs = {
    user: 'chelseaee',
    host: '127.0.0.1',
    database: 'tattoome',
    port: 5432
  };
}


const pool = new pg.Pool(configs);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});



/*
 * ===================================================
 * ===================================================
 * ===================================================
 * ===================================================
 * ======        REQUIRE MODEL FILES         =========
 * ===================================================
 * ===================================================
 * ===================================================
 * ===================================================
 */



const allUsersModel = require("./models/users");
const usersModelObject = allUsersModel(pool);
const allLocationsModel = require("./models/locations");
const locationsModelObject = allLocationsModel(pool);
const allHashtagsModel = require("./models/hashtags");
const hashtagsModelObject = allHashtagsModel(pool);
const allArtistsModel = require("./models/artists");
const artistsModelObject = allArtistsModel(pool);
const allTattoosModel = require(`./models/tattoos`);
const tattoosModelObject = allTattoosModel(pool)
const allLikesFollowsModel = require(`./models/likes-follows`);
const likesFollowsModelObject = allLikesFollowsModel(pool);

/*
 * ===================================================
 * ===================================================
 * ===================================================
 * ===================================================
 * ======          MODULE EXPORTS            =========
 * ===================================================
 * ===================================================
 * ===================================================
 * ===================================================
 */


module.exports = {
  //make queries directly from here
  queryInterface: (text, params, callback) => {
    return pool.query(text, params, callback);
  },

  // get a reference to end the connection pool at server end
  pool: pool,

  /*
   * ADD APP MODELS HERE
   */

  // users: userModelsObject,
  users: usersModelObject,
  locations: locationsModelObject,
  hashtags: hashtagsModelObject,
  artists: artistsModelObject,
  tattoos: tattoosModelObject,
  likesfollows: likesFollowsModelObject
};
