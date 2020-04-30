var React = require("react");
import Nav from "../components/nav";
import Head from "../components/header";
import BootstrapJs from "../components/bootstrap-js";

class ArtistRegister extends React.Component {
  render() {

      const resultsArr = this.props.results 
      const queries = this.props.queries

      console.log(`resultsArr is`, resultsArr)
      console.log(`queries are`, queries)


      const resultElements = resultsArr.map(result => {
            let availability = <button className="btn btn-sm btn-success">Open</button>
      
            if (!result.booking_avail) {
                  availability = (
                    <button className="btn btn-sm btn-danger">Closed</button>
                  );
            }

            return (
              <div>
                <div className="artist-result-container container-fluid">
                  <br />@{result.artist_username}
                  <br />
                  {result.location_name}
                  <br />
                  Booking availability: {availability}
                  <br />
                  {result.hashtag_name}
                </div>

                <hr/>
              </div>
            );
      })

      
            // <div className="artist-result-container container-fluid">
            //     <br/>@frankiesexton
            //     <br/>Location:
            //     <br/>Reviews
            //     <br/>Rating
            //     <br/>IG | FB
            //     <br/>Availability
            // </div>

    return (
      <html>
        <Head />
        <body>
          <Nav />

          <div className="row" id="body-row">
            <div id="sidebar-container" className="sidebar-expanded d-none d-md-block col-2">
            <ul className="list-group sticky-top sticky-offset">
                <li className="bg-dark list-group-item sidebar-separator-title text-muted d-flex align-items-center menu-collapsed">
                    <small>SEARCH FILTERS</small>
                </li>
              <li className="list-group-item sidebar-separator-title text-muted d-flex align-items-center menu-collapsed">
                    <small>STYLE</small>
                </li>
                <a href="#" className="bg-dark list-group-item list-group-item-action">
                    <select className="form-control form-control-sm">
                        <option>Large select</option>
                    </select>
                </a>
                <li className="list-group-item sidebar-separator-title text-muted d-flex align-items-center menu-collapsed">
                    <small>LOCATION</small>
                </li>

                <a href="#" className="bg-dark list-group-item list-group-item-action">
                    <select className="form-control form-control-sm">
                        <option>Large select</option>
                    </select>
                </a>
                {/* <li className="list-group-item sidebar-separator-title text-muted d-flex align-items-center menu-collapsed">
                    <small>DATES</small>
                </li>

                <a href="#" className="bg-dark list-group-item list-group-item-action">
                    <select className="form-control form-control-sm">
                        <option>From...</option>
                    </select>
                </a>
                <a href="#" className="bg-dark list-group-item list-group-item-action">
                    <select className="form-control form-control-sm">
                        <option>To...</option>
                    </select>
                </a>
                <li className="list-group-item sidebar-separator-title text-muted d-flex align-items-center menu-collapsed">
                    <small>SORT OPTIONS</small>
                </li>

                <a href="#" className="bg-dark list-group-item list-group-item-action">
                    <select className="form-control form-control-sm">
                        <option>From...</option>
                    </select>
                </a>


                <li className="list-group-item logo-separator d-flex justify-content-center">
                    <img src="https://www.iconsdb.com/icons/preview/white/tattoo-machine-xxl.png" width="30"
                        height="30"/>
                </li> */}
            </ul>

        </div>



        <div className="col py-3 main-content">
            <h3>Showing <span className="text-muted">{resultsArr.length}</span> results for <span className="text-muted">hashtag</span> tattoo
                artists in <span className="text-muted">location</span> between <span className="text-muted">any time</span>
            </h3>

            <hr/>

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
