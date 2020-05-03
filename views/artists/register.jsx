var React = require("react");
import Nav from "../components/nav";
import Head from "../components/header";
import BootstrapJs from "../components/bootstrap-js";

class ArtistRegister extends React.Component {
  render() {
            const loginData = this.props.loginData;
    return (
      <html>
        <Head />
        <body className="bg-dark">
          <Nav loginData={loginData} />
          <div className="jumbotron bg-dark text-white">
            <h3>Sign-up as an Artist</h3>
            <form id="newArtist" action="/artists" method="post">
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="inputUsername">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    name="inputUsername"
                    placeholder="Username"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputPassword">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="inputPassword"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col-md-4">
                  <label htmlFor="inputDisplayName">Display Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="inputDisplayName"
                    placeholder="Display Name"
                  />
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="inputPassword4">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    name="inputEmail"
                    placeholder="Email"
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
                  ></select>
                </div>
                <div className="form-group col-md-9">
                  <label htmlFor="inputImage">Profile Picture URL</label>
                  <input
                    type="text"
                    className="form-control"
                    name="inputImage"
                    placeholder="Image URL"
                  />
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
