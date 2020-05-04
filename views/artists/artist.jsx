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
            const ago = moment(artist.created_at).fromNow();

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
    <body>
      <Nav loginData={loginData} />
      <div class="row" id="body-row">
        <div
          id="sidebar-container"
          class="sidebar-expanded d-none d-md-block col-3 bg-white"
        >
          <div class="sticky-top sticky-offset">
            <div
              key={artist.artist_id}
              id={`artist_${artist.artist_id}`}
              class="card mt-3 ml-4 shadow"
            >
              <div class="card-img-bg">
                <img src={artist.artist_img} class="card-img-top" alt="..." />
              </div>
              <div id={`artist_body_${artist.artist_id}`} class="card-body">
                <h5 class="card-title">
                  <a
                    className="text-dark"
                    href={`/artists/${artist.artist_id}`}
                  >
                    <strong>{artist.artist_displayname}</strong> @
                    {artist.artist_username}
                  </a>
                </h5>
                <p>
                  Location:{" "}
                  <a
                    className="text-muted"
                    href={`/artists?locationId=${artist.location_id}&hashtagId=all&sortBy=all`}
                  >
                    {artist.location_name}
                  </a>
                  <br />
                  <a href={artist.website}>Go to Website</a>
                </p>
                <p class="card-text"></p>
              </div>
              <div class="card-footer">
                <small class="text-muted">Joined {ago}</small>
              </div>
            </div>
          </div>
        </div>
        <div className="col py-3 main-content">
          <div className="row card-deck" id="artist-gallery">
            {tattooCards}
          </div>
        </div>
      </div>

      <BootstrapJs />
      <script src="/ajax/artists/single-artist-hashtags.js"></script>
    </body>
  </html>
);
  }
}

module.exports = TattooPage;



