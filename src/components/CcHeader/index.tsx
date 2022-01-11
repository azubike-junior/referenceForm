import React from "react";
import logo from "../../assets/images/new_logo.png";

export default function CsHeader() {
  return (
    <div>
      <div className="navigation-wrap text-suntrust start-header start-style">
        <div className="row">
          <div className="col-12">
            <nav className="navbar navbar-expand-md navbar-light">
              <a
                className="navbar-brand"
                href="https://suntrustng.com/"
                target="_self"
              >
                <img src={logo} alt="" />
              </a>

              <button
                className="navbar-toggler ref"
                type="button"
                data-bs-toggle="collapse"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div
                className="collapse navbar-collapse ref"
                id="navbarSupportedContent"
              >
                {/* <ul className="navbar-nav ml-auto py-4 py-md-0">
                  <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
                    <a
                      href="https://suntrustng.com/"
                      className="btn btn-block btn-suntrust font-weight-900"
                    >
                      Home
                    </a>
                  </li>
                </ul> */}
              </div>
            </nav>
          </div>
        </div>
      </div>

      <div className="main_content" id="main-content">
        <div className="page">
          <div className="flex-column">
            <div className="card nib_savings">
              <label className="text-center font-weight-700 nib">
                CURRENT ACCOUNT REFERENCE FORM
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
