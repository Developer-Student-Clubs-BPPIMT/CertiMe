import React from 'react';
import Navbar from '../components/Navbar/Navbar'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux' 
import { isLoaded, isEmpty } from 'react-redux-firebase'

import Home from './Home'
import Landing from './Landing'
import CertificateCreator from './CertificateCreator'
import Loader from '../components/common/Loader';
import CertiDistribute from './CertiDistribute';

function PrivateRoute({...props}){
  const auth = useSelector(state => state.firebase.auth)
  return (
    (!isEmpty(auth)) ?
    <Route {...props} /> : <Redirect to={{ pathName: '/', state: { from: props.path }}}/>
  );
}

function App() {
  const auth = useSelector(state => state.firebase.auth)
  console.log(auth.isLoaded ? "Loaded" : "Not Loaded")
  return (
    <div className="App" style={{minHeight: '100vh'}}>
      <Navbar />
      {auth.isLoaded ?
      (<Switch>
        <PrivateRoute exact path="/create" component={CertificateCreator} />
        <PrivateRoute exact path="/distribute" component={CertiDistribute} />
        <Route exact path="/" component={ (isLoaded(auth) && !isEmpty(auth)) ? Home : Landing} />
        <Route path="/" />
      </Switch>) : <Loader />}
    </div>
  );
}

export default App;
