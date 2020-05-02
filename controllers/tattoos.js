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
        const artistId = req.cookies.currentAccountId
        res.render(`tattoos/add-tattoo`, {
            artistId: artistId
        });
    };

    const addTattooController = (req, res, next) => {

        console.log(`req.body`, req.body)
        console.log(`req.file`, req.file);


        const whenUploadDone = (err, result) => {
            if (err) {
                return res.statusCode(404, err);
            }
            console.log(result)
            return res.redirect(`/tattoos/${result.tattoo_id}`)
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
                db.tattoos.addTattoo(currentArtistId, image.url, whenUploadDone)
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
                tattooData: result
            })
        })

    }

    /**
     * ===========================================
     * Export controller functions as a module
     * ===========================================
     */
    return {
        getAddTattooForm: getAddTattooFormController,
        addTattoo: addTattooController,
        displayOneTattoo: displayOneTattooController
    };
};