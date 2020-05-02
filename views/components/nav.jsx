import React from "react";

class Nav extends React.Component {
      render() {

        const loginData = this.props.loginData

        const navItems = ()=> {
          let authRoutes;
          
          let artistNavs = (
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Your Portfolio
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="/tattoos/new">
                  Add Tattoo
                </a>
                <a className="dropdown-item" href="/tattoos">
                  Manage
                </a>
              </div>
            </li>
          );

          if (loginData.isLoggedIn=='true') {
            authRoutes = (
              <li className="nav-item">
                <a className="nav-link" href="/logout">
                  Logout
                </a>
              </li>
            );

              if (loginData.currentUserType=='artist'){
                return <li>{artistNavs}{authRoutes}</li>
              } else if (loginData.currentUserType==='user'){
                return authRoutes;
              }


          } else if (loginData.isLoggedIn=='false') {
            authRoutes = (
              <li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Login
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <a className="dropdown-item" href="/artists/login">
                      As Artist
                    </a>
                    <a className="dropdown-item" href="/users/login">
                      As User
                    </a>
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Register
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <a className="dropdown-item" href="/artists/register">
                      As Artist
                    </a>
                    <a className="dropdown-item" href="/users/register">
                      As User
                    </a>
                  </div>
                </li>
              </li>
            );
          }

          return authRoutes;
        }

            return (
              <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <a className="navbar-brand" href="/">
                  tattoo.me
                </a>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>

                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                      <a className="nav-link" href="#">
                        Home <span className="sr-only">(current)</span>
                      </a>
                    </li>

                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        id="navbarDropdown"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Explore
                      </a>
                      <div
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdown"
                      >
                        <a
                          className="dropdown-item"
                          href="/artists?hashtagId=all&locationId=all"
                        >
                          Artists
                        </a>
                        <a className="dropdown-item" href="/tattoos">
                          Tattoos
                        </a>
                      </div>
                    </li>

                    {navItems()}
                  </ul>
                </div>
              </nav>
            );
      }
}

export default Nav;