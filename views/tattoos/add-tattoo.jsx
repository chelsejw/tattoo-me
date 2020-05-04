var React = require("react");
import Nav from "../components/nav";
import Head from "../components/header";
import BootstrapJs from "../components/bootstrap-js";

class AddTattoo extends React.Component {
  render() {
                const loginData = this.props.loginData;

 const hashtags = this.props.hashtags;

 const hashtagsCheckList = hashtags.map((hashtag) => {
   return (
     <div className="form-check-inline">
       <input
         type="checkbox"
         name="hashtags"
         value={hashtag.hashtag_id}
         className="form-check-input"
         id={`hashtag_${hashtag.hashtag_id}`}
       />
       <label className="form-check-label">
         {hashtag.hashtag_name}
       </label>
     </div>
   );
 });


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
              <br />
              <label htmlFor="myFile">Upload tattoo image</label>
              <input
                type="file"
                className="form-control-file"
                name="myFile"
                placeholder="Image"
                required
              />
              <br />
              <label htmlFor="inputHashtag">Add Hashtags</label>
              <br />
              {hashtagsCheckList}
              <br />
              <p>
                <button
                  type="submit"
                  id="submitBtn"
                  className="btn btn-primary mt-3 mb-2"
                >
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
