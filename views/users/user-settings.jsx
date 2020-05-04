var React = require("react");
import Nav from "../components/nav";
import Head from "../components/header";
import BootstrapJs from "../components/bootstrap-js";

class EditUser extends React.Component {
  render() {
    const loginData = this.props.loginData;
    const account = this.props.accountDetails;
    const locations = this.props.locations;
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

    return (
      <html>
        <Head />
        <body className="bg-dark">
          <Nav loginData={loginData} />
          <div className="jumbotron bg-dark text-white">
            <h3>Edit Profile</h3>
            <form
              encType="multipart/form-data"
              id="editUser"
              action="/users?_method=put"
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
                    value={account.username}
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
                    value={account.user_displayname}
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
                    form="editUser"
                    name="inputLocation"
                    className="form-control"
                    id="locationsOptions"
                  >
                    <option value={account.location_id}>
                      {account.location_name}
                    </option>
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

module.exports = EditUser;
