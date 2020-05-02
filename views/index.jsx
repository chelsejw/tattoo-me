const React = require("react");
import Nav from "./components/nav";
import Head from "./components/header";
import BootstrapJs from "./components/bootstrap-js";

class Home extends React.Component {
  render() {
    const hashtagsArr = this.props.hashtags
    const locationsArr = this.props.locations;
            const loginData = this.props.loginData;
    const hashtagsOptions = hashtagsArr.map( hashtag => {
      return <option key={hashtag.hashtag_id} value={hashtag.hashtag_id}>{hashtag.hashtag_name}</option>
    })
        const locationsOptions = locationsArr.map((location) => {
          return (
            <option value={location.location_id} key={location.location_id}>
              {location.location_name}
            </option>
          );
        });


    return (
      <html lang="en" dir="ltr">
        <Head />

        <body className="home-body">
          <Nav loginData={loginData}/>
          <div className="welcome-container container">
            <div className="welcome-slogan">
              <h1>Find your desired artist in seconds.</h1>
            </div>

            <div className="search-fields container">
              <form action="/artists" method="get">
                <div className="row">
                  <div className="col-md-5 col-sm-12">
                    <h3>I'm looking for...</h3>
                    <select name="hashtagId" className="form-control">
                      <option value="all">All</option>
                      {hashtagsOptions}
                    </select>
                  </div>
                  <div className="col-md-5 col-sm-12">
                    <h3>In...</h3>
                    <select name="locationId" className="form-control">
                      <option value="all">Everywhere</option>

                      {locationsOptions}
                    </select>
                  </div>

                  <div className="col-md-2 col-sm-12">
                    <button
                      id="submit-query-btn"
                      className="btn btn-outline-light"
                    >
                      Go!
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <BootstrapJs />
        </body>
      </html>
    );
  }
}

module.exports = Home;
