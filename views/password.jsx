var React = require("react");
import Nav from "./components/nav";
import Head from "./components/header";
import BootstrapJs from "./components/bootstrap-js";

class PasswordChange extends React.Component {
  render() {
    const loginData = this.props.loginData;

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
    const error = this.props.errorMsg;

    const errorAlert = () => {
      if (error) {
        return (
          <div class="alert alert-danger" role="alert">
            {this.props.errorMsg}
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
            <h3>Change Your Password</h3>
            {successAlert()}
            {errorAlert()}
            <form
              className="form-inline"
              action="/settings/password?_method=put"
              method="POST"
            >
              <div className="input-group mb-2 mr-sm-2">
                <div className="input-group-prepend">
                  <div className="input-group-text">Old</div>
                </div>
                <input
                  type="password"
                  className="form-control"
                  name="oldPassword"
                  placeholder="Old Password"
                />
              </div>
              <div className="input-group mb-2 mr-sm-2">
                <div className="input-group-prepend">
                  <div className="input-group-text">New</div>
                </div>
                <input
                  type="password"
                  className="form-control"
                  name="newPassword"
                  placeholder="New Password"
                />
              </div>

              <button type="submit" className="btn btn-primary mb-2">
                Login
              </button>
            </form>
          </div>

          <BootstrapJs />
        </body>
      </html>
    );
  }
}

module.exports = PasswordChange;
