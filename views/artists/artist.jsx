var React = require("react");
import Nav from "../components/nav";
import Head from "../components/header";
import BootstrapJs from "../components/bootstrap-js";


class TattooPage extends React.Component {
  render() {
            const loginData = this.props.loginData;
const artist = this.props.artistData[0]
const tattoos = this.props.tattooData
let tattooCards;


      const moment = require("moment");
      moment().format();

if (tattoos!==null){
    tattooCards = tattoos.map( tattoo => {
      return (
        <div
          key={tattoo.tattoo_id}
          id={`tattooId_${tattoo.tattoo_id}`}
          className="card col-lg-2 col-md-4 col-sm-6"
          style={{ margin: "10px" }}
        >
          <img src={tattoo.tattoo_img} class="card-img-top" alt="..." />
          <div class="card-body text-dark">
            <h6 class="card-title">
              Added {moment(tattoo.created_at).format("DD MMM YY")}
            </h6>
            <p id={`body_${tattoo.tattoo_id}`} class="card-text"></p>
          </div>
        </div>
      );
    });
  } else {
    tattooCards = <h6>No tattoos found.</h6>
  }

return (
  <html>
    <Head />
    <body className="bg-dark text-white">
      <Nav loginData={loginData} />
      <div className="container-fluid">
        <h3>
          {artist.artist_displayname} @{artist.artist_username}{" "}
        </h3>

        <img src={artist.artist_img}></img>
        <p id="artistId" style={{ display: "none" }}>
          {artist.artist_id}
        </p>
      </div>
        <h2>Portfolio</h2>
        <div className="row" id="artist-gallery">
          {tattooCards}
        </div>

      <BootstrapJs />
      <script src="/ajax/tattoos/tattooresults.js"></script>
    </body>
  </html>
);
  }
}

module.exports = TattooPage;



