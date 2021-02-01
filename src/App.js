import Amplify from "aws-amplify";
import {useEffect} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
  // useParams
} from "react-router-dom";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";

function App() {
  useEffect(() => {
    Amplify.configure({
      Auth: {
        region: process.env.REACT_APP_REGION,
        userPoolId: process.env.REACT_APP_USER_POOL_ID,
        userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID,
      },
    });
  });

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login" children={<Login />} />
          <Redirect path="/" exact to="login" /> 
          <Route path="/signup" children={<SignUp />} />
        </Switch>
      </div>
    </Router>

  );
}

export default App;
