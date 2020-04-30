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
        const queries = {location: locationId, hashtag: hashtagId}

        console.log(`Location Id is ${locationId}`)
        console.log(`hashtagId is ${hashtagId}`)

        if (locationId == "all" && hashtagId == "all") {
            console.log(`no params`)
            return db.artists.getAll((err, results) => {
              if (err) {
                res.send(`Error`, err);
              }
                res.render(`artists/results`,{ results: results, queries: queries} );
            });


            //If no hashtag specified, just get artists by location
        } else if (hashtagId == "all") {
            console.log(`get by location`);

            return db.artists.getArtistsByLocation(
              locationId,
              (err, results) => {
                if (err) {
                  res.send(`Error`, err);
                }
                res.render(`artists/results`, {
                  results: results,
                  queries: queries,
                });
              }
            );

            //If no location specified, get artists by hashtag
        } else if (locationId == "all") {
            console.log(`get by hashtag`);

            return db.artists.getArtistsByHashtag(
                hashtagId,
                (err, results) => {
                    if (err) {
                        res.send(`Error`, err);
                    }
                res.render(`artists/results`, {
                  results: results,
                  queries: queries,
                });
                }
            );
        }

        //If not, query both hashtag & location

        return db.artists.getArtistsByHashtagAndLocation(hashtagId, locationId, (err, results) => {
            if (err) {
                return res.send(`Error`, err);
            }

                res.render(`artists/results`, {
                  results: results,
                  queries: queries,
                });
        })


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