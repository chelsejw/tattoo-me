var React = require("react");
import Nav from "../components/nav";
import Head from "../components/header";
import BootstrapJs from "../components/bootstrap-js";


      const moment = require("moment");
      moment().format();

class TattooPage extends React.Component {
  render() {
            const loginData = this.props.loginData;
      const tattoo = this.props.tattooData

      const artistId = tattoo.artist_id
      const userType = loginData.currentUserType
      const accountId = loginData.currentAccountId

      const controls = ()=>{
              if (userType == "artist" && artistId == accountId) {
                return (
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
                );
              }

      }


    return (
      <html>
        <Head />
        <body className="bg-dark text-white">
          <Nav loginData={loginData} />
          <div className="jumbotron bg-dark">
            <div class="col">
              <div id={`tattooId_${tattoo.tattoo_id}`} class="card text-dark">
                <div class="card-img-bg">
                  <a href={`/tattoos/${tattoo.tattoo_id}`}>
                    <img
                      src={tattoo.tattoo_img}
                      class="card-img-top"
                      alt="..."
                    />
                  </a>
                </div>
                <div class="card-body">
                  <h6 class="card-title">
                    Tattoo by:{" "}
                    <a
                      className="text-muted"
                      href={`/artists/${tattoo.artist_id}`}
                    >
                      {tattoo.artist_displayname} @
                      {tattoo.artist_username}
                    </a>
                  </h6>
                  <p class="card-text">
                    <p id={`body_${tattoo.tattoo_id}`} class="card-text"></p>
                  </p>

                  {controls()}
                </div>
              </div>
            </div>

          </div>

          <BootstrapJs />
          <script src="/ajax/tattoos/tattooresults.js"></script>
        </body>
      </html>
    );
  }
}

module.exports = TattooPage;
