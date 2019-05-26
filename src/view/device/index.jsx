import React,{Component} from 'react'
import Builds from '../../components/common/build/buildList'
import DeviceCard from '../../components/common/devices/deviceCard'
import DeviceProp from '../../components/common/devices/deviceProp'

export class Device extends Component{
    state = {
        device: {
            "name": "GM 5 Plus",
            "brand": "General Mobile",
            "codename": "shamrock",
            "maintainer_name": "tunasahinn",
            "maintainer_url": "https://github.com/tunasahinn",
            xda_thread: "https://forum.xda-developers.com/",
            builds: [
                {
                    "datetime": "1558884090",
                    "filename": "Kraken_dumpling-Pie-20190526-1311-OFFICIAL.zip",
                    "id": "f30b28690c1bc14d7120701fa67712ca",
                    "romtype": "OFFICIAL",
                    "size": "919023042",
                    url: "https://master.dl.sourceforge.net/project/krakenproject/dumpling/Kraken_dumpling-Pie-20190526-1311-OFFICIAL.zip",
                    "version": "Pie",
                    "changelog": "Initial Build"
                }
            ]
        }
    }
    render(){
        let { device } = this.state
        return (
            <>
                <DeviceCard brand={device.brand} name={device.name} codename={device.codename}>
                        <DeviceProp icon="domain" brand={device.brand}/>
                        <DeviceProp icon="phone_android" brand={device.name}/>
                        <DeviceProp icon="device_unknown" brand={device.codename}/>
                        <DeviceProp icon="person_outline" brand={device.maintainer_name}/>
                        <DeviceProp icon="domain" brand={device.brand}/>
                        <DeviceProp icon="domain" brand={device.brand}/>

                        {device.xda_thread && (
                        <div className="card-action xda-buttons">
                            <a href={device.maintainer_url} target="_blank" className="waves-effect waves-teal btn-flat">GitHub Profile</a>
                            <a href={device.xda_thread} target="_blank" className="waves-effect waves-teal btn-flat">XDA Thread</a>
                        </div>
                        )}
                </DeviceCard>
                <Builds builds={device.builds}  />
            </>
        )
    }
}

export default Device