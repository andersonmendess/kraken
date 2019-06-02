import React from 'react'
import './styles.css'


export default props => 
    (props.if ? (
        <div className="loading-wrapper">
                <div className={`preloader-wrapper ${props.size || 'big'} active`}>
            <div className="spinner-layer spinner-accent-only">
                <div className="circle-clipper left">
                <div className="circle"></div>
                </div>
                <div className="gap-patch">
                <div className="circle"></div>
                </div>
                <div className="circle-clipper right">
                <div className="circle"></div>
                </div>
            </div>
            </div>
        </div>):(props.children))