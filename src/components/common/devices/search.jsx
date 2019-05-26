import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Devices extends Component {
    state ={
        brands: [],
        devices: [],
        search: []
    }
    listDevicesSearch = (devices) => (
        devices.map(device => {
            return  <Link to={`/devices/${device.codeName}`} >
                        {`${device.codeName} - ${device.name} `}
                    </Link>
        })
    )

    render() {
        let {brands, devices, search} = this.state
        return (
        <>
            <div className="square searchbar">
                <div className="search-wrapper">
                    <i className="material-icons is-s">search</i>
                    <input style={{width: '80%'}} type="text" v-model="search"
                        placeholder="Type your device... " />
                </div>
            </div>
            <div className="wrapper">
                {(search) && this.listDevicesSearch(search)}
            </div>
            <ul className="collapsible collapsible-accordion">
                {brands.map(brand => {
                    return <li>
                                <div className="collapsible-header">
                                    <i className="material-icons">phone_android</i>
                                    <span style={{width: '90%'}}>{ brand }</span>
                                    <i className="material-icons">arrow_drop_down</i>
                                </div>

                                <div className="collapsible-body">
                                    <ul>
                                        {devices
                                            .filter(device => device.brand === brand)
                                            .map(device => {
                                            return (
                                                <li>
                                                    <Link className="pointer devilist">
                                                        {`${device.name} ${device.codeName}`}
                                                    </Link>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </li>
                })}
            </ul >
        </>
        )
    }
}