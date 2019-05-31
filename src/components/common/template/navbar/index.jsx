import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import Devices from '../../devices/search';
import Supported from '../../devices/supportedList';
import Logo from '../../others/logo'
import { SideNav, SideNavItem, Navbar, NavItem } from 'react-materialize';


export default class NavBar extends Component{
    
    

    render(){
        return (
            <>
                
                <SideNav trigger = {
                    <div className="nav-wrapper">
                    <nav>
                        <button data-target="sidenav_2" className="sidenav-trigger show-on-large left hidden-button">
                            <i className="material-icons left">menu</i></button>
                        <button className="sidenav-trigger show-on-large right hidden-button">
                            <i className="settings material-icons">color_lens</i>
                        </button>
                    </nav>
                </div>
                } 
                    options={{closeOnclik: true}}
                    fixed = {true}
                    >
                        <Link className="bar-logo center" to="/">
                            <Logo /> 
                            <h4 className="accent">Kraken Project</h4>
                        </Link>
                        <Devices />
                        <Supported />
                    
                </SideNav>
          </>
        )
    }
}
