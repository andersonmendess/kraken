import React, {Component} from 'react'
import Devices from '../../devices/search';
import Supported from '../../devices/supportedList';

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
                <Devices />
                <Supported />
            </ul>
          </>
        )
    }
}