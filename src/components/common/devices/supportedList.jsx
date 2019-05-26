import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Supported extends Component {
    
    state = {
        brands: ['Xiaomi','Samsung','General Mobile'],
        devices: [
            {
                "name": "Redmi Note 4/4X",
                "brand": "Xiaomi",
                "codename": "mido",
                "maintainer_name": "Alif Fathur (rev31one)",
                "maintainer_url": "https://github.com/darkthur",
                "xda_thread": "https://forum.xda-developers.com/"
              },
              {
                "name": "Galaxy J5 2015 LTE",
                "brand": "Samsung",
                "codename": "j5lte",
                "maintainer_name": "EsromTech",
                "maintainer_url": "https://github.com/EsromTech",
                "xda_thread": "https://forum.xda-developers.com/"
              },
              {
                "name": "Redmi Note 5/Pro",
                "brand": "Xiaomi",
                "codename": "whyred",
                "maintainer_name": "mamutal91",
                "maintainer_url": "https://github.com/mamutal91",
                "xda_thread": "https://forum.xda-developers.com/redmi-note-5-pro/development/rom-kraken-tentacles-project-t3923830"
              },
              {
                "name": "GM 5 Plus",
                "brand": "General Mobile",
                "codename": "shamrock",
                "maintainer_name": "tunasahinn",
                "maintainer_url": "https://github.com/tunasahinn",
                "xda_thread": "https://forum.xda-developers.com/"
              }
        ],
    }


    render() {
        let {brands, devices} = this.state

        return (
            <>
                <ul className="collapsible collapsible-accordion">
                    {brands.map(brand => {
                        return <li>
                            <div className="collapsible-header">
                                <i className="material-icons">phone_android</i>
                                <span style={{ width: '90%' }}>{brand}</span>
                                <i className="material-icons">arrow_drop_down</i>
                            </div>

                            <div className="collapsible-body">
                                <ul>
                                    {devices
                                        .filter(device => device.brand === brand)
                                        .map(device => {
                                            console.log(device)
                                            return (
                                                <li>
                                                    <Link to={`/devices/${device.codename}`} className="pointer devilist">
                                                        {`${device.name} (${device.codename})`}
                                                    </Link>
                                                </li>
                                            )
                                        })}
                                </ul>
                            </div>
                        </li>
                    })}
                </ul >
                <script>
                    let elems = document.querySelector('.collapsible');
                    M.Collapsible.init(elems);
                </script>
            </>
        )
    }
}