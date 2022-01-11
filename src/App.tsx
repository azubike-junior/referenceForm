import React, { Suspense, lazy, useEffect } from "react";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Loader from "./components/Loader/index";
import PrivateRoute from "./components/Routes/PrivateRoute/index";
import CsHeader from "./components/CcHeader";
import RefererForm from "./components/ReferenceForm";

const AccountOpenSuccessPage = lazy(
  () => import("./pages/AccountOpenSuccessPage")
);

function App() {
  return (
    <div className="hero-anime">
      <Router>
        <Switch>
          <Suspense fallback={Loader}>
            {/* <Route path="/savings_success" exact component={AccountOpenSuccessPage} /> */}
            <Route path="/referee/:email/:fullName/:phone" exact>
              <div className="pb-5 overflowhidden">
                <CsHeader />
                <RefererForm />
              </div>
            </Route>
            <Route path="/success" component={AccountOpenSuccessPage} />
          </Suspense>
        </Switch>
        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default App;
