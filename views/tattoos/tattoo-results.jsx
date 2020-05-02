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
          className="card bg-dark col-lg-3 col-md-4 col-sm-6 text-white"
        >
          <img src={tattoo.tattoo_img} class="card-img-top" alt="..." />
          <div class="card-body">
            <h6 class="card-title">
              By{" "}
              <a className="text-white" href={`artists/${tattoo.artist_id}`}>
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
        <body className="bg-dark text-white">
          <Nav loginData={loginData} />
          <div className="container">
            <div className="row">{tattooCards}</div>
          </div>

          <BootstrapJs />
          <script src="ajax/tattoos/tattooresults.js"></script>
        </body>
      </html>
    );
  }
}

module.exports = TattooPage;
