import './App.css';
import {
  Switch,
  Route
} from "react-router-dom";

import Main from './pages/MainPage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Private from './pages/Private';

function App() {

  return (

    <>

      <Switch>
        <Private path="/" component={Main} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/signup" component={Signup} exact />
      </Switch>

    </>
  );
}

export default App;
