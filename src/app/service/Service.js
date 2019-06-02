import api from '../config/api';

export class Service{
    /**
     * @param {String} uri Uri of api
     */
    constructor(uri){
        this.uri = uri
    }
    /**
     * @param {Promise} promise the promise returned by axios
     */
    handlePromise(promise){
        return promise
                .then(response => {
                    return response.data
                })
                .catch(exception => {
                    let { response } = exception
                    if(!response.data){
                        throw {}
                    }
                    throw response.data
                })
    }

    /**
     * @param {String} pathVariable 
     * @param {Object} params consumes a api 
     */
    get = (additionalUri = '', params = {}) =>{
        const promise = api.get(`${this.uri}${additionalUri}`, {params:{...params}})
        return this.handlePromise(promise)
    }
}