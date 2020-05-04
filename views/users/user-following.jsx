var React = require("react");
import Nav from "../components/nav";
import Head from "../components/header";
import BootstrapJs from "../components/bootstrap-js";

          const moment = require("moment");
          moment().format();

class ArtistRegister extends React.Component {
  render() {


      const loginData = this.props.loginData;
      const resultsArr = this.props.artists 
      console.log(resultsArr)

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
                    <a href={`/artists/${result.artist_id}`}>
                      <img
                        src={result.artist_img}
                        class="card-img-top"
                        alt="..."
                      />
                    </a>
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
                    <p>
                      Location:{" "}
                      <a
                        className="text-muted"
                        href={`/artists?locationId=${result.location_id}&hashtagId=all&sortBy=all`}
                      >
                        {result.location_name}
                      </a>
                      <br />
                      <small>
                        <a href={result.website}>Go to Website</a>
                      </small>
                    </p>

                    {availability}
                    <p class="card-text"></p>
                  </div>
                  <div class="card-footer">
                    <small class="text-muted">Joined {ago}</small>
                    <div
                      class="float-right"
                      id={`artist_follow_btn_${result.artist_id}`}
                    ></div>
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
          <script src="ajax/artists/artistresults.js"></script>
          <BootstrapJs />
        </body>
      </html>
    );
  }
}

module.exports = ArtistRegister;
