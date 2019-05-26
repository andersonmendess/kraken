import api from '../config/api'

export const get = async () => {
    try{
        let response = await api.get('');
        return response.data
    }catch(exception){
        console.log(exception)
    }
}