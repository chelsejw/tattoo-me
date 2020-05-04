var React = require("react");
import Nav from "../components/nav";
import Head from "../components/header";
import BootstrapJs from "../components/bootstrap-js";

          const moment = require("moment");
          moment().format();

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

      let resultElements;
      let resultLength
      if (resultsArr!==null){
        resultLength = resultsArr.length
        resultElements = resultsArr.map(result => {
            let availability = <button className="btn btn-sm btn-success">Bookings Open</button>
      
            if (!result.booking_avail) {
                  availability = (
                    <button className="btn btn-sm btn-danger">Bookings Closed</button>
                  );
            }
            const ago = moment(result.created_at).fromNow();
            return (
              <div class="col-lg-3 col-md-6 col-sm-12">
                <div
                  key={result.artist_id}
                  id={`artist_${result.artist_id}`}
                  class="card"
                >
                  <div class="card-img-bg">
                    <a href={`/artists/${result.artist_id}`}><img
                      src={result.artist_img}
                      class="card-img-top"
                      alt="..."
                    /></a>
                  </div>
                  <div id={`body_${result.artist_id}`} class="card-body">
                    <h5 class="card-title">
                      <a
                        className="text-dark"
                        href={`/artists/${result.artist_id}`}
                      >
                        <strong>{result.artist_displayname}</strong> @
                        {result.artist_username}
                      </a>
                    </h5>
                    <p>Location: <a className="text-muted" href={`/artists?locationId=${result.location_id}&hashtagId=all&sortBy=all`}>{result.location_name}</a>
                    <br/><small><a href={`//${result.website}`}>Go to Website</a></small></p>
    
                    {availability}
                    <p class="card-text"></p>
                  </div>
                  <div class="card-footer">
                    <small class="text-muted">Joined {ago}</small>
                  </div>
                </div>
              </div>
            );
      });
      } else {
        resultLength = 0
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
                  <li class="list-group-item sidebar-separator-title text-muted d-flex align-items-center menu-collapsed">
                    <small>SORT BY</small>
                  </li>
                  <a
                    href="#"
                    class="bg-dark list-group-item list-group-item-action"
                  >
                    <select name="sortBy" class="form-control form-control-sm">
                      <option value="all">Any</option>
                      <option value="name_asc">Name (A-Z)</option>

                      <option value="name_desc">Name (Z-A)</option>
                      
                      <option value="created_desc">Newest to Oldest</option>
                      <option value="created_asc">Oldest to Newest</option>
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
                Showing <span class="text-muted">{resultLength}</span>{" "}
                results
              </h3>

              <hr />
              <div class="container-fluid">
                <div class="row card-deck card-columns">{resultElements}</div>
              </div>
            </div>
          </div>
          <script src="ajax/artists/artistresults.js"></script>
          <BootstrapJs />
        </body>
      </html>
    );
  }
}

module.exports = ArtistRegister;
