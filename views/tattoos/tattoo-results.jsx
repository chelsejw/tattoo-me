var React = require("react");
import Nav from "../components/nav";
import Head from "../components/header";
import BootstrapJs from "../components/bootstrap-js";

      const moment = require("moment");
      moment().format();


class TattooPage extends React.Component {
  render() {
    const tattoos = this.props.results;
                const loginData = this.props.loginData;
                let tattooCards;

                if (tattoos!==null){
     tattooCards = tattoos.map((tattoo) => {
      const dateAdded = moment(tattoo.created_at).fromNow();

      return (
        <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
          <div id={`tattooId_${tattoo.tattoo_id}`} class="card">
            <div class="card-img-bg">
              <a href={`/tattoos/${tattoo.tattoo_id}`}>
                <img src={tattoo.tattoo_img} class="card-img-top" alt="..." />
              </a>
            </div>
            <div class="card-body">
              <h6 class="card-title">
                By:{" "}
                <a className="text-muted" href={`artists/${tattoo.artist_id}`}>
                  {tattoo.artist_displayname} @{tattoo.artist_username}
                </a>
              </h6>
              <p class="card-text">
                <p id={`body_${tattoo.tattoo_id}`} class="card-text"></p>
              </p>
            </div>
            <div class="card-footer">
              <small class="text-muted">Added {dateAdded}</small>
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
            <div
              id="sidebar-container"
              class="sidebar-expanded d-none d-md-block col-2"
            >
              <ul class="list-group sticky-top sticky-offset">
                <li class="list-group-item sidebar-separator-title text-muted d-flex align-items-center menu-collapsed">
                  <small>SEARCH FILTERS</small>
                </li>
                <form action="/artists" method="get">
                  <li class="list-group-item sidebar-separator-title text-muted d-flex align-items-center menu-collapsed">
                    <small>STYLE</small>
                  </li>
                  <a
                    href="#"
                    class="bg-dark list-group-item list-group-item-action"
                  >
                    <select
                      name="hashtagId"
                      class="form-control form-control-sm"
                    >
                      <option value="all">All</option>
                      {}
                    </select>
                  </a>

                  <li class="bg-dark d-flex list-group-item justify-content-center">
                    <button
                      type="submit"
                      className="btn btn-outline-light btn-sm"
                    >
                      Go!
                    </button>
                  </li>
                </form>
              </ul>
            </div>

            <div class="col py-3 main-content">
              <h3>
                Showing <span class="text-muted">{tattoos.length}</span> results
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

module.exports = TattooPage;
