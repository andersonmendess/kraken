import React,{Component} from 'react'
import Builds from '../../components/common/build/buildList'
import DeviceCard from '../../components/common/devices/deviceCard'
import DeviceProp from '../../components/common/devices/deviceProp'

import {get as api} from '../../app/service/deviceService'

export class Device extends Component{
    state = {
        device: {},
        builds: []
    }

    componentDidMount(){
        let {codename} = this.props.match.params
        if(!codename){
             this.props.history.push('/')
        }
        this.get(codename)
    }

    
    //temp hack
    componentDidUpdate() {
        if(this.props.match.params.codename !== this.state.device.codename){
            this.get(this.props.match.params.codename)
        }
    }

    get = async (codename) => {
        try{
            let response = await api(codename)
            let {device, builds} = response
            this.setState({device, builds})
        }catch(exception){
            console.log(exception)
        }
    }

    render(){
        let { device, builds } = this.state
        return (
            <>
                <DeviceCard brand={device.brand} name={device.name} codename={device.codename}>
                        <DeviceProp icon="domain" brand={device.brand}/>
                        <DeviceProp icon="phone_android" brand={device.name}/>
                        <DeviceProp icon="device_unknown" brand={device.codename}/>
                        <DeviceProp icon="person_outline" brand={device.maintainer_name}/>

                        {device.xda_thread && (
                        <div className="card-action xda-buttons">
                            <a href={device.maintainer_url} target="_blank" rel="noopener noreferrer" className="waves-effect waves-teal btn-flat">GitHub Profile</a>
                            <a href={device.xda_thread} target="_blank" rel="noopener noreferrer" className="waves-effect waves-teal btn-flat">XDA Thread</a>
                        </div>
                        )}
                </DeviceCard>
                <Builds builds={builds}  />
            </>
        )
    }
}

export default Device