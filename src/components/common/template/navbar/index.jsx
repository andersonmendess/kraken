import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import Devices from '../../devices/search';
import Supported from '../../devices/supportedList';
import Logo from '../../others/logo'


export default class NavBar extends Component{
    

    render(){
        console.log(this)
        return (
            <>
            <div className="navbar-fixed">
                <nav>
                    <div className="nav-wrapper">
                        <button data-target="slide-out" className="sidenav-trigger show-on-large left hidden-button">
                            <i className="material-icons left">menu</i></button>
                        <button className="sidenav-trigger show-on-large right hidden-button">
                            <i className="settings material-icons">color_lens</i>
                        </button>
                    </div>
                </nav>
            </div>
            <ul id="slide-out" className="sidenav">
                <Link className="bar-logo center" to="/">
                    <Logo /> 
                    <h4 className="accent">Kraken Project</h4>
                </Link>
                <Devices />
                <Supported />
            </ul>
          </>
        )
    }
}
