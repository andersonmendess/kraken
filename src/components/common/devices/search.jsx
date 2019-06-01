import React, { Component, useEffect, useState , useContext} from 'react';
import { AppCtx } from '../../../app/context/AppContext';

export default props => {
    const [devices, setDevices] = useState([])
    const [ resultDevices, setResultDevices] = useState([])
    const [search, setSearch] = useState("")
    const [disabled, setDisabled] = useState(true)
    const context = useContext(AppCtx)

    useEffect(() => {
        const { devices } = context
        if(devices  && Object.prototype.toString.call(devices) === "[object Array]"){
            setDevices(devices)
        }
    }, [context])

    useEffect(() => {
        if(devices){
            setDisabled(false)
        }
        console.log(devices)
    }, [devices])

    useEffect(() => {
        console.log(devices, resultDevices)
        let result = devices.filter(device => device.name.startWith(search.toLowerCase()))
        setResultDevices(result)
    }, [search])
    console.log(devices)
    return (
        <>
            <div className="square searchbar">
                <div className="search-wrapper">
                    <i className="material-icons is-s">search</i>
                    <input value={ search } style={{width: '80%'}} 
                        type="text" v-model="search"
                        placeholder="Type your device... "
                        disabled={disabled}
                        onChange={ e => setSearch(e.target.value)} />
                </div>
            </div>
            <div className="wrapper">
                {resultDevices.map(device => 
                    <button key={device.codename} onClick={this.redirect}>
                        {`${device.codename} - ${device.name} `}
                    </button>)}
            </div>
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