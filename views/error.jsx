var React = require("react");
import Nav from "./components/nav";
import Head from "./components/header";
import BootstrapJs from "./components/bootstrap-js";

class Error extends React.Component {
  render() {
    const loginData = this.props.loginData;
    return (
      <html>
        <Head />
        <body className="bg-dark">
          <Nav loginData={loginData} />
          <div className="jumbotron bg-dark text-white">
            <div class="alert alert-danger" role="alert">
              {this.props.errorMsg}
            </div>
          </div>

          <BootstrapJs />
        </body>
      </html>
    );
  }
}

module.exports = Error;
