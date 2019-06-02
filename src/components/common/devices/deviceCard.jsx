import React from 'react';
import DeviceProp from './deviceProp';

export default ({device}) => (
        <>
            <DeviceCard brand={device.brand} name={device.name} 
                codename={device.codename}>
                    <DeviceProp icon="domain" brand={device.brand }/>
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
            
        </>
)

function DeviceCard ({children, brand, name, codename}) {
    return <>
        <h5 className="center upper-bold accent">{`${brand} ${name} (${codename})`}</h5>
            <div className="row limiter">
                <div className="col s12 m12">
                    <div className="builds cardColor z-depth-1">
                        {children}
                    </div>
                </div>
            </div>
            </>
}