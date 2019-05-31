import React, { Component } from 'react';
import { AppCtx } from '../../../app/context/AppContext';

export class Devices extends Component {
    state ={
        devices: [],
        search: ''

    }

    redirect = (event) => {
        event.preventDefault()
        console.log(event)
    }

    onChange = (event) => {
        let search = event.target.value
        this.setState({search},
        () => this.findDevice(search))
    }

    findDevice = (name) => {
        let { devices } = this.context
        devices.filter(device => 
            device.name.startWith(name) ||
            device.codename.startWith(name))
        this.setState({devices})
    }

    listDevicesSearch = (devices) => (
        devices.map(device => {
            return  <button key={device.codename} onClick={this.redirect}>
                        {`${device.codename} - ${device.name} `}
                    </button>
        })
    )

    render() {
        let { search,devices } = this.state
        return (
        <>
            <div className="square searchbar">
                <div className="search-wrapper">
                    <i className="material-icons is-s">search</i>
                    <input value={search || ''} style={{width: '80%'}} 
                        type="text" v-model="search"
                        placeholder="Type your device... "
                        onChange={this.onChange} />
                </div>
            </div>
            <div className="wrapper">
                {(search || search !== '') && this.listDevicesSearch(devices)}
            </div>
        </>
        )
    }
}
Devices.contextType = AppCtx
export default Devices