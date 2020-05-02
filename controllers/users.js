module.exports = (db) => {
    /**
     * ===========================================
     * Controller logic
     * ===========================================
     */

    const isLoggedIn = req => {
        console.log(req.cookies.isLoggedIn)
    }

    const resetCookies = (res) => {
        res.cookie(`isLoggedIn`, false);
        res.cookie(`currentUserType`, null);
        res.cookie(`currentAccountId`, null);
        res.cookie(`currentUsername`, null);
        res.cookie(`currentDisplayName`, null);
        res.cookie(`currentLocationId`, null);
    };

    const setUserCookies = (currId, currUsername, currDisName, currLocId, res) => {
        resetCookies(res);
        res.cookie(`isLoggedIn`, true);
        res.cookie(`currentUserType`, "user");
        res.cookie(`currentAccountId`, currId);
        res.cookie(`currentUsername`, currUsername);
        res.cookie(`currentDisplayName`, currDisName);
        res.cookie(`currentLocationId`, currLocId);
    };

    let getLoginFormControllerCallback = (req, res) => {
        res.render("users/login");
    };

    const logoutController = (req, res) => {
        resetCookies(res);
        res.redirect(`/`)
    }

    let getHomePageControllerCallback = (req, res) => {
        isLoggedIn(req);

        let data = {}
        db.locations.getAllLocations((err, result) => {

            if (err) {
                return console.log(`Err when getting all locations`, err);
            }
            data.locations = result;
            db.hashtags.getAllHashtags((err2, result2) => {

                if (err2) {
                    return console.log(`Err when getting all hashtags`, err2);
                }
                data.hashtags = result2;

                res.render("index", data)
            });
        });
    }

    let getUserRegistrationControllerCallback = (req, res) => {
        //GET LOCATIONS DATABASE TO RENDER OPTIONS
        db.locations.getAllLocations((err, result) => {
            err && console.log(`Err getting all locations`, err)
            res.render(`users/register`, {
                locations: result
            })
        })
    };

    const sha256 = require("js-sha256");

    let addUserControllerCallback = (req, res) => {
        let usernameInput = req.body.inputUsername;
        let passwordInput = sha256(req.body.inputPassword);
        let displayNameInput = req.body.inputDisplayName;
        let emailInput = req.body.inputEmail;
        let locationInput = req.body.inputLocation
        let dpUrlInput = req.body.inputImage;

        const afterAddingUser = (err, result) => {
            err ? console.log(err) : console.log(`Successfully added new user.`);
            setCookies(result.user_id, result.username, result.user_displayname, result.location_id, res);
            res.redirect(`/`);
        }

        db.users.addUser(
            usernameInput,
            passwordInput,
            emailInput,
            displayNameInput,
            locationInput,
            dpUrlInput,
            afterAddingUser
        );
    };


    let authenticateUserControllerCallback = (req, res) => {

        const whenModelIsDone = (err, result) => {
            if (err) {
                return res.statusCode(404, `Error is ${err}`);
            }

            setUserCookies(
                result.user_id,
                result.username,
                result.user_displayname,
                result.location_id,
                res
            );

            res.redirect(`/`)
        };


        let handleInput = req.body.handle;
        let hashedPw = sha256(req.body.password);
        db.users.getUserLogin(handleInput, hashedPw, whenModelIsDone);
    };





    /**
     * ===========================================
     * Export controller functions as a module
     * ===========================================
     */
    return {
        getUserRegistrationForm: getUserRegistrationControllerCallback,
        getUserLogin: getLoginFormControllerCallback,
        getHomePage: getHomePageControllerCallback,
        addUser: addUserControllerCallback,
        authenticateUser: authenticateUserControllerCallback,
        logout: logoutController
    };
};