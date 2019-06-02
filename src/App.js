import React,{Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import AppContext,{AppCtx, AppConsumer} from './app/context/AppContext'
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js'
import './assets/css/index.css'
import Home from './view/home'
import Device from './view/device'
import Body from './components/common/template/body';
import NavBar from './components/common/template/navbar';



class App extends Component {
  render(){
    return (
      <>
          <Router>
            <NavBar />
            <Body>
                <Switch>
                  <Route exact  path="/" component={Home} />
                  <Route path="/:codename/:build?" component={Device} />
                  <Redirect to="/" />
                </Switch>
            </Body>
          </Router>
      </>
    );
  }
}

App.contextType = AppCtx
export default props => <AppContext >
                            <AppConsumer>
                              {(AppContext) => 
                                  <App {...props} {...AppContext}/>
                              }
                            </AppConsumer>
                        </AppContext>;
