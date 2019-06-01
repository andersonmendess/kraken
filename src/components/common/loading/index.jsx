import React from 'react'
import './styles.css'


export default props => 
    props.if && <div className="loading-wrapper">
                    <div class={`preloader-wrapper ${props.size || 'big'} active`}>
                        <div class="spinner-layer spinner-kraken">
                        <div class="circle-clipper left">
                            <div class="circle"></div>
                        </div><div class="gap-patch">
                            <div class="circle"></div>
                        </div><div class="circle-clipper right">
                            <div class="circle"></div>
                        </div>
                        </div>
                    </div>
                </div>