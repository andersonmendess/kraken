import React from 'react'

export default props => {
    
    return props.value.map(value => (
            <a href={value.link} target="_blank">
                <div title={value.title}>
                    <svg width="32" height="32" style={value.style}>
                        <path d={value.svg} />
                    </svg>
                </div>
            </a>

        ))
}