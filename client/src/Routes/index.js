import { BrowserRouter as Router, Route } from "react-router-dom";
import { PrivateRoute } from "../units/PrivateRoute";
import Header from "../components/Header";
import Home from "../components/Home";
import Prediction from "../Pages/Prediction";
import SignUp from "../Pages/Signup";
import Profile from "../Pages/Profile";
import Dashboard from "../Pages/Dashboard";
import Livestock from "../Pages/Livestock";
import LivestockCategories from "../Pages/LivestockCategories";
import LivestockData from "../Pages/LivestockData";
import Inventory from "../Pages/Inventory";
import InventoryCategories from "../Pages/InventoryCategories";
import InventoryData from "../Pages/InventoryData";
import FarmChemicals from "../Pages/FarmChemicals";
import FarmChemicalsCategories from "../Pages/FarmChemicalsCategories";
import FarmChemicalsData from "../Pages/FarmChemicalsData";
import PasswordReset from "../Pages/PasswordReset";

import Oauth from "../Pages/Oauth";

export const Routes = ({ auth }) => {
  return (
    <Router>
      <div>
        <Header auth={auth} />
        <Route path="/" exact component={Home} />
        <Route path="/predictions" exact component={Prediction} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/password/reset/:token" exact component={PasswordReset} />
        <Route path="/oAuth/google/:accessToken" exact component={Oauth} />

        {/* Private Routes */}

        <PrivateRoute path="/profile" authed={auth} exact component={Profile} />
        <PrivateRoute
          path="/dashboard"
          authed={auth}
          exact
          component={Dashboard}
        />
        <PrivateRoute
          path="/livestock"
          authed={auth}
          exact
          component={Livestock}
        />
        <PrivateRoute
          path="/livestock/categories"
          authed={auth}
          exact
          component={LivestockCategories}
        />
        <PrivateRoute
          path="/livestock/animals"
          authed={auth}
          exact
          component={LivestockData}
        />

        <PrivateRoute
          path="/inventory"
          authed={auth}
          exact
          component={Inventory}
        />
        <PrivateRoute
          path="/inventory/categories"
          authed={auth}
          exact
          component={InventoryCategories}
        />
        <PrivateRoute
          path="/inventory/items"
          authed={auth}
          exact
          component={InventoryData}
        />
        <PrivateRoute
          path="/farmchemicals"
          authed={auth}
          exact
          component={FarmChemicals}
        />
        <PrivateRoute
          path="/farmchemicals/categories"
          authed={auth}
          exact
          component={FarmChemicalsCategories}
        />
        <PrivateRoute
          path="/farmchemicals/chemicals"
          authed={auth}
          exact
          component={FarmChemicalsData}
        />
      </div>
    </Router>
  );
};
export default Routes;
