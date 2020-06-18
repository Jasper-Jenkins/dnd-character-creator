
//CreateCharacter.js

import React, { Component } from 'react'

class CreateCharacter extends Component {
    constructor(props) {
        this.state = props;
        this.state['alertMessage'] = ""
        this.state['updateAlertMessage'] = this.updateAlertMessage;
    }

    updateAlertMessage = (message) => {
        this.setState({ alertMessage: message }, this.fadeMessage());
    }

    fadeMessage = () => {
        const alertNode = document.getElementById('alert');
        setTimeout(function () {
            let fade = setInterval(function () {
                if (!alertNode.style.opacity) {
                    alertNode.style.opacity = 1;
                }
                if (alertNode.style.opacity > 0) {
                    alertNode.style.opacity -= 0.01;
                } else {
                    clearInterval(fade);
                }
            }, 10);// If I do not wait the 10 seconds, it craps on my parade!
        }, 1700);
        this.setState({ alertMessage: "" });
        alertNode.style.opacity = 1;
    }

    render() {
        return (<div id='creator' className='container-fluid creation'>
                    <UserAlert alertMessage={this.state.alertMessage} />
                    <CompnentThatUsesTheUpdateAlertMessage updateAlertMessage={this.updateAlertMessage} />
                </div>)
    }
}

//Alert.js
import React from 'react'

const UserAlert = (props) => { 
    let element = (<div className='row' id='alert'></div>)//this is returned empty so nothing will show up on screen if there is currently no error message

    if (props.alertMessage.length > 0) {
        element = (<div className='row' id='alert'>
                        <div className='col text-center'>
                            {props.alertMessage}
                        </div>
                    </div>);
    }

    return (element);
}

export default UserAlert;


