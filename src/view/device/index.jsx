import React, { useContext, useEffect, useState } from 'react';
import { AppCtx } from '../../app/context/AppContext';
import { DeviceService } from '../../app/service/deviceService';
import Builds from '../../components/common/build/buildList';
import DeviceCard from '../../components/common/devices/deviceCard';
import Loading from '../../components/common/loading';



export default props => {
    const [device, setDevice] = useState({name:'', codename: ''})
    const [builds, setBuilds] = useState([])
    const [loading, setLoading] = useState(true)
    const [deviceLoading, setDeviceLoading] = useState(false)

    const context = useContext(AppCtx)
    
    const api = new DeviceService()
    
    function get(codename){
        getDeviceInfo(codename)
        getBuilds(codename)
    }

    function getDeviceInfo(codename){
        setDeviceLoading(true)
        if(context.devices.length > 0){
            let device = context.devices.filter(device => device.codename == codename)[0]
            if(device){
                setDeviceLoading(false)
                setDevice(device)
            }else{
                alert('not found')
                props.history.push('/')
            }
        }
    }

    async function getBuilds(codename){
        setLoading(true)
        try{
            const data = await api.getBuilds(codename)
            setBuilds(data.builds)
            setLoading(false)
        }catch(exception){
            console.log(exception)
            setLoading(false)
        }
    }

    useEffect(() => {
        getDeviceInfo(props.match.params.codename)
    }, [context])

    useEffect(() => {
        const { codename } = props.match.params
        get(codename)
    }, [props.match.params.codename])

    return (
        <>
            <Loading if={deviceLoading}>
                <DeviceCard device={device} />
            </Loading>
            <Loading if={loading}>
                <Builds builds={builds} {...props} />
            </Loading>
        </>
    )
}