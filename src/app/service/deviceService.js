import {Service} from './Service'

export class DeviceService extends Service{
    constructor(){
        super('/devices')
    }
}