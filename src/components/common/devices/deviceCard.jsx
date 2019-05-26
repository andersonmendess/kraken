import React from 'react'

export default ({children, brand, name, codename}) => (
    <>
        <h5 className="center upper-bold accent">{brand} {name} ({codename})</h5>
        <div className="row limiter">
            <div className="col s12 m12">
                <div className="builds cardColor z-depth-1">
                    {children}
                </div>
            </div>
        </div>
    </>
)