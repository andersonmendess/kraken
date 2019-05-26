import React from 'react'

const Row = ({title, data}) => <div className="deviceprop"> <p>{title}: {data}</p></div>
const Card = ({children}) => <><p className="label" >details</p><div className="buildinfo">{children}</div></>

export default props => {
    let { build, children }  = props
    return (
        <>
            <Card>
                <Row title="Device" data={build.filename} />
                <Row title="Date" data={build.datetime} />
                <Row title="Size" data={build.size} />
                <Row title="MD5" data={build.id} />
                <Row title="Version" data={build.version} />
                <Row title="Downloads" data={build.downloads} />
            </Card>
            {children}
        </>
    )
}