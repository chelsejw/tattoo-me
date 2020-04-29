const React = require("react");
import Nav from "./components/nav"

class Home extends React.Component {
  render() {

    return (
      <html lang="en" dir="ltr">
        <head>
          <meta charset="UTF-8" />

          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
            integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
            crossorigin="anonymous"
          />
          <link rel="stylesheet" href="styles.css" />
          <title>Index</title>
        </head>

        <body className="home-body">
          <Nav />
          <div class="welcome-container container">
            <div class="welcome-slogan">
              <h1>Find your desired artist in seconds.</h1>
            </div>

            <div class="search-fields container">
              <form>
                <div class="row">
                  <div class="col-md-5 col-sm-12">
                    <h3>I'm looking for...</h3>
                    <select class="form-control">
                      <option>Default select</option>
                    </select>
                  </div>
                  <div class="col-md-5 col-sm-12">
                    <h3>In...</h3>
                    <select class="form-control">
                      <option>Default select</option>
                    </select>
                  </div>

                  <div class="col-md-2 col-sm-12">
                    <button id="submit-query-btn" class="btn btn-outline-light">
                      Go!
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;
