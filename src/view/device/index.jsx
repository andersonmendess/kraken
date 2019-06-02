import React, { useContext, useEffect, useState } from 'react';
import { AppCtx } from '../../app/context/AppContext';
import { DeviceService } from '../../app/service/deviceService';
import Builds from '../../components/common/build/buildList';
import DeviceCard from '../../components/common/devices/deviceCard';
import Loading from '../../components/common/loading';



export default props => {
    const [device, setDevice] = useState({})
    const [builds, setBuilds] = useState([])
    const [devices, setDevices] = useState([])
    const [loading, setLoading] = useState(false)

    const context = useContext(AppCtx)


    const api = new DeviceService()
    
    function get(codename){
        getDeviceInfo(codename)
        getBuilds(codename)
    }

    function getDeviceInfo(codename){
        let device = context.devices.filter(device => device.codename == codename)[0]
        // console.log('devicecard')
        // console.log(context)
        device = {
            name: '',
            brand: ''
        }
        setDevice({device})
    }

    function getBuilds(codename){
        setLoading(true)
        api.get(`/${codename}/builds`)
        .then(data => {
            setBuilds(data.builds)})
        .catch(errors => console.log(errors))
        .finally(()=> setLoading(false))
    }

    useEffect(() => {
        const { codename } = props.match.params
        if(!codename){
            props.history.push('/')
        }
        get(codename)
    }, [props.match.params])
    return (
        <>
            <DeviceCard device={device} />
            <Loading if={loading}>
                <Builds builds={builds}  />
            </Loading>
        </>
    )
}