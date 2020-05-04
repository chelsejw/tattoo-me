require("dotenv").config();

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dwbuqa4dx",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

var multer = require("multer");


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
        let data = {};
        data.loginData = req.cookies;
        res.render("users/login", data);
    };

    const logoutController = (req, res) => {
        resetCookies(res);
        res.redirect(`/`)
    }

    let getHomePageControllerCallback = (req, res) => {
        isLoggedIn(req);
        let data = {}
        data.loginData = req.cookies;
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

                console.log(`Data at the end`, data);

                res.render("index", data)
            });
        });
    }

    let getUserRegistrationControllerCallback = (req, res) => {
        let data = {};
        data.loginData = req.cookies;
        //GET LOCATIONS DATABASE TO RENDER OPTIONS
        db.locations.getAllLocations((err, result) => {
            err && console.log(`Err getting all locations`, err)
            data.locations = result
            res.render(`users/register`, data)
        })
    };

    const sha256 = require("js-sha256");

    let addUserControllerCallback = (req, res) => {
        let usernameInput = req.body.inputUsername;
        let passwordInput = sha256(req.body.inputPassword);
        let displayNameInput = req.body.inputDisplayName;
        let emailInput = req.body.inputEmail;
        let locationInput = req.body.inputLocation

        const afterAddingUser = (err, result) => {
            err ? console.log(err) : console.log(`Successfully added new user.`);
            setUserCookies(result.user_id, result.username, result.user_displayname, result.location_id, res);
            res.redirect(`/`);
        }

        console.log(`reqbody is`, req.body);
        console.log(`reqfile is`, req.file)
        const path = req.file.path;
        const uniqueFilename = `profileimg_${new Date().toISOString()}`;

        cloudinary.uploader.upload(
            path, {
                public_id: `profileimg/${uniqueFilename}`,
                tags: `profile_pic`,
            }, // directory and tags are optional
            function (err, image) {
                if (err) {
                    return res.send(err);
                }
                console.log("file uploaded to Cloudinary");
                // remove file from server
                const fs = require("fs");
                fs.unlinkSync(path);

                const dpUrlInput = image.url;

                db.users.addUser(
                    usernameInput,
                    passwordInput,
                    emailInput,
                    displayNameInput,
                    locationInput,
                    dpUrlInput,
                    afterAddingUser
                );
            }
        );


    };


    let authenticateUserControllerCallback = (req, res) => {

        const whenModelIsDone = (err, result) => {
            if (err) {
                return res.statusCode(404, `Error is ${err}`);
            }

            console.log(`Result is`, result)

            if (result !== null) {
                setUserCookies(
                    result.user_id,
                    result.username,
                    result.user_displayname,
                    result.location_id,
                    res
                );
                return res.redirect(`/`);
            }

            const data = {
                errorMsg: `Wrong username or password.`,
                loginData: req.cookies
            }

            return res.render(`error`, data)

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