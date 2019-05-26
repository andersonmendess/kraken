import React,{Component} from 'react'

export const AppCtx = React.createContext()
export const AppProvider = AppCtx.Provider
export const AppConsumer = AppCtx.Consumer

export class AppContext extends Component{
    render(){
        let context = {
            php: 'IS SHIT'
        }

        return (
            <AppProvider value={context}>
                {this.props.children}
            </AppProvider>
        )
    }
}
export default AppContext