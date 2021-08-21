import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/login/Login";

const auth = {
  isAuthenticated: false,
  authenticate(cred, cb) {
    if (cred.username === 'foo' && cred.password === 'bar') {
      this.isAuthenticated = true;
      setTimeout(cb, 100);
    } 
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
}

function PrivateRoute({ children, ...rest }) {
  return (
    <Route {...rest} render={() => {
      return auth.isAuthenticated === true
        ? children
        : <Redirect to="/login" />
    }} />
  )
}

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login auth={auth}/>
        </Route>
        <PrivateRoute path="/home">
          <Home auth={auth}/>
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
