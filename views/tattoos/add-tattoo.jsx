var React = require("react");
import Nav from "../components/nav";
import Head from "../components/header";
import BootstrapJs from "../components/bootstrap-js";

class AddTattoo extends React.Component {
  render() {
    return (
      <html>
        <Head />
        <body className="bg-dark text-white">
          <Nav />
          <div className="jumbotron bg-dark">
            <h3>Upload tattoos to your portfolio</h3>

<form enctype="multipart/form-data" action="/tattoos" method="POST">
  <input type="file" name="myFile"/>
  <input type="submit" class="btn btn-primary"/>
</form>

          </div>

          <BootstrapJs />
        </body>
      </html>
    );
  }
}

module.exports = AddTattoo;
