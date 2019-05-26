import React, { Component } from 'react'
import {Collapsible, CollapsibleItem} from 'react-materialize/'

export default class Supported extends Component {
    
    state = {
        brands: [
            { name: 'Xiaomi',
              devices: [
                { name: 'Redmi Note 4/4X',codeName: 'mido' },
                { name: 'Redmi Note 5/Pro',codeName: 'whyded' }
                ]
            },
            { name: 'Samsung',
              devices: [{ name: 'Galaxy J5 2015 LTE', codeName: 'j5lte' }]
            },
            { name: 'General Mobile',
              devices: [{ name: 'GM 5 Plus', codeName: 'shamrock' }]
            }
        ]
    }


    render() {

        let {brands} = this.state

        return (
            <>
                <Collapsible className="collapsible collapsible-accordion">
                    {brands.map(brand => {
                        return (
                        <CollapsibleItem 
                            key={brand.name} 
                            header={<span style={{width: '90%'}}>{brand.name}</span>} 
                            icon="phone_android"
                            className="collapsible-header"
                            >
                            {brand.devices.map(device => (
                                <a key={device.codeName} href={`/devices/${device.codeName}`} className="pointer devilist">
                                            {`${device.name} (${device.codeName})`}
                                </a>)
                            )}
                        </CollapsibleItem>)
                    })}
                </Collapsible>
            </>
        )
    }
}