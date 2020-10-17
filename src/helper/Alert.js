import React from 'react'

const UserAlert = (props) => { //this needs better validation against invalid messages
  //  console.log("userAlert props", props);

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
