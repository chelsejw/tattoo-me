var multer = require("multer");
var upload = multer({
    dest: "./uploads/"
});

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
    // MULTER


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

    app.get(`/artists/login`, artistControllerCallbacks.getArtistLoginForm);

    app.post(
        "/artists",
        artistControllerCallbacks.addArtist
    );

    app.post('/artists/login', artistControllerCallbacks.authenticateArtist)

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
     *    ALL ROUTES FOR TATTOOS CONTROLLER
     *  =========================================
     *  =========================================
     *  =========================================
     */

    const tattooControllerCallbacks = require("./controllers/tattoos")(
        allModels
    );

    app.get(
        `/tattoos/new`,
        tattooControllerCallbacks.getAddTattooForm
    );

    app.get(`/tattoos/:id`, tattooControllerCallbacks.displayOneTattoo)

    app.post(
        "/tattoos", upload.single("myFile"), tattooControllerCallbacks.addTattoo);

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
        `/logout`,
        userControllerCallbacks.logout
    );

    app.get(
        "/",
        userControllerCallbacks.getHomePage
    );
};