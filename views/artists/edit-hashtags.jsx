var React = require("react");
import Nav from "../components/nav";
import Head from "../components/header";
import BootstrapJs from "../components/bootstrap-js";

const moment = require("moment");
moment().format();

class EditArtistHashtags extends React.Component {
  render() {
    const loginData = this.props.loginData;
    const success = this.props.successMsg;
    const hashtags = this.props.hashtags;
    const artist = this.props.artist

    const hashtagsCheckList = hashtags.map((hashtag) => {
      return (
        <div className="d-inline mr-4">
          <input
            type="checkbox"
            name="hashtags"
            value={hashtag.hashtag_id}
            className="mr-2"
            id={`hashtag_${hashtag.hashtag_id}`}
          />
          <label className="text-dark">{hashtag.hashtag_name}</label>
        </div>
      );
    });

    const successAlert = () => {
      if (success) {
        return (
          <div class="alert alert-success" role="alert">
            {this.props.successMsg}
          </div>
        );
      }
    };

    return (
      <html>
        <Head />
        <body className="bg-dark text-white">
          <Nav loginData={loginData} />
          <div className="jumbotron bg-dark">
            <h3>Change Artist Hashtags</h3>

            {successAlert()}
            <form
              className="form"
              action={`/artists/${artist.artist_id}/hashtags?_method=put`}
              method="POST"
            >
              <div class="col">
                <div
                  key={artist.artist_id}
                  id={`artist_${artist.artist_id}`}
                  class="card"
                >
                  <div class="card-img-bg">
                    <img
                      src={artist.artist_img}
                      class="card-img-top"
                      alt="..."
                    />
                  </div>
                  <div id={`body_${artist.artist_id}`} class="card-body">
                    <h5 class="card-title">
                      <a
                        className="text-dark"
                        href={`/artists/${artist.artist_id}`}
                      >
                        <strong>{artist.artist_displayname}</strong> @
                        {artist.artist_username}
                      </a>
                    </h5>
                    <p class="card-text"></p>
                    {hashtagsCheckList}
                  </div>
                  <div class="card-footer">
                      <button className="btn btn-lg btn-success">Update Hashtags</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <BootstrapJs />
          <script src="/ajax/edit-artist-hashtags.js"></script>
        </body>
      </html>
    );
  }
}

module.exports = EditArtistHashtags;
