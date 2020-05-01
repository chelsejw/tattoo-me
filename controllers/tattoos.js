module.exports = (db) => {
  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */

  let getArtistRegistrationControllerCallback = (req, res) => {
    //GET LOCATIONS DATABASE TO RENDER OPTIONS
    res.render(`artists/register`);
  };

  const sha256 = require("js-sha256");

  let addArtistControllerCallback = (req, res) => {
    let usernameInput = req.body.inputUsername;
    let passwordInput = sha256(req.body.inputPassword);
    let displayNameInput = req.body.inputDisplayName;
    let emailInput = req.body.inputEmail;
    let locationInput = req.body.inputLocation;
    let imageInput = req.body.inputImage;

    const afterAddingArtist = (err, result) => {
      err ? console.log(err) : console.log(`Successfully added new artist.`);
      res.redirect(`/`);
    };

    db.artists.addArtist(usernameInput, displayNameInput, passwordInput, locationInput, emailInput, imageInput, afterAddingArtist);
  };

  let authenticateArtistControllerCallback = (req, res) => {
    const whenModelIsDone = (err, result) => {
      if (err) {
        res.send(`Query error,`, err);
      } else {
        res.cookie(`currentUserId`, result.artist_id);
        res.cookie(`currentUserHandle`, result.artist_username);
        res.cookie(`isArtist`, true)
        res.cookie(`isLoggedIn`, true);
        res.redirect(`/`);
      }
    };
    let handleInput = req.body.handle;
    let hashedPw = sha256(req.body.password);
    db.users.getUserLogin(handleInput, hashedPw, whenModelIsDone);
  };

  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    getArtistRegistration: getArtistRegistrationControllerCallback,
    addArtist: addArtistControllerCallback
  };
};
