var React = require("react");
import Nav from "../components/nav";
import Head from "../components/header";
import BootstrapJs from "../components/bootstrap-js";

class AddTattoo extends React.Component {
  render() {
                const loginData = this.props.loginData;

                const hashtags = this.props.hashtags


                const hashtagOptions = hashtags.map( hashtag => {
                  return <option key={hashtag.hashtag_id} id={`option-${hashtag.hashtag_id}`} value={hashtag.hashtag_id}>{hashtag.hashtag_name}</option>
                })

    return (
      <html>
        <Head />
        <body className="bg-dark text-white">
          <Nav loginData={loginData} />
          <div className="jumbotron bg-dark">
            <h3>Upload tattoos to your portfolio</h3>

            <form
              encType="multipart/form-data"
              action="/tattoos"
              method="POST"
              id="newTattoo"
            >
              <input
                type="file"
                className="form-control-file"
                name="myFile"
                placeholder="Image"
              />
              <label htmlFor="inputHashtag">Add Hashtags</label>
              <select
                id="hashtagOptions"
              >
                {hashtagOptions}
              </select>
              <button id="add-hashtag" className="btn btn-sm btn-primary">
                +
              </button>
              <div id="hashtags-selected">
              </div>
              <p>
                <button type="submit" className="btn btn-primary mb-2">
                  Add To Portfolio
                </button>
              </p>
            </form>
          </div>

          <BootstrapJs />
          <script src="../ajax/hashtag_manip.js"></script>
        </body>
      </html>
    );
  }
}

module.exports = AddTattoo;
