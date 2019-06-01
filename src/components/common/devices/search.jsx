import React, { Component, useEffect, useState , useContext} from 'react';
import { AppCtx } from '../../../app/context/AppContext';

export default props => {
    const [devices, setDevices] = useState([])
    const [search, setSearch] = useState('')
    const context = useContext(AppCtx)

    useEffect(() => {
        console.log(search)
    }, search)
    
    function onChange(event) {
        console.log(event.target.value)
    }
    return (
        <>
            <div className="square searchbar">
                <div className="search-wrapper">
                    <i className="material-icons is-s">search</i>
                    <input value={ search } style={{width: '80%'}} 
                        type="text" v-model="search"
                        placeholder="Type your device... "
                        onChange={ event => setSearch(event.target.value)} />
                </div>
            </div>
            {/* <div className="wrapper">
                {(search || search !== '') && this.listDevicesSearch(devices)}
            </div> */}
        </>
    )

}
export class Devices extends Component {
    state ={
        devices: [],
        search: ''

    }

    componentDidMount(){
        const {devices} = this.context
        if(devices){
            this.setState({devices})
        }
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
        const { devices } = this.state
        devices.map(device => {
            console.log(device)
        })
        // let search = devices.map(device => device.name)
        // filter(device => device.name.toLowerCase() === name)
        // this.setState({devices: search})
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
            {/* <div className="wrapper">
                {(search || search !== '') && this.listDevicesSearch(devices)}
            </div> */}
        </>
        )
    }
}