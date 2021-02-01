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
import ResetPassword from "./Components/reset-pw";
import ChangePassword from './Components/change-pw';
import MainPage from './Components/main-page';

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
          <Route path="/resetpw" children={<ResetPassword />} />
          <Route path="/changepw/:email" children={<ChangePassword />} />
          <Route path="/mainpage" children={<MainPage />} />
        </Switch>
      </div>
    </Router>

  );
}

export default App;
