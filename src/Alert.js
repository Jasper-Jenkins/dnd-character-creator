import React from 'react'
import ReactDOM from 'react-dom'

const UserAlert = (props) => { //this needs better validation against invalid messages
    console.log("UserAlert props", props)

   // let message = "";
   // if (alertMessage.length > 100) {
   //     message = "Yeah we dont do that here. Your message is way to long";
   // } else {
   //     message = alertMessage;
   // }
   // let userAlert = document.createElement("DIV");
   // let alertText = document.createTextNode(message);
   // userAlert.setAttribute("id", "alert");
   // userAlert.setAttribute("class", "row");
   // userAlert.appendChild(alertText);
   // document.getElementById('creator').appendChild(userAlert);
   // const element = (<div className='col text-center'>
   //                     <p>{message}</p>
   //                  </div>);
   // const alertNode = document.getElementById('alert');
   //// ReactDOM.render(element, alertNode);
   // setTimeout(function () {
   //     let fade = setInterval(function () {
   //         if (!alertNode.style.opacity) {
   //             alertNode.style.opacity = 1;
   //         }
   //         if (alertNode.style.opacity > 0) {
   //             alertNode.style.opacity -= 0.01;
   //         } else {
   //             alertNode.style.opacity = 1;
   //             clearInterval(fade);
   //             userAlert.parentNode.removeChild(userAlert);
   //         }
   //     }, 10);// If I do not wait the 10 seconds, it craps on my parade!
   // }, 1700);
    let element = (<div className='row' id='alert'></div>)

    if (props.alertMessage.length > 0) {
        element = (<div className='row' id='alert'>
                        <div className='col text-center'>
                            {props.alertMessage}
                        </div>
                    </div>)
    }
       
    return (element)
}

export default UserAlert;