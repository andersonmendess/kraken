import React, { Component } from 'react'
import {Link } from 'react-router-dom'
import {Collapsible, CollapsibleItem} from 'react-materialize/'
import {get as api} from '../../../app/service/deviceService'

export default class Supported extends Component {
    
    state = {
        brands: []
    }

    componentDidMount(){
        this.get()
    }

    get = async ()  => {
        try{
            let brands = await api()
            this.setState({brands})
        }catch(exception){
            console.log(exception)
        }
    }

    render() {

        let {brands} = this.state

        return (
            <>
                <Collapsible className="collapsible collapsible-accordion">
                    {brands.map(brand => {
                        console.log(brand)
                        return (
                        <CollapsibleItem 
                            key={brand.name} 
                            header={<><span style={{width: '90%'}}>{brand.name}</span><i class="material-icons">arrow_drop_down</i></>} 
                            icon="phone_android"
                            className="collapsible-header"
                            style={{display: 'block', lineHeight: '48px'}}
                            >
                            {brand.devices.map(device => (
                                <Link key={device.codename} to={`/devices/${device.codename}`} className="pointer devilist link">
                                            {`${device.name} (${device.codename})`}
                                </Link>)
                            )}
                        </CollapsibleItem>)
                    })}
                </Collapsible>
            </>
        )
    }
}