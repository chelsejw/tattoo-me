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

};