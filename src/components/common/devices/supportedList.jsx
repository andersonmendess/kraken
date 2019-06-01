import React, { useContext, useEffect, useState } from 'react';
import { Collapsible, CollapsibleItem } from 'react-materialize/';
import { Link } from 'react-router-dom';
import { AppCtx } from '../../../app/context/AppContext';
import { get as api } from '../../../app/service/deviceService';
import Loading from '../loading';

export default () => {
    const [brands, setBrands] = useState([])
    const [showLoading, setShowLoading] = useState(false)
    const context = useContext(AppCtx)

    
    useEffect(() => {
        setShowLoading(true)
        async function getBrands(){
            const brands = await api()
            if(!brands.errors){
                setBrands(brands)
            }
            setShowLoading(false)
        }
        getBrands()
    }, [])

    useEffect(() => {
        let devices = brands.flatMap(brand => brand.devices)
        console.log(brands)
        context.setDevices(devices)
    }, [brands])
    return (
        <>
            <Collapsible className="collapsible collapsible-accordion">
                <Loading if={showLoading}/>
                {brands.map(brand => (
                    <CollapsibleItem 
                        key={brand.name} header={
                            <>
                                <span style={{width: '90%'}}>{brand.name}</span>
                                <i className="material-icons">arrow_drop_down</i>
                            </>} icon="phone_android"
                        className="collapsible-header"
                        style={{display: 'block', lineHeight: '48px'}}>
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