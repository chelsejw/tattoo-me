var React = require("react");
import Nav from "../components/nav";
import Head from "../components/header";
import BootstrapJs from "../components/bootstrap-js";

class Login extends React.Component {
  render() {
            const loginData = this.props.loginData;
    const locationsArr = this.props.locations
    const locationsOptions = locationsArr.map( location => {
      return <option value={location.location_id} key={location.location_id}>{location.location_name}</option>
    })

    return (
      <html>
        <Head />
        <body className="bg-dark">
          <Nav loginData={loginData} />
          <div className="jumbotron bg-dark text-white">
            <h3>Sign-up as a User</h3>
            <form
              id="newUser"
              action="/users"
              method="post"
              encType="multipart/form-data"
            >
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="inputEmail4">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    name="inputUsername"
                    placeholder="Username"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputPassword4">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="inputPassword"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="inputEmail4">Display Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="inputDisplayName"
                    placeholder="Display Name"
                  />
                </div>
                <div className="form-group col-md-6">
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
                  <label htmlFor="inputEmail4">Location</label>
                  <select
                    form="newUser"
                    name="inputLocation"
                    className="form-control"
                  >
                    {locationsOptions}
                  </select>
                </div>
                <div className="form-group col-md-9">
                  <label htmlFor="myFile">Profile Picture Upload</label>
                  <input
                    type="file"
                    className="form-control-file"
                    name="myFile"
                    placeholder="Image"
                    required
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

module.exports = Login;
