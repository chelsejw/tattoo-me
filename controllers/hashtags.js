module.exports = (db) => {
    /**
     * ===========================================
     * Controller logic
     * ===========================================
     */

    let showAddHashtagPageController = (req, res) => {

        const data = {};
        data.loginData = req.cookies;

        if (req.cookies.currentUserType !== "artist") {
            data.errorMsg = `Only artists can view this page. Please login as an artist to view.`;
            return res.render(`error`, data);
        }

        res.render(`hashtags/add-hashtag`, data)
    }

    let addHashtagController = (req, res) => {
        const data = {};
        data.loginData = req.cookies;

        if (req.cookies.currentUserType !== "artist") {
            data.errorMsg = `Only artists can view this page. Please login as an artist to view.`;
            return res.render(`error`, data);
        }

        const newHashtag = req.body.newHashtag;

        db.hashtags.getHashtagByName(newHashtag, (err, result) => {

            if (err) {
                return res.status(404).send(err)
            }


            //IF THERE ARE NO HASHTAGS FOUND WITH THAT NAME, ADD THE HASHTAG.
            if (!result) {

                return db.hashtags.addHashtag(newHashtag, (err, result) => {
                    if (err) {
                        return res.status(404).send(err);
                    }
                    data.successMsg = `Successfully added the hashtag #${result.hashtag_name}.`;
                    res.render(`hashtags/add-hashtag`, data);
                });
            }

            //IF THERE ARE HASHTAGS WITH THAT NAME, DISPLAY ERROR MESSAGE.
            data.errorMsg = `Sorry, a hashtag with that name exists.`
            return res.render(`hashtags/add-hashtag`, data);
        });
    };

    /**
     * ===========================================
     * Export controller functions as a module
     * ===========================================
     */
    return {
        showAddHashtagPage: showAddHashtagPageController,
        addHashtag: addHashtagController
    };
};