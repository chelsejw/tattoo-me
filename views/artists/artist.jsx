var React = require("react");
import Nav from "../components/nav";
import Head from "../components/header";
import BootstrapJs from "../components/bootstrap-js";


class TattooPage extends React.Component {
  render() {
            const loginData = this.props.loginData;
const artist = this.props.artistData

return (
      <html>
        <Head />
        <body className="bg-dark text-white">
          <Nav />
          <div className="container-fluid">
          <img src={artist.artist_img}></img>
          <h1>{artist.artist_displayname}</h1>
          <h2>@{artist.artist_username}</h2>

          <p id="artistId" style={{display: "none"}}>{artist.artist_id}</p>
          </div>
          <BootstrapJs />
          <script src="ajax/tattoos/tattooresults.js"></script>
        </body>
      </html>
    );
  }
}

module.exports = TattooPage;



