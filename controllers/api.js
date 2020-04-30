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

  let getAllArtistsController = (req,res)=> {
    db.artists.getAllArtists( (err,result)=> {

      if (err){
        return console.log(`Err querying all artists from API`, err);
      }

      res.send(result)

    })
  }

  let getArtistsByLocationController = (req,res)=> {
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

  let getAllArtistsByHashtagController = (req,res)=> {
    let target = req.params.hashtagId
    db.artists.getArtistsByHashtag(target, (err, results)=> {
      if (err) {
        return console.log(`Err when querying artists by location in API`, err);
      } else if (results.length < 1) {
        return res.send(`No results.`);
      }
      res.send(results);

    })
  }

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
        getArtistsByHashtag: getAllArtistsByHashtagController
      };
};
