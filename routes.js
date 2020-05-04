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

    app.get(
        `/artists/login`,
        artistControllerCallbacks.getArtistLoginForm
    );

    app.post(
        "/artists/login",
        artistControllerCallbacks.authenticateArtist
    );

    app.get(
        "/artists/register",
        artistControllerCallbacks.getArtistRegistration
    );

    app.get(
        `/artists/:artistId`,
        artistControllerCallbacks.showArtistPage
    );
    app.get(
        `/artists`,
        artistControllerCallbacks.artistSearch
    );
    app.put(
        `/artists`,
        upload.single("myFile"),
        artistControllerCallbacks.updateArtistInfo
    );
    app.post(
        `/artists`,
        artistControllerCallbacks.addArtist
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

    app.get(
        `/tattoos`,
        tattooControllerCallbacks.tattooSearchResults
    );
    app.get(
        `/tattoos/:id/edit`,
        tattooControllerCallbacks.getEditTattooForm
    );
    app.put(
        `/tattoos/:id`,
        tattooControllerCallbacks.editTattoo
    );
    app.get(
        `/tattoos/:id`,
        tattooControllerCallbacks.displayOneTattoo
    );
    app.delete(
        `/tattoos/:id`,
        tattooControllerCallbacks.deleteTattoo
    );

    app.post(
        "/tattoos",
        upload.single("myFile"),
        tattooControllerCallbacks.addTattoo
    );

    /*
     *  =========================================
     *  =========================================
     *  =========================================
     *  =========================================
     *    ALL ROUTES FOR HASHTAGS CONTROLLER
     *  =========================================
     *  =========================================
     *  =========================================
     */
    const hashtagsControllerCallbacks = require("./controllers/hashtags")(
        allModels
    );

    app.get(`/hashtags/new`, hashtagsControllerCallbacks.showAddHashtagPage);

    app.post(`/hashtags`, hashtagsControllerCallbacks.addHashtag)

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
        `/tattoos/:tattooId/hashtags`,
        apiControllerCallbacks.getAllHashtagsOfTattooId
    );

    app.get(
        `/api/hashtags/artists/:artistId`,
        apiControllerCallbacks.getAllHashtagsOfArtist
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

    app.get(
        `/api/hashtags/:hashtagId`,
        apiControllerCallbacks.getHashtagNameById
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
    const generalControllerCallbacks = require("./controllers/general")(
        allModels
    );
    app.get(
        `/logout`,
        userControllerCallbacks.logout
    );

    app.get(
        "/",
        userControllerCallbacks.getHomePage
    );

    app.get(
        `/settings/password`,
        generalControllerCallbacks.showPasswordSettings
    );
    app.put(
        `/settings/password`,
        generalControllerCallbacks.updatePassword
    );

    app.get(
        `/settings`,
        generalControllerCallbacks.showSettingsPage
    );

    app.get(
        `*`,
        generalControllerCallbacks.displayErrorPage
    );
};