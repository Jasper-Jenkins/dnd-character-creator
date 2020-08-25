import React from 'react';
//import ReactDOM from 'react-dom'

const UserAlert = (props) => { //this needs better validation against invalid messages
  //  console.log("UserAlert props", props);
       
    let element = (<div className='row' id='alert'></div>);
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