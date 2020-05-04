var React = require("react");
import Nav from "../components/nav";
import Head from "../components/header";
import BootstrapJs from "../components/bootstrap-js";

class ArtistRegister extends React.Component {
  render() {
    const loginData = this.props.loginData;
    const account = this.props.accountDetails
    const locations = this.props.locations
    const userType = loginData.currentUserType
        const locationsOptions = locations.map((location) => {
          return (
            <option value={location.location_id} key={location.location_id}>
              {location.location_name}
            </option>
          );
        });
    
    const success = this.props.successMsg;

    const successAlert = () => {
      if (success) {
        return (
          <div class="alert alert-success" role="alert">
            {this.props.successMsg}
          </div>
        );
      }
    };


    let availabilitySwitch = (
      <input
        type="checkbox"
        name="booking_avail"
        value="true"
        className="form-control"
      />
    );

    let userAvailability = account.booking_avail

    if (userAvailability===true){
      availabilitySwitch = (
        <input
          type="checkbox"
          name="booking_avail"
          value="true"
          className="form-control"
          checked
          />
      );

    }

    return (
      <html>
        <Head />
        <body className="bg-dark">
          <Nav loginData={loginData} />
          <div className="jumbotron bg-dark text-white">
            <h3>Edit Profile</h3>
            <form
              encType="multipart/form-data"
              id="editArtist"
              action="/artists?_method=put"
              method="post"
            >
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
                    form="editArtist"
                    name="inputLocation"
                    className="form-control"
                    id="locationsOptions"
                  >
                    {locationsOptions}
                  </select>
                </div>
                <div className="form-group col-md-5">
                  <label htmlFor="inputHashtag">Profile Picture</label>
                  <input
                    type="file"
                    className="form-control-file"
                    name="myFile"
                    placeholder="Image"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col-md-5">
                  <label htmlFor="inputWebsite">Website</label>

                  <input
                    type="url"
                    className="form-control"
                    name="inputWebsite"
                    placeholder="Website"
                    value={account.website}
                  />
                </div>
                <div className="form-group col-md-5">
                  <label htmlFor="locationsOptions">Booking Availability</label>
                  <label class="switch d-block">
                    {availabilitySwitch}
                    <span class="slider round"></span>
                  </label>
                </div>
              </div>
              {successAlert()}
              <button type="submit" className="btn btn-primary">
                Update
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
