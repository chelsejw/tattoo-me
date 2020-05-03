var React = require("react");
import Nav from "../components/nav";
import Head from "../components/header";
import BootstrapJs from "../components/bootstrap-js";

class TattooPage extends React.Component {
  render() {
    const tattoos = this.props.results;
                const loginData = this.props.loginData;

    const tattooCards = tattoos.map(tattoo=> {
      return (
        <div
          key={tattoo.tattoo_id}
          id={tattoo.tattoo_id}
          className="card text-center col-lg-4 col-md-6"
        >
          <div className="card-img-bg">
            <img
              src={tattoo.tattoo_img}
              class="card-img-top mx-auto"
              alt="..."
            />
          </div>
          <div class="card-body">
            <h6 class="card-title">
              By{" "}
              <a href={`artists/${tattoo.artist_id}`}>
                {tattoo.artist_displayname} @{tattoo.artist_username}
              </a>
            </h6>
            <p id={`body_${tattoo.tattoo_id}`} class="card-text"></p>
          </div>
        </div>
      );
    })

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

                  <li class="list-group-item logo-separator d-flex justify-content-center">
                    <img
                      src="https://www.iconsdb.com/icons/preview/white/tattoo-machine-xxl.png"
                      width="30"
                      height="30"
                    />
                  </li>
                </form>
              </ul>
            </div>

            <div class="col py-3 main-content">
              <h3>
                Showing <span class="text-muted">{tattoos.length}</span> results
              </h3>

              <hr />
              <div className="row">{tattooCards}</div>
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
