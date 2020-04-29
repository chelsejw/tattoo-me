module.exports = (db) => {
    /**
     * ===========================================
     * Controller logic
     * ===========================================
     */

    let getLoginFormControllerCallback = (req, res) => {
        res.render("users/login");
    };

    let getHomePageControllerCallback = (req, res) => {
        console.log(`at home page`)
        let data = {}
        db.locations.getAllLocations( (err, result) => {
            console.log(`getting locations...`)

            if (err) {
                return console.log(`Err when getting all locations`, err);
            }

            data.locations = result;
            db.hashtags.getAllHashtags( (err2, result2) => {
            console.log(`getting hashtags...`);

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
            err ? console.log(err) : console.log(`Successfully added new user.`)
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
                res.send(`Query error,`, err);
            } else {
                res.cookie(`currentUserId`, result.user_id);
                res.cookie(`currentUserHandle`, result.username);
                res.cookie(`isLoggedIn`, true);
                res.redirect(`/`);
            }
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
        authenticateUser: authenticateUserControllerCallback
    };
};