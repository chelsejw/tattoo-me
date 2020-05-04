var React = require("react");
import Nav from "../components/nav";
import Head from "../components/header";
import BootstrapJs from "../components/bootstrap-js";

const moment = require("moment");
moment().format();

class UserLikes extends React.Component {
  render() {
    const tattoos = this.props.tattoos;
    const loginData = this.props.loginData;


    let resultsLength = 0;

    if (tattoos !== null) {
      resultsLength = tattoos.length;
    }

    let tattooCards;
    if (tattoos !== null) {
      tattooCards = tattoos.map((tattoo) => {
        const dateAdded = moment(tattoo.created_at).fromNow();
        return (
          <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
            <div id={`tattooId_${tattoo.tattoo_id}`} class="card shadow mb-5">
              <div class="card-img-bg">
                <a href={`/tattoos/${tattoo.tattoo_id}`}>
                  <img src={tattoo.tattoo_img} class="card-img-top" alt="..." />
                </a>
              </div>
              <div class="card-body">
                <h6 class="card-title">
                  By:{" "}
                  <a
                    className="text-muted"
                    href={`artists/${tattoo.artist_id}`}
                  >
                    {tattoo.artist_displayname} @{tattoo.artist_username}
                  </a>
                </h6>
                <p class="card-text">
                  <p id={`body_${tattoo.tattoo_id}`} class="card-text"></p>
                </p>
              </div>
              <div class="card-footer">
                <small class="text-muted">Added {dateAdded}</small>
                <div
                  class="float-right"
                  id={`tattoo_like_btn_${tattoo.tattoo_id}`}
                ></div>
              </div>
            </div>
          </div>
        );
      });
    }

    return (
      <html>
        <Head />
        <body>
          <Nav loginData={loginData} />
          <div class="row" id="body-row">
            <div class="col py-3 main-content">
              <h3>
              Tattoos You Liked
              </h3>

              <hr />
              <div className="container-fluid">
                <div className="row card-deck">{tattooCards}</div>
              </div>
            </div>
          </div>

          <BootstrapJs />
          <script src="ajax/tattoos/tattooresults.js"></script>
        </body>
      </html>
    );
  }
}

module.exports = UserLikes;
