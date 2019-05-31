import api from '../config/api'

export const get = async (codename = '') => {
    try{
        let response = await api.get(`/devices/${codename}`)
        return response
    }catch(exception){
        console.log(exception)
    }
}