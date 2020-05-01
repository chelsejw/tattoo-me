module.exports = (app, allModels) => {
    /*
     *  =========================================
     *  =========================================
     *  =========================================
     *  =========================================
     *    ALL ROUTES FOR USERS CONTROLLER
     *  =========================================
     *  =========================================
     *  =========================================
     */

    // require the controller

    //ALL USERS
    const userControllerCallbacks = require("./controllers/users")(
        allModels
    );
    app.post(
        "/users",
        userControllerCallbacks.addUser
    );
    app.get(
        "/users/login",
        userControllerCallbacks.getUserLogin
    );
    app.post(
        "/users/login",
        userControllerCallbacks.authenticateUser
    );
    app.get(
        "/users/register",
        userControllerCallbacks.getUserRegistrationForm
    );

    /*
     *  =========================================
     *  =========================================
     *  =========================================
     *  =========================================
     *    ALL ROUTES FOR ARTIST CONTROLLER
     *  =========================================
     *  =========================================
     *  =========================================
     */
    const artistControllerCallbacks = require("./controllers/artists")(
        allModels
    );
    app.post(
        "/artists",
        artistControllerCallbacks.addArtist
    );

    app.get(
        "/artists/register",
        artistControllerCallbacks.getArtistRegistration
    );
    app.get(
        `/artists`,
        artistControllerCallbacks.artistSearch
    );

    /*
     *  =========================================
     *  =========================================
     *  =========================================
     *  =========================================
     *    ALL ROUTES FOR API CONTROLLER
     *  =========================================
     *  =========================================
     *  =========================================
     */
    const apiControllerCallbacks = require("./controllers/api")(
        allModels
    );
    app.get(
        `/api/artists/location/:locationId`,
        apiControllerCallbacks.getArtistsByLocation
    );
    app.get(
        `/api/artists/hashtag/:hashtagId`,
        apiControllerCallbacks.getArtistsByHashtag
    );
    app.get(
        `/api/locations`,
        apiControllerCallbacks.getAllLocations
    );
    app.get(
        `/api/hashtags`,
        apiControllerCallbacks.getAllHashtags
    );

    /*
     *  =========================================
     *  =========================================
     *  =========================================
     *  =========================================
     *    ALL ROUTES FOR HOME CONTROLLER
     *  =========================================
     *  =========================================
     *  =========================================
     */

    app.get(
        "/",
        userControllerCallbacks.getHomePage
    );
};