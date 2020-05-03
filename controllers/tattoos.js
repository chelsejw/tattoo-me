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


    // MULTER
    var multer = require("multer");

    const getAddTattooFormController = (req, res) => {

        const data = {};
        data.loginData = req.cookies;

        if (req.cookies.currentUserType !== 'artist') {
            data.errorMsg = `Only artists can view this page. Please login as an artist to view.`;
            return res.render(`error`, data);
        }
        const artistId = req.cookies.currentAccountId
        data.artistId = artistId;
        db.hashtags.getAllHashtags((err, hashtagResults) => {
            if (err) {
                return res.status(404).send(err);
            }
            data.hashtags = hashtagResults;
            res.render(`tattoos/add-tattoo`, data);
        });
    };

    const addTattooController = (req, res, next) => {

        console.log(`req.body`, req.body)
        console.log(`req.file`, req.file);

        const afterAddingToTattoos = (err1, result1) => {
            if (err1) {
                return res.status(404).send(err1);
            }

            const newTattooId = result1.tattoo_id
            const hashtags = req.body.hashtags;
            console.log(`New tattoo ID`, newTattooId)

            if (hashtags.length === 1) {
                console.log(
                    `adding ${hashtags} to ${newTattooId}`
                );

                return db.hashtags.addHashtagToTattoo(
                    hashtags,
                    newTattooId,
                    (addHashtagErr, addHashtagResult) => {
                        if (addHashtagErr) {
                            return res.status(404).send(addHashtagErr);
                        }
                        return res.redirect(`/tattoos/${newTattooId}`);
                    }
                );
            };
            console.log(`more than one hashtag`)
            console.log(`hashtagsArr`, hashtags);
            console.log(`hashtags arr should run ${hashtags.length} times`);

            hashtags.forEach((hashtag) => {
                console.log(`added ${hashtag} to ${newTattooId}`);
                db.hashtags.addHashtagToTattoo(
                    hashtag,
                    newTattooId,
                    (err3, result3) => {
                        if (err3) {
                            res.status(404).send(err3);
                        }
                        console.log(result3);
                    }
                );
            });
            return res.redirect(`/tattoos/${result1.tattoo_id}`);
        }

        // SEND FILE TO CLOUDINARY

        const path = req.file.path;
        const accountId = req.cookies.currentAccountId
        const accountUser = req.cookies.currentUsername
        const uniqueFilename = `${accountId}_${accountUser}_${new Date().toISOString()}`

        cloudinary.uploader.upload(
            path, {
                public_id: `tattoos/${uniqueFilename}`,
                tags: `tattoos`
            }, // directory and tags are optional
            function (err, image) {
                if (err) return res.send(err);
                console.log("file uploaded to Cloudinary");
                // remove file from server
                const fs = require("fs");
                fs.unlinkSync(path);

                //Get artistId
                const currentArtistId = req.cookies.currentAccountId

                //Add tattoo to database.
                db.tattoos.addTattoo(currentArtistId, image.url, afterAddingToTattoos)
                // return image details
            });
    };

    const displayOneTattooController = (req, res) => {

        const tattooId = req.params.id
        db.tattoos.getTattooById(tattooId, (err, result) => {
            if (err) {
                return res.statusCode(404, `Tattoo not found`)
            }
            res.render(`tattoos/tattoo`, {
                tattooData: result,
                loginData: req.cookies
            })
        })

    }

    const tattooSearchResults = (req, res) => {
        const hashtagQuery =
            req.query.hashtagId;
        let data = {};
        data.loginData = req.cookies

        //GET DATA TO RENDER HASHTAG OPTIONS.
        db.hashtags.getAllHashtags(
            (err, hashtagResults) => {
                if (err) {
                    return res
                        .status(404)
                        .send(err);
                }

                data.hashtags = hashtagResults;
                data.query = {hashtagId: hashtagQuery};


                if (hashtagQuery==="all"){

                db.tattoos.getAllTattoos((err, tattooResults) => {
                  if (err) {
                            return res.status(404).send(err);
                  }
                  data.results = tattooResults;
                  res.render(`tattoos/tattoo-results`, data);
                });

                } else if (!isNaN(hashtagQuery)){
                    db.tattoos.getTattoosByHashtag(hashtagQuery, (err, tattooResults)=>{
                        if (err){
                            return res.status(404).send(err);
                        }
                    data.results = tattooResults;
                    
                    res.render(`tattoos/tattoo-results`, data);

                    })
                }

            }
        );
    };

    /**
     * ===========================================
     * Export controller functions as a module
     * ===========================================
     */
    return {
        getAddTattooForm: getAddTattooFormController,
        addTattoo: addTattooController,
        displayOneTattoo: displayOneTattooController,
        tattooSearchResults: tattooSearchResults,
    };

};