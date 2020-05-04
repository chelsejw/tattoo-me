module.exports = (db) => {
    /**
     * ===========================================
     * Controller logic
     * ===========================================
     */

    let getAllLocationsController = (req, res) => {
        db.locations.getAllLocations((err, result) => {

            if (err) {
                return console.log(`all locations`, err);
            }
            res.send(result)
        })
    }

    let getAllHashtagsController = (req, res) => {
        db.hashtags.getAllHashtags((err, result) => {
            if (err) {
                return console.log(`err querying all hashtags api`, err);
            }
            res.send(result);
        });
    };

    let getAllArtistsController = (req, res) => {
        db.artists.getAllArtists((err, result) => {

            if (err) {
                return console.log(`Err querying all artists from API`, err);
            }

            res.send(result)

        })
    }

    let getArtistsByLocationController = (req, res) => {
        let target = req.params.locationId
        db.artists.getArtistsByLocation(target, (err, results) => {
            if (err) {
                return console.log(`Err when querying artists by location in API`, err);
            } else if (results.length < 1) {
                return res.send(`No results.`)
            }
            res.send(results);
        });
    }

    let getAllArtistsByHashtagController = (req, res) => {
        let target = req.params.hashtagId
        db.artists.getArtistsByHashtag(target, (err, results) => {
            if (err) {
                return console.log(`Err when querying artists by location in API`, err);
            } else if (results.length < 1) {
                return res.send(`No results.`);
            }
            res.send(results);

        })
    }

    let getAllHashtagsOfTattooIdController = (req, res) => {

        let tattooId = req.params.tattooId

        db.tattoos.getHashtagsByTattooId(tattooId, (err, results) => {

            if (err) {
                return res.status(404).send(err);
            }

            return res.send(results)

        })

    }

    let getHashtagNameById = (req, res) => {

        let hashtagId = req.params.hashtagId
        db.hashtags.getHashtagById(hashtagId, (err, result) => {
            if (err) {
                return res.status(404).send(err);
            }

            return res.send(result)

        })

    }

    let getAllHashtagsOfArtistController = (req, res) => {
        let artistId = req.params.artistId;

        db.hashtags.getAllHashtagsOfArtist(artistId, (err, result) => {
            if (err) {
                return res.status(404).send(err);
            }
            if (result == null) {
                return res.send(`No results found.`)
            }
            return res.send(result);
        });
    };

    let getUsersLikesController = (req, res) => {

        const userId = req.params.id
        return db.likesfollows.getUsersLikes(userId, (err, result) => {
            if (err) {
                return res.status(404).send(err);
            }
            return res.send(result);
        });


    }

    let getUsersFollowingController = (req, res) => {
        const userId = req.params.id
        return db.likesfollows.getUsersFollowing(userId, (err, result) => {
            if (err) {
                return res.status(404).send(err);
            }
            return res.send(result)
        });
    }


    const checkFollowingController = (req, res) => {
        const userId = req.params.userId;
        const artistId = req.params.artistId;

        db.likesfollows.checkIfFollowing(userId, artistId, (err, result) => {
            if (err) {
                return res.status(404).send(err);
            }

            if (!result) {
                return res.send(false);
            }

            return res.send(true);
        });
    };

    const checkLikeController = (req, res) => {
        const userId = req.params.userId;
        const tattooId = req.params.tattooId;

        db.likesfollows.checkIfLiked(userId, tattooId, (err, result) => {
            if (err) {
                return res.status(404).send(err);
            }
            if (!result) {
                return res.send(false);
            }
            return res.send(true);
        });
    };



    /**
     * ===========================================
     * Export controller functions as a module
     * ===========================================
     */
    return {
        getAllLocations: getAllLocationsController,
        getAllArtists: getAllArtistsController,
        getAllHashtags: getAllHashtagsController,
        getArtistsByLocation: getArtistsByLocationController,
        getArtistsByHashtag: getAllArtistsByHashtagController,
        getAllHashtagsOfTattooId: getAllHashtagsOfTattooIdController,
        getHashtagNameById: getHashtagNameById,
        getAllHashtagsOfArtist: getAllHashtagsOfArtistController,
        getUsersLikes: getUsersLikesController,
        getUsersFollowing: getUsersFollowingController,
        checkFollowing: checkFollowingController,
        checkLike: checkLikeController
    };
};