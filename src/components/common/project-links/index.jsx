import React from 'react'

export default props => {
    
    return props.value.map(value => (
            <a key={value.title} href={value.link} rel="noopener noreferrer" target="_blank">
                <div title={value.title}>
                    <svg width="32" height="32" style={value.style}>
                        <path d={value.svg} />
                    </svg>
                </div>
            </a>

        ))
}