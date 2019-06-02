import React, { useContext, useEffect, useState } from 'react';
import { Collapsible, CollapsibleItem } from 'react-materialize/';
import { Link } from 'react-router-dom';
import { AppCtx } from '../../../app/context/AppContext';
import Loading from '../loading';
import { DeviceService } from '../../../app/service/deviceService';

const api = new DeviceService()

export default () => {
    const [brands, setBrands] = useState([])
    const [showLoading, setShowLoading] = useState(false)
    const context = useContext(AppCtx)

    
    useEffect(() => {
        setShowLoading(true)
        async function getBrands(){
            try{
                const brands = await api.getBrands()
                setBrands(brands)
                setShowLoading(false)
            }catch(exception){
                console.log(exception)
                setShowLoading(false)
            }
        }
        getBrands()
    }, [])

    useEffect(() => {
        let devices = brands.flatMap(brand => brand.devices)
        context.setDevices(devices)
    }, [brands, context])
    return (
        <Loading if={showLoading}>
            <Collapsible className="collapsible collapsible-accordion">
                {brands.map(brand => (
                    <CollapsibleItem 
                        key={brand.name} header={
                            <>
                                <span>{brand.name}</span>
                                <i className="material-icons">arrow_drop_down</i>
                            </>} icon="phone_android"
                        className="collapsible-header"
                        >
                        {   brand.devices.map(device => (
                            <Link key={device.codename} to={`/${device.codename}`} className="pointer devilist link">
                                        {`${device.name} (${device.codename})`}
                            </Link>)
                        )}
                    </CollapsibleItem>)
                )}
            </Collapsible>
        </Loading>
    )
}