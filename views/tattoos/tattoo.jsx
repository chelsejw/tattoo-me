var React = require("react");
import Nav from "../components/nav";
import Head from "../components/header";
import BootstrapJs from "../components/bootstrap-js";

class TattooPage extends React.Component {
  render() {

      const tattoo = this.props.tattooData
    return (
      <html>
        <Head />
        <body className="bg-dark text-white">
          <Nav />
          <div className="jumbotron bg-dark">
          <img src={tattoo.tattoo_img}></img>
          <h1>Tattoo by: {tattoo.artist_displayname} @{tattoo.artist_username}</h1>
          </div>

          <BootstrapJs />
        </body>
      </html>
    );
  }
}

module.exports = TattooPage;
