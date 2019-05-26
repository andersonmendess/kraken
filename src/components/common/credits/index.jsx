import React from 'react'

export default props => 
    <div class='credits' >
        {props.title}
        <a href={`https://github.com/${props.username}`}>{props.username}</a>
    </div>