import React, { useContext, useEffect, useState } from 'react';
import { AppCtx } from '../../app/context/AppContext';
import { DeviceService } from '../../app/service/deviceService';
import Builds from '../../components/common/build/buildList';
import DeviceCard from '../../components/common/devices/deviceCard';
import Loading from '../../components/common/loading';


const api = new DeviceService()

export default props => {
    const [device, setDevice] = useState({name:'', codename: ''})
    const [builds, setBuilds] = useState([])
    const [loading, setLoading] = useState(true)
    const [deviceLoading, setDeviceLoading] = useState(false)

    const context = useContext(AppCtx)
    
    useEffect(() => {
        function getDeviceInfo(codename){
            setDeviceLoading(true)
            if(context.devices.length > 0){
                let device = context.devices.filter(device => device.codename === codename)[0]
                if(device){
                    setDeviceLoading(false)
                    setDevice(device)
                }else{
                    alert('not found')
                    props.history.push('/')
                }
            }
        }
        getDeviceInfo(props.match.params.codename)
    }, [context, props.match.params.codename, props.history])

    useEffect(() => {
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
        const codename = props.match.params.codename
        getBuilds(codename)
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