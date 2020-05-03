var React = require("react");
import Nav from "./components/nav";
import Head from "./components/header";
import BootstrapJs from "./components/bootstrap-js";

class ArtistRegister extends React.Component {
  render() {
    const loginData = this.props.loginData;
    console.log(loginData)
    const account = this.props.accountDetails

    const userType = loginData.currentUserType

    let form;
    if (userType=="artist"){
      form = (
        <form id="editArtist" action="/artist?_method=put" method="post">
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputUsername">Username</label>
              <input
                type="text"
                className="form-control"
                name="inputUsername"
                placeholder="Username"
                value={account.artist_username}
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
                value={account.artist_displayname}
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="inputPassword4">Email</label>
              <input
                type="text"
                className="form-control"
                name="inputEmail"
                placeholder="Email"
                value={account.email}
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
          </div>

          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      );
    }


    return (
      <html>
        <Head />
        <body className="bg-dark">
          <Nav loginData={loginData} />
          <div className="jumbotron bg-dark text-white">
            <h3>Edit Profile</h3>
            {form}
          </div>

          <BootstrapJs />
          <script src="../ajax/artists/register.js"></script>
        </body>
      </html>
    );
  }
}

module.exports = ArtistRegister;
