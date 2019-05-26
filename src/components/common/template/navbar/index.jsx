import React, {Component} from 'react'
import Devices from '../../devices/search';
import Supported from '../../devices/supportedList';
import Logo from '../../others/logo'


export default class NavBar extends Component{
    render(){
        return (
            <>
            <div className="navbar-fixed">
                <nav>
                    <div className="nav-wrapper">
                    <a href="#" data-target="slide-out" className="sidenav-trigger show-on-large left">
                        <i className="material-icons left">menu</i></a>
                    <a onclick="toogleMenu()" className="sidenav-trigger show-on-large right"><i className="settings material-icons">color_lens</i></a>
                    </div>
                </nav>
            </div>
            <ul id="slide-out" className="sidenav">
                <a href="/" className="bar-logo center">
                    <Logo /> 
                    <h4 className="accent">KrakenProject</h4>
                </a>
                <Devices />
                <Supported />
            </ul>
          </>
        )
    }
}