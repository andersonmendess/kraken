import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppCtx } from '../../../app/context/AppContext';

export default props => {
    const [ resultDevices, setResultDevices] = useState([])
    const [search, setSearch] = useState("")
    const context = useContext(AppCtx)


    useEffect(() => {
        if(search.trim().length === 0){
            setResultDevices([])
            return
        }
        let result = context.devices
                .filter(device => 
                    device.codename.toLowerCase()
                        .includes(search.toLowerCase()) ||
                    device.name.toLowerCase()
                        .includes(search.toLowerCase()))
        setResultDevices(result)
    }, [search, context.devices])

    return (
        <>
            <div className="square searchbar">
                <div className="search-wrapper">
                    <i className="material-icons is-s">search</i>
                    <input value={ search } style={{width: '80%'}} 
                        type="text" v-model="search"
                        placeholder="Type your device... "
                        onChange={ e => setSearch(e.target.value)} />
                </div>
            </div>
            <div className="wrapper">
                {resultDevices.map(device => 
                    <Link key={device.codename} to={`/${device.codename}`} className="pointer devilist link">
                                {`${device.name} (${device.codename})`}
                    </Link>)}
            </div>
        </>
    )

}