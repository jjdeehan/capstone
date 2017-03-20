import React from 'react';
import events from './events';

export default class extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            setting: this.props.setting,
            user: this.props.user
        }
    }

    handleClick(user){
        events.trigger('startCall', user);
    }

    render() {
        return (
            <div className="user" onClick={()=>this.handleClick(this.state.user)}>
                {this.props.user.name} 
            </div>
        );
    }

}