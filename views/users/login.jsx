var React = require("react");
import Nav from "../components/nav";
import Head from "../components/header";
import BootstrapJs from "../components/bootstrap-js";


class UserLogin extends React.Component {
  render() {

              const sha256 = require("js-sha256");
              console.log(`test in hash is`, sha256("test"));

                const loginData = this.props.loginData;
    return (
      <html>
        <Head />
        <body className="bg-dark text-white">
          <Nav loginData={loginData} />
          <div className="jumbotron bg-dark">
            <h3>Login as a User</h3>

            <form className="form-inline" action="/users/login" method="POST">
              <div className="input-group mb-2 mr-sm-2">
                <div className="input-group-prepend">
                  <div className="input-group-text">@</div>
                </div>
                <input
                  type="text"
                  className="form-control"
                  name="handle"
                  placeholder="Username"
                  value="test_user"
                />
              </div>

              <input
                type="password"
                className="form-control mb-2 mr-sm-2"
                name="password"
                placeholder="Password"
                value="test"
              />


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

module.exports = UserLogin;
