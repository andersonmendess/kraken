import React from 'react'
import { Collapsible, CollapsibleItem } from 'react-materialize/';
import BuildCard from './buildCard'
import BuildChangelog from './buildChangelog'
import BuildLink from './buildLink'

export default props => {
    const {builds} = props
    let expanded = true
    return (
        <div className="row center">
          <div className="col s12 m12 center builds">
            {builds.map(build => {
                console.log(build)
                return (
                    <Collapsible key={build.id}>
                        <CollapsibleItem 
                            header={<span style={{width: '100%'}}>{ build.filename }</span>}
                            icon="system_update"
                            className="collapsible-header white-text product-sans cardColor"
                            style={{width: '100%', display: 'block'}}
                            expanded={expanded}
                            >
                            {expanded = false}
                                <BuildCard build={build} >
                                    <BuildChangelog changelog={build.changelog}/>
                                    <BuildLink link={build.url}/>
                                </BuildCard>
                        </CollapsibleItem>
                    </Collapsible>
                )
            })}
            </div>
        </div>

    )

}