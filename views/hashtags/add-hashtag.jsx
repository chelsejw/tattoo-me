var React = require("react");
import Nav from "../components/nav";
import Head from "../components/header";
import BootstrapJs from "../components/bootstrap-js";

class AddHashtag extends React.Component {
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
            <h3>Submit A New Hashtag</h3>

            <form className="form-inline" action="/hashtags" method="POST">
              <div className="input-group mb-2 mr-sm-2">
                <div className="input-group-prepend">
                  <div className="input-group-text">#</div>
                </div>
                <input
                  type="text"
                  className="form-control"
                  name="newHashtag"
                  placeholder="Hashtag Name"
                />
              </div>

              <button type="submit" className="btn btn-primary mb-2">
                Add Hashtag
              </button>
            </form>
            {successAlert()}
            {errorAlert()}
          </div>

          <BootstrapJs />
        </body>
      </html>
    );
  }
}

module.exports = AddHashtag;
