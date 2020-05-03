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

    const setArtistCookies = (currId, currUsername, currDisName, currLocId, res) => {
        resetCookies(res);
        res.cookie(`isLoggedIn`, true);
        res.cookie(`currentUserType`, "artist");
        res.cookie(`currentAccountId`, currId);
        res.cookie(`currentUsername`, currUsername);
        res.cookie(`currentDisplayName`, currDisName);
        res.cookie(`currentLocationId`, currLocId);
    };


    let getArtistLoginFormControllerCallback = (req, res) => {
        let data = {};
        data.loginData = req.cookies;
        res.render("artists/login", data);
    };

    let getArtistRegistrationControllerCallback = (req, res) => {
        //GET LOCATIONS DATABASE TO RENDER OPTIONS
        let data = {};
        data.loginData = req.cookies;
        db.locations.getAllLocations((err, locationResults) => {
            if (err) {
                return res.status(404).send(err)
            }

            data.locations = locationResults
            res.render(`artists/register`, data);
        })
    };

    const artistSearchControllerCallback = (req, res) => {

        if (!req.query) {
            return res.send(`no queries`)
        }

        const locationId = req.query.locationId
        const hashtagId = req.query.hashtagId

        let data = {}
        data.loginData = req.cookies

        db.locations.getAllLocations(
            (locationsErr, locationsResult) => {
                if (locationsErr) {
                    return res.status(404).send(locationsErr);
                }

                data.locations = locationsResult;
                db.hashtags.getAllHashtags(
                    (hashtagErr, hashtagResult) => {
                        if (hashtagErr) {
                            return res.status(404).send(hashtagErr);
                        }
                        data.hashtags = hashtagResult;

                        if (locationId == "all" && hashtagId == "all" || !hashtagId || !locationId) {
                            return db.artists.getAll(
                                (searchErr, searchResults) => {
                                    if (searchErr) {
                                        return res.send(`Error`, searchErr);
                                    }

                                    data.results = searchResults;
                                    res.render(`artists/results`, data);
                                }
                            );

                            //If no hashtag specified, just get artists by location
                        } else if (hashtagId == "all") {
                            return db.artists.getArtistsByLocation(
                                locationId,
                                (searchErr, searchResults) => {
                                    if (searchErr) {
                                        return res.status(404).send(searchErr);
                                    }
                                    data.results = searchResults;
                                    res.render(`artists/results`, data);
                                }
                            );
                            //If no location specified, get artists by hashtag
                        } else if (locationId == "all") {
                            return db.artists.getArtistsByHashtag(
                                hashtagId,
                                (searchErr, searchResults) => {
                                    if (searchErr) {
                                        return res.status(404).send(searchErr);
                                    }

                                    data.results = searchResults
                                    res.render(`artists/results`, data);
                                }
                            );
                        }
                        return db.artists.getArtistsByHashtagAndLocation(
                            hashtagId,
                            locationId,
                            (searchErr, searchResults) => {
                                if (searchErr) {
                                    return res.status(404).send(searchErr);
                                }
                                data.results = searchResults;
                                console.log(data);

                                res.render(`artists/results`, data);
                            }
                        );
                    }
                );
            });
    }

    const sha256 = require("js-sha256");

    let addArtistControllerCallback = (req, res) => {
        let usernameInput = req.body.inputUsername;
        let passwordInput = sha256(req.body.inputPassword);
        let displayNameInput = req.body.inputDisplayName;
        let emailInput = req.body.inputEmail;
        let locationInput = req.body.inputLocation;
        let imageInput = req.body.inputImage;

        console.log(`in controller`, locationInput);

        const afterAddingArtist = (err, result) => {
            err ? console.log(err) : console.log(`Successfully added new artist.`);
            setArtistCookies(
                result.artist_id,
                result.artist_username,
                result.artist_displayname,
                result.location_id,
                res
            );
            res.redirect(`/`);
        };

        db.artists.addArtist(usernameInput, displayNameInput, passwordInput, locationInput, emailInput, imageInput, afterAddingArtist);
    };

    let authenticateArtistControllerCallback = (req, res) => {
        const whenModelIsDone = (err, result) => {
            if (err) {
                return res.statusCode(404, `Error is ${err}`);
            }

            if (result !== null) {
                setArtistCookies(
                    result.artist_id,
                    result.artist_username,
                    result.artist_displayname,
                    result.location_id,
                    res
                );
                return res.redirect(`/`);
            }
            const data = {
                errorMsg: `Wrong username or password.`,
                loginData: req.cookies,
            };

            return res.render(`error`, data);

        };

        let handleInput = req.body.handle;
        let hashedPw = sha256(req.body.password);
        db.artists.getArtistLogin(handleInput, hashedPw, whenModelIsDone);
    };

    let showArtistPageControllerCallback = (req, res) => {

        const data = {}
        data.loginData = req.cookies

        let artistId = req.params.artistId

        db.artists.getArtistById(artistId, (artistErr, artistResult) => {
            if (artistErr) {
                return res.status(404).send(artistErr);
            }

            data.artistData = artistResult;

            db.tattoos.getTattoosByArtist(artistId, (tattooErr, tattooResults) => {
                if (tattooErr) {
                    return res.status(404).send(tattooErr);
                }

                data.tattooData = tattooResults

                console.log(data)
                res.render(`artists/artist`, data);
            });
        });
    };

    const updateArtistInfo = (req, res) => {
        const artistId = req.cookies.currentAccountId;
        const username = req.body.inputUsername
        const displayname = req.body.inputDisplayName
        const locationId = req.body.inputLocation
        const email = req.body.inputEmail
        const availInput = req.body.booking_avail

        let availability = true;

        if (!availInput) {
            availability = false;
        }


        console.log(req.body)

        db.artists.updateArtist(artistId, username, displayname, locationId, email, availability, (err, result) => {
            if (err) {
                return res.status(404).send(err);
            };
            res.redirect(`/settings`);
        });
    };

    /**
     * ===========================================
     * Export controller functions as a module
     * ===========================================
     */
    return {
        getArtistRegistration: getArtistRegistrationControllerCallback,
        addArtist: addArtistControllerCallback,
        artistSearch: artistSearchControllerCallback,
        getArtistLoginForm: getArtistLoginFormControllerCallback,
        authenticateArtist: authenticateArtistControllerCallback,
        showArtistPage: showArtistPageControllerCallback,
        updateArtistInfo: updateArtistInfo
    };
};