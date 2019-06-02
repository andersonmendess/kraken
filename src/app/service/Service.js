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
                    let errors = [{}]
                    let { response } = exception
                    if(response && response.data){
                        errors.push(response.data)
                    }
                    return Promise.reject(errors)
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