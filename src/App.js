import React,{Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import AppContext,{AppCtx} from './app/context/AppContext'
import Home from './view/home'
import Body from './components/common/template/body';
import NavBar from './components/common/template/navbar';

class App extends Component {
  render(){
    return (
      <>
        <NavBar />
        <Body>
          <Router>
            <Switch>
              <Route exact  path="" component={Home} />
            </Switch>
          </Router>
        </Body>
      </>
    );
  }
}

App.contextType = AppCtx
export default props => <AppContext >
                          <App {...props} />
                        </AppContext>;
