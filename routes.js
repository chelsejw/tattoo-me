module.exports = (app, allModels) => {


    /*
     *  =========================================
     *  =========================================
     *  =========================================
     *  =========================================
     *    ALL ROUTES FOR POKEMON CONTROLLER
     *  =========================================
     *  =========================================
     *  =========================================
     */

    // require the controller

    //ALL USERS 
    const userControllerCallbacks = require('./controllers/users')(allModels);
    app.post(
        "/users",
        userControllerCallbacks.addUser
    );
    app.get("/users/login", userControllerCallbacks.getUserLogin);
    app.post("/users/login", userControllerCallbacks.authenticateUser);
    app.get("/users/register", userControllerCallbacks.getUserRegistrationForm);
    app.get("/", userControllerCallbacks.getHomePage);

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
    app.get(`/search`, artistControllerCallbacks.artistSearch);


    const apiControllerCallbacks = require("./controllers/api")(allModels);


    app.get(
        `/api/artists/location/:locationId`,
        apiControllerCallbacks.getArtistsByLocation
    );
    app.get(`/api/artists/hashtag/:hashtagId`, apiControllerCallbacks.getArtistsByHashtag)
    app.get(`/api/locations`, apiControllerCallbacks.getAllLocations);
    app.get(`/api/hashtags`, apiControllerCallbacks.getAllHashtags);

};