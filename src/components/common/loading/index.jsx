import React from 'react'



export default props => 
    props.if && <div class="progress">
                    <div class="indeterminate"></div>
                </div>