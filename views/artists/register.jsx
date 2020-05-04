var React = require("react");
import Nav from "../components/nav";
import Head from "../components/header";
import BootstrapJs from "../components/bootstrap-js";

class ArtistRegister extends React.Component {
  render() {
            const loginData = this.props.loginData;
            const locations = this.props.locations
    const locationsOptions = locations.map((location) => {
      return (
        <option value={location.location_id} key={location.location_id}>
          {location.location_name}
        </option>
      );
    });
    const hashtags = this.props.hashtags
        const hashtagsCheckList = hashtags.map((hashtag) => {
          return (
            <div className="form-check-inline">
              <input
                type="checkbox"
                name="hashtags"
                value={hashtag.hashtag_id}
                className="form-check-input"
                id={`hashtag_${hashtag.hashtag_id}`}
              />
              <label className="form-check-label">{hashtag.hashtag_name}</label>
            </div>
          );
        });


    return (
      <html>
        <Head />
        <body className="bg-dark">
          <Nav loginData={loginData} />
          <div className="jumbotron bg-dark text-white">
            <h3>Sign-up as an Artist</h3>
            <form
              id="newArtist"
              action="/artists"
              method="post"
              encType="multipart/form-data"
            >
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="inputUsername">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    name="inputUsername"
                    placeholder="Username"
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputPassword">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="inputPassword"
                    placeholder="Password"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="inputDisplayName">Display Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="inputDisplayName"
                    placeholder="Display Name"
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputPassword4">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    name="inputEmail"
                    placeholder="Email"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col-md-3">
                  <label htmlFor="locationsOptions">Location</label>
                  <select
                    form="newArtist"
                    name="inputLocation"
                    className="form-control"
                    id="locationsOptions"
                    required
                  >
                    {locationsOptions}
                  </select>
                </div>
                <div className="form-group col-md-9">
                  <label htmlFor="inputImage">Profile Picture Upload</label>
                  <input
                    type="file"
                    className="form-control-file"
                    name="myFile"
                    placeholder="Image"
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="inputDisplayName">What kind of works do you do?</label>
                  <br/>{hashtagsCheckList}
                </div>
              </div>

              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </form>
          </div>

          <BootstrapJs />
        </body>
      </html>
    );
  }
}

module.exports = ArtistRegister;
