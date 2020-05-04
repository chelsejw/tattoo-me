
var React = require("react");
import Nav from "../components/nav";
import Head from "../components/header";
import BootstrapJs from "../components/bootstrap-js";

const moment = require("moment");
moment().format();

class EditTattoo extends React.Component {
  render() {
    const loginData = this.props.loginData;
    const tattoo = this.props.tattoo
    const success = this.props.successMsg;
    const hashtags = this.props.hashtags;

    const hashtagsCheckList = hashtags.map( hashtag => {

                        return (
                          <div className="form-check-inline">
                            <input
                              type="checkbox"
                              name="hashtags"
                              value={hashtag.hashtag_id}
                              className="form-check-input"
                              id={`hashtag_${hashtag.hashtag_id}`}
                            />
                            <label className="form-check-label text-dark">
                              {hashtag.hashtag_name}
                            </label>
                          </div>
                        );
            })


    const successAlert = () => {
      if (success) {
        return (
          <div class="alert alert-success" role="alert">
            {this.props.successMsg}
          </div>
        );
      }
    };

    return (
      <html>
        <Head />
        <body className="bg-dark text-white">
          <Nav loginData={loginData} />
          <div className="jumbotron bg-dark">
            <h3>Change Tattoo Hashtags</h3>

            {successAlert()}
            <form
              className="form"
              action={`/tattoos/${tattoo.tattoo_id}?_method=put`}
              method="POST"
            >
              <div class="col">
                <div id={`tattooId_${tattoo.tattoo_id}`} class="card text-dark">
                  <div class="card-img-bg">
                    <a href={`/tattoos/${tattoo.tattoo_id}`}>
                      <img
                        src={tattoo.tattoo_img}
                        class="card-img-top"
                        alt="..."
                      />
                    </a>
                  </div>
                  <div class="card-body">
                    <h6 class="card-title">
                      <a
                        className="text-muted"
                        href={`/tattoos/${tattoo.tattoo_id}`}
                      >
                        Lasted updated {moment(tattoo.updated_at).fromNow()}
                      </a>
                    </h6>
                    <p class="card-text">
                      <p id={`body_${tattoo.tattoo_id}`} class="card-text">
                        {hashtagsCheckList}
                      </p>
                    </p>

                    <button type="submit" id="submitBtn" className="btn btn-primary mb-2">
                      Update Tattoo
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <BootstrapJs />
          <script src="/ajax/edit-hashtags.js"></script>
          <script src="/ajax/hashtag_manip.js"></script>
        </body>
      </html>
    );
  }
}

module.exports = EditTattoo;
