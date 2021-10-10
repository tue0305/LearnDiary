import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthContextProvider from "./contexts/authContext";
import Auth from "./views/Auth";
import Dashboard from "./views/Dashboard";
import Landing from "./components/layouts/Landing"
import ProtectedRoute from "./components/routing/ProtectedRoute";

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route
            exact
            path="/login"
            render={(props) => <Auth {...props} authRoute="login" />}
          />
          <Route
            exact
            path="/register"
            render={(props) => <Auth {...props} authRoute="register" />}
          />

          <ProtectedRoute
            exact
            path="/dashboard"
            component={Dashboard}
          />
        </Switch>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
