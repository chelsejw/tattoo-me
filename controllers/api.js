module.exports = (db) => {
  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */

  let getAllLocationsController = (req,res)=> {
        db.locations.getAllLocations( (err, result)=> {

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

  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
        getAllLocations: getAllLocationsController,
        getAllHashtags: getAllHashtagsController
  };
};
