var React = require("react");
import Nav from "../components/nav";
import Head from "../components/header";
import BootstrapJs from "../components/bootstrap-js";

class ArtistRegister extends React.Component {
  render() {
                const loginData = this.props.loginData;
      const locations = this.props.locations
      const hashtags = this.props.hashtags
      const resultsArr = this.props.results 
      console.log(resultsArr)

      const locationsOptions = locations.map( location => {
          return <option key={location.location_id} value={location.location_id}>{location.location_name}</option>
      })
      const hashtagOptions = hashtags.map( hashtag => {
        return (
          <option key={hashtag.hashtag_id} value={hashtag.hashtag_id}>
            {hashtag.hashtag_name}
          </option>
        );
      });



      const resultElements = resultsArr.map(result => {
            let availability = <button className="btn btn-sm btn-success">Bookings Open</button>
      
            if (!result.booking_avail) {
                  availability = (
                    <button className="btn btn-sm btn-danger">Bookings Closed</button>
                  );
            }
            return (
              <div>
                <div className="artist-result-container container-fluid">
                <img src={result.artist_img} class="result-artist-img rounded-circle"/>

                  <br /> <strong>{result.artist_displayname}</strong> @{result.artist_username}
                  <br />
                  {result.location_name}
                  <br />
                  {availability}
                  <br />
                  {result.hashtag_name}
                </div>

                <hr />
              </div>
            );
      });

    return (
      <html>
        <Head />
        <body>
          <Nav loginData={loginData}/>
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
                      {hashtagOptions}
                    </select>
                  </a>
                  <li class="list-group-item sidebar-separator-title text-muted d-flex align-items-center menu-collapsed">
                    <small>LOCATION</small>
                  </li>
                  <a
                    href="#"
                    class="bg-dark list-group-item list-group-item-action"
                  >
                    <select
                      name="locationId"
                      class="form-control form-control-sm"
                    >
                      <option value="all">All</option>
                      {locationsOptions}
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
                Showing <span class="text-muted">{resultsArr.length}</span>{" "}
                results
              </h3>

              <hr />
              {resultElements}
            </div>
          </div>

          <BootstrapJs />
        </body>
      </html>
    );
  }
}

module.exports = ArtistRegister;
