import React, { Component } from 'react'
import someComponenet from './someComponent'

class CreateCharacter extends Component {
    constructor(props) {
        this.state = {            
            alert: this.alertMessage,
        };  
    }

    alertMessage() {
        alert("wheeeeee")
    }

    render() {
        return (<div>
                   <SomeComponent {...this.state} />
                </div>)
    }
}


class CreateCharacter extends Component {
    constructor(props) {
        this.state = {
            alert: this.alertMessage,
        };
    }

    alertMessage() {
        alert("wheeeeee")
    }

    render() {
        return (<div>
            <SomeComponent alertMessage={this.alertMessage} />
        </div>)
    }
}



export default UserAlert;


