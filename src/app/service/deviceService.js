import {Service} from './Service'

export class DeviceService extends Service{
    constructor(){
        super('/devices')
    }

    getBrands = () => {
        return this.get()
    }

    getBuilds = (deviceCodename) => {
        return this.get(`/${deviceCodename}/builds`)
    }
}