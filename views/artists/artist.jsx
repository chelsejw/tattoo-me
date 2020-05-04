var React = require("react");
import Nav from "../components/nav";
import Head from "../components/header";
import BootstrapJs from "../components/bootstrap-js";


class TattooPage extends React.Component {
  render() {
            const loginData = this.props.loginData;
const artist = this.props.artistData
const tattoos = this.props.tattooData
let tattooCards;

  const moment = require("moment");
      moment().format();

if (tattoos!==null){
    tattooCards = tattoos.map( tattoo => {
      const dateAdded = moment(tattoo.created_at).fromNow();
      return (
        <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
          <div id={`tattooId_${tattoo.tattoo_id}`} class="card text-dark">
            <div class="card-img-bg">
              <a href={`/tattoos/${tattoo.tattoo_id}`}>
                <img src={tattoo.tattoo_img} class="card-img-top" alt="..." />
              </a>
            </div>
            <div class="card-body">
              <h6 class="card-title">
                By:{" "}
                <a className="text-muted" href={`artists/${tattoo.artist_id}`}>
                  {artist.artist_displayname} @{artist.artist_username}
                </a>
              </h6>
              <p class="card-text">
                <p id={`body_${tattoo.tattoo_id}`} class="card-text"></p>
              </p>
              <div>
                <a href={`/tattoos/${tattoo.tattoo_id}/edit`}>
                  <button className="btn btn-sm btn-warning d-inline">
                    Edit
                  </button>{" "}
                </a>
                <form
                  className="form-inline d-inline"
                  action={`/tattoos/${tattoo.tattoo_id}?_method=delete`}
                  method="post"
                >
                  <button
                    type="submit"
                    className="btn btn-sm btn-danger d-inline"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </div>
            <div class="card-footer">
              <small class="text-muted">Added {dateAdded}</small>
            </div>
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



