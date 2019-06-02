import React,{useRef, useEffect} from 'react'
import { Collapsible, CollapsibleItem } from 'react-materialize/';
import BuildCard from './buildCard'
import BuildChangelog from './buildChangelog'
import BuildLink from './buildLink'

export default props => {

    

    const {builds, match: {params}} = props
    const buildRef = useRef(null)

    function isBuildOnPath(build){
        return params.build && params.build === build
    }

    useEffect(() => {
        // buildRef.current.focus();
    }, [props.match.params.build])
    
    function onClick(build){
        const { push } = props.history
        let buildOnPath = isBuildOnPath(build)?'':`/${build}`
        push({
            pathname: `/${params.codename}${buildOnPath}`
          })
    }

    return (
        <div className="row center">
          <div className="col s12 m12 center builds">
            {builds.map(build => {
                return (
                    <Collapsible key={build.md5}>
                        <CollapsibleItem 
                            header={<><span style={{width: '100%'}}>{ build.filename }</span> <i className="material-icons">arrow_drop_down</i></>}
                            icon="system_update"
                            className="collapsible-header white-text product-sans cardColor"
                            style={{width: '100%', display: 'block', padding: '0px'}}
                            expanded={isBuildOnPath(build.filename)}
                            onClick={() => onClick(build.filename)}
                            // ref={buildRef}
                            >
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