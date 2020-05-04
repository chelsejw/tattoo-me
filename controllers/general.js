module.exports = (db) => {
    /**
     * ===========================================
     * Controller logic
     * ===========================================
     */

    const resetCookies = (res) => {
        res.cookie(`isLoggedIn`, false);
        res.cookie(`currentUserType`, null);
        res.cookie(`currentAccountId`, null);
        res.cookie(`currentUsername`, null);
        res.cookie(`currentDisplayName`, null);
        res.cookie(`currentLocationId`, null);
    };

    const logoutController = (req, res) => {
        resetCookies(res);
        res.redirect(`/`);
    };

    let getHomePageControllerCallback = (req, res) => {
        let data = {};
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

                res.render("index", data);
            });
        });
    };

    const showSettingsPageController = (req, res) => {

        const data = {};
        data.loginData = req.cookies;
        const updateStatus = req.query.updated

        if (updateStatus==='true'){
            data.successMsg = `You have successfully updated your profile.`
        }

        if (req.cookies.isLoggedIn !== 'true') {
            data.errorMsg = `Sorry, you must be logged in to view this page.`
            return res.render(`error`, data)
        }

        const accountId = req.cookies.currentAccountId;

        db.locations.getAllLocations((err, locationResults) => {
            if (err) {
                return res.status(404).send(err)
            }
            data.locations = locationResults
            if (req.cookies.currentUserType == "user") {
                return db.users.getOneUser(accountId, (err, result) => {
                    if (err) {
                        return res.status(404).send(err);
                    }

                    data.accountDetails = result;
                    res.render(`settings`, data);
                });
            } else if (req.cookies.currentUserType == "artist") {
                return db.artists.getArtistById(accountId, (err, result) => {
                    if (err) {
                        return res.status(404).send(err);
                    }

                    data.accountDetails = result;
                    res.render(`artists/artist-settings`, data);
                });
            }
        })
    }

    let displayErrorPageController = (req, res) => {
        res.render(`error`, {
            errorMsg: `Sorry, the page you were trying to load was not found.`,
            loginData: req.cookies
        })
    }

    let showPasswordSettingsController = (req, res) => {


        const data = {};
        data.loginData = req.cookies;

        if (req.cookies.isLoggedIn !== "true") {
            data.errorMsg = `Sorry, you must be logged in to view this page.`;
            return res.render(`error`, data);
        }

        res.render(`password`, data)

    }


    let updatePasswordController = (req, res) => {
      const data = {};
      data.loginData = req.cookies;
      if (req.cookies.isLoggedIn !== "true") {
        data.errorMsg = `Sorry, you must be logged in to view this page.`;
        return res.render(`password`, data);
      }

      if (req.cookies.currentUserType === "user") {
        return res.send(`wait ah`);
      } else if (req.cookies.currentUserType === "artist") {
        let artistHandle = req.cookies.currentUsername;

        const sha256 = require("js-sha256");

        let oldPassword = sha256(req.body.oldPassword);
        let newPassword = sha256(req.body.newPassword);

        const afterVerifyingPassword = (err, result) => {
          if (err) {
            return res.status(404).send();
          } else if (!result) {
            data.errorMsg = `Sorry, your password was wrong.`;
            return res.render(`password`, data);
          }

          let artistId = req.cookies.currentAccountId;
          console.log(`Have verified..`)
          db.artists.changeArtistPassword(
            artistId,
            newPassword,
            (err, result) => {
              if (err) {
                return res.status(404).send();
              }
              data.successMsg = `Successfully updated password.`
              return res.render(`password`, data)
            }
          );
        };

        db.artists.getArtistLogin(artistHandle, oldPassword, afterVerifyingPassword);
      }
    };


    /**
     * ===========================================
     * Export controller functions as a module
     * ===========================================
     */
    return {
        getHomePage: getHomePageControllerCallback,
        logout: logoutController,
        showSettingsPage: showSettingsPageController,
        displayErrorPage: displayErrorPageController,
        showPasswordSettings: showPasswordSettingsController,
        updatePassword: updatePasswordController
    };
};