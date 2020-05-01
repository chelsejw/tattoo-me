module.exports = (db) => {
    /**
     * ===========================================
     * Controller logic
     * ===========================================
     */

    let getLoginFormControllerCallback = (req, res) => {
        res.render("artists/login");
    };

    let getArtistRegistrationControllerCallback = (req, res) => {
        //GET LOCATIONS DATABASE TO RENDER OPTIONS
        res.render(`artists/register`);
    };

    const artistSearchControllerCallback = (req, res) => {

        if (!req.query) {
            return res.send(`no queries`)
        }

        const locationId = req.query.locationId
        const hashtagId = req.query.hashtagId

        let data = {}

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

                        if (locationId == "all" && hashtagId == "all") {
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
                                        return res.send(`Error`, searchErr);
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
                                        return res.send(`Error`, searchErr);
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
                                    return res.send(`Error`, searchErr);
                                }
                                data.results = searchResults;
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
            res.redirect(`/`);
        };

        db.artists.addArtist(usernameInput, displayNameInput, passwordInput, locationInput, emailInput, imageInput, afterAddingArtist);
    };

    //   let authenticateArtistControllerCallback = (req, res) => {
    //     const whenModelIsDone = (err, result) => {
    //       if (err) {
    //         res.send(`Query error,`, err);
    //       } else {
    //         res.cookie(`currentUserId`, result.artist_id);
    //         res.cookie(`currentUserHandle`, result.artist_username);
    //         res.cookie(`isArtist`, true)
    //         res.cookie(`isLoggedIn`, true);
    //         res.redirect(`/`);
    //       }
    //     };
    //     let handleInput = req.body.handle;
    //     let hashedPw = sha256(req.body.password);
    //     db.users.getUserLogin(handleInput, hashedPw, whenModelIsDone);
    //   };

    /**
     * ===========================================
     * Export controller functions as a module
     * ===========================================
     */
    return {
        getArtistRegistration: getArtistRegistrationControllerCallback,
        addArtist: addArtistControllerCallback,
        artistSearch: artistSearchControllerCallback
    };
};