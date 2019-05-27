import React, { Component } from 'react'

export default class Devices extends Component {
    state ={
        brands: [],
        devices: [],
        search: []
    }

    redirect = (event) => {
        event.preventDefault()
        console.log(event)
    }

    listDevicesSearch = (devices) => (
        devices.map(device => {
            return  <button key={device.codename} onClick={this.redirect}>
                        {`${device.codename} - ${device.name} `}
                    </button>
        })
    )

    render() {
        let {search} = this.state
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