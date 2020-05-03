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
                    res.render(`settings`, data);
                });
            }
        })
    }




    /**
     * ===========================================
     * Export controller functions as a module
     * ===========================================
     */
    return {
        getHomePage: getHomePageControllerCallback,
        logout: logoutController,
        showSettingsPage: showSettingsPageController
    };
};