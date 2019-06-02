import React, { Component } from 'react';

export const AppCtx = React.createContext()
export const AppProvider = AppCtx.Provider
export const AppConsumer = AppCtx.Consumer

export class AppContext extends Component{

    state = {
        active: '',
        devices: []
    }

    public = {
        setDevices : (devices) => {
            this.setState({devices})
        },
    }

    render(){
        let context = {
            ...this.state,
            ...this.public
        }
        return (
            <AppProvider value={context}>
                {this.props.children}
            </AppProvider>
        )
    }
}
export default AppContext