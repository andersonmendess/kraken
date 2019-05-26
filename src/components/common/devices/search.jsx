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
            return  <Link to={`/devices/${device.codename}`} >
                        {`${device.codename} - ${device.name} `}
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
        </>
        )
    }
}