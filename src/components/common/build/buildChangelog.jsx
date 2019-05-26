import React from 'react'

export default props => (
    <div className='buildChangelog'>
        <p className="label">Changelog</p>
        <pre>{props.changelog}</pre>
    </div>
)