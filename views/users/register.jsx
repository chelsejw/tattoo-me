var React = require("react");
import Nav from "../components/nav";
import Head from "../components/header";
import BootstrapJs from "../components/bootstrap-js";

class Login extends React.Component {
  render() {

    const locationsArr = this.props.locations
    const locationsOptions = locationsArr.map( location => {
      return <option value={location.location_id} key={location.location_id}>{location.location_name}</option>
    })

    return (
      <html>
        <Head />
        <body className="bg-dark">
          <Nav />
          <div class="jumbotron bg-dark text-white">
            <form id="newUser" action="/users" method="post">
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="inputEmail4">Username</label>
                  <input
                    type="text"
                    class="form-control"
                    name="inputUsername"
                    placeholder="Username"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="inputPassword4">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    name="inputPassword"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="inputEmail4">Display Name</label>
                  <input
                    type="text"
                    class="form-control"
                    name="inputDisplayName"
                    placeholder="Display Name"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="inputPassword4">Email</label>
                  <input
                    type="text"
                    class="form-control"
                    name="inputEmail"
                    placeholder="Email"
                  />
                </div>
              </div>

              <div class="form-row">
                <div class="form-group col-md-3">
                  <label for="inputEmail4">Location</label>
                  <select form="newUser" name="inputLocation" class="form-control">
                    {locationsOptions}
                  </select>
                </div>
                <div class="form-group col-md-9">
                  <label for="inputPassword4">Profile Picture URL</label>
                  <input
                    type="text"
                    class="form-control"
                    name="inputImage"
                    placeholder="Image URL"
                  />
                </div>
              </div>

              <button type="submit" class="btn btn-primary">
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
