import React, { Component } from 'react';
import { AppCtx }  from '../../app/context/AppContext';
import ProjectLinks from '../../components/common/project-links/links'

export class Home extends Component{
    
    render(){

        return (
            <div className='home center'>
                <h3 class="accent welcome">Kraken Open Tentacles Project</h3>

                <img src="https://avatars0.githubusercontent.com/u/49829986?s=500&v=4" />

                <div class="home-desc">
                    <div class="desc square accent">LineageOS based ROM</div>
                </div>

                <div class="home-bottom-info">
                    <div class="home-bottom-info-content">
                        <ProjectLinks />
                    </div>
                </div>
                <div class='credits' >Project maintained by <a href="https://github.com/mamutal91">mamutal91</a></div>
                <div class='credits'>Website developed by <a href="https://github.com/andersonmendess">andersonmendess</a></div>

            </div>
        )
    }
}
Home.contextType = AppCtx
export default Home