require("dotenv").config();


const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: "dwbuqa4dx",
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


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
            db.hashtags.getAllHashtags((err, hashtagResults) => {
                data.hashtags = hashtagResults
                res.render(`artists/register`, data);

            })
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

        let sortOption = req.query.sortBy;
        let hashtagQuery = req.query.hashtagId;
        let locationQuery = req.query.locationId;
        data.query = {
            hashtagId: hashtagQuery,
            sortBy: sortOption,
            location: locationQuery
        };

        console.log(data.query)


        if (hashtagQuery == 'all') {
            data.hashtagName = 'all'
        }

        if (locationQuery == 'all') {
            data.locationName = 'everywhere';
        }

        if (hashtagQuery !== 'all') {
            db.hashtags.getHashtagById(hashtagQuery, (err, result) => {
                if (err) {
                    return res.status(404).send(err);
                }
                data.hashtagName = result.hashtag_name;
            })
        }

        if (locationQuery !== 'all') {
            db.locations.getLocationById(locationQuery, (err, result) => {
                if (err) {
                    return res.status(404).send(err);
                }
                data.locationName = result.location_name;
            })
        }

        db.locations.getAllLocations((locationsErr, locationsResult) => {
            if (locationsErr) {
                return res.status(404).send(locationsErr);
            }
            data.locations = locationsResult;
            db.hashtags.getAllHashtags((hashtagErr, hashtagResult) => {
                if (hashtagErr) {
                    return res.status(404).send(hashtagErr);
                }
                data.hashtags = hashtagResult;
                let sortBy = req.query.sortBy;
                if (
                    (locationId == "all" && hashtagId == "all") ||
                    !hashtagId ||
                    !locationId
                ) {
                    return db.artists.getAll(sortBy, (searchErr, searchResults) => {
                        if (searchErr) {
                            return res.send(`Error`, searchErr);
                        }
                        data.results = searchResults;
                        res.render(`artists/results`, data);
                    });

                    //If no hashtag specified, just get artists by location
                } else if (hashtagId == "all") {
                    return db.artists.getArtistsByLocation(
                        sortBy,
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
                        sortBy,
                        hashtagId,
                        (searchErr, searchResults) => {
                            if (searchErr) {
                                return res.status(404).send(searchErr);
                            }

                            data.results = searchResults;
                            res.render(`artists/results`, data);
                        }
                    );
                }
                return db.artists.getArtistsByHashtagAndLocation(
                    sortBy,
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
            });
        });


    }

    const sha256 = require("js-sha256");


    let addArtistControllerCallback = (req, res) => {
        let usernameInput = req.body.inputUsername;
        let passwordInput = sha256(req.body.inputPassword);
        let displayNameInput = req.body.inputDisplayName;
        let emailInput = req.body.inputEmail;
        let locationInput = req.body.inputLocation;
        let hashtags = req.body.hashtags
        let websiteInput = req.body.inputWebsite

        const afterAddingArtist = (err, result) => {

            if (err) {
                return res.status(404).send(err);
            }

            console.log(`after adding artist result`, result);
            const artistId = result.artist_id;

            setArtistCookies(
                result.artist_id,
                result.artist_username,
                result.artist_displayname,
                result.location_id,
                res
            );

            //After adding artist, add the hashtags.
            hashtags.forEach((hashtag) => {
                db.hashtags.addHashtagToArtist(
                    hashtag,
                    artistId,
                    (hashtagErr, hashtagResult) => {
                        if (hashtagErr) {
                            return res.status(404).send(hashtagErr);
                        }
                    }
                );
            });
            return res.redirect(`/`);

        };


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

                const imageInput = image.url;

                db.artists.addArtist(
                    usernameInput,
                    displayNameInput,
                    passwordInput,
                    locationInput,
                    emailInput,
                    imageInput,
                    websiteInput,
                    afterAddingArtist
                );
            }
        );
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
        const data = {};
        data.loginData = req.cookies;
        const artistId = req.cookies.currentAccountId;
        const username = req.body.inputUsername
        const displayname = req.body.inputDisplayName
        const locationId = req.body.inputLocation
        const email = req.body.inputEmail
        const availInput = req.body.booking_avail
        const website = req.body.inputWebsite

        let availability = true;

        if (!availInput) {
            availability = false;
        }

        console.log(`Reqbody`, req.body);
        console.log(`req file`, req.file)

        if (req.file) {
            console.log(`in req.file conditional`)

            const path = req.file.path;
            const accountUser = req.cookies.currentUsername;
            const uniqueFilename = `${artistId}_${accountUser}_profileimg_${new Date().toISOString()}`;

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

                    const imageUrl = image.url;
                    return db.artists.updateArtist(
                        artistId,
                        username,
                        displayname,
                        locationId,
                        email,
                        availability,
                        imageUrl,
                        website,
                        (err, result) => {
                            if (err) {
                                return res.status(404).send(err);
                            }

                            setArtistCookies(
                                result.artist_id,
                                result.artist_username,
                                result.artist_displayname,
                                result.location_id,
                                res
                            );
                            res.redirect(`/settings?updated=true`);
                        }
                    );
                }
            );
        }
        console.log(`after conditional`)
        return db.artists.updateArtist(
            artistId,
            username,
            displayname,
            locationId,
            email,
            availability,
            null,
            website,
            (err, result) => {
                if (err) {
                    return res.status(404).send(err);
                }
                setArtistCookies(
                    result.artist_id,
                    result.artist_username,
                    result.artist_displayname,
                    result.location_id,
                    res
                );
                res.redirect(`/settings?updated=true`);
            });
    };

    const showEditArtistHashtagsController = (req, res) => {
        const data = {};
        data.loginData = req.cookies;

        if (req.cookies.currentUserType !== "artist") {
            data.errorMsg = `Only artists can view this page. Please login as an artist to view.`;
            return res.render(`error`, data);
        }

        const artistId = parseInt(req.cookies.currentAccountId)

        //get all hashtags

        db.hashtags.getAllHashtags((err, allHashtags) => {
            if (err) {
                return res.status(404).send(err);
            }
            data.hashtags = allHashtags;

            db.artists.getArtistById(artistId, (err, artistResult) => {
                if (err) {
                    return res.status(404).send(err);
                }
                data.artist = artistResult;
                return res.render(`artists/edit-hashtags`, data);
            });
        });
    }

    const editArtistHashtagsController = (req, res) => {
        const data = {};
        data.loginData = req.cookies;

        if (req.cookies.currentUserType !== "artist") {
            data.errorMsg = `Only artists can view this page. Please login as an artist to view.`;
            return res.render(`error`, data);
        }

        const artistId = parseInt(req.cookies.currentAccountId);
        db.artists.deleteAllArtistHashtags(artistId, (err, result) => {

            if (err) {
                return res.status(404).send(err)
            }

            const hashtags = req.body.hashtags

            hashtags.forEach((hashtag) => {
                db.hashtags.addHashtagToArtist(
                    hashtag,
                    artistId,
                    (err3, result3) => {
                        if (err3) {
                            return res.status(404).send(err3);
                        };
                    }
                );
            });
            res.redirect(`/artists/${artistId}`);

        })
    }


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
        updateArtistInfo: updateArtistInfo,
        showEditArtistHashtags: showEditArtistHashtagsController,
        editArtistHashtags: editArtistHashtagsController
    };
};