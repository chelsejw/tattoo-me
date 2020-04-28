const React = require("react");

class Home extends React.Component {
  render() {

    return (
      <html lang="en" dir="ltr">
        <head>
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
            integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
            crossOrigin="anonymous"
          />
          <link rel="stylesheet" href="/style.css"/>
        </head>

        <body>
          <div className="container-fluid">
            <div className="row">

                <h1>Username</h1>            

            </div>
          </div>


        </body>
      </html>
    );
  }
}

module.exports = Home;
