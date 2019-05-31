import React, { Component } from 'react';
import { Collapsible, CollapsibleItem } from 'react-materialize/';
import { Link } from 'react-router-dom';
import { get as api } from '../../../app/service/deviceService';
import { AppCtx } from '../../../app/context/AppContext';
import Loading from '../loading'

export class Supported extends Component {
    
    state = {
        brands: [],
        showLoading: false
    }

    componentDidMount(){
        this.get()
    }

    get = async ()  => {
        try{
            this.setState({showLoading: true})
            let brands = await api()
            this.setState({ brands } ,
            () => 
            this.addDevicesToContext(brands))

        }catch(exception){
            console.log(exception)
        }
        this.setState({showLoading: false})
    }

    addDevicesToContext = (brands) => {
        let devices = brands.flatMap(brand => brand.devices)
        this.context.setDevices(devices)
    }

    render() {
        let {brands, showLoading} = this.state

        return (
            <>
                <Collapsible className="collapsible collapsible-accordion">
                    <Loading if={showLoading}/>
                    {brands.map(brand => (
                        <CollapsibleItem 
                            key={brand.name} 
                            header={<><span style={{width: '90%'}}>{brand.name}</span><i className="material-icons">arrow_drop_down</i></>} 
                            icon="phone_android"
                            className="collapsible-header"
                            style={{display: 'block', lineHeight: '48px'}}
                            >
                            {   brand.devices.map(device => (
                                <Link key={device.codename} to={`/${device.codename}`} className="pointer devilist link">
                                            {`${device.name} (${device.codename})`}
                                </Link>)
                            )}
                        </CollapsibleItem>)
                    )}
                </Collapsible>
            </>
        )
    }
}
Supported.contextType = AppCtx
export default Supported