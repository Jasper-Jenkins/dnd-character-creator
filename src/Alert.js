import React from 'react'
import ReactDOM from 'react-dom'

const UserAlert = (alertMessage) => {
    let message = ""
    if (alertMessage.length > 100) {
        message = "Yeah we dont do that here. Your message is way to long"
    } else {
        message = alertMessage
    }
    const element = (<div className='col text-center'>
                        <p>{message}</p>
                    </div>);
    ReactDOM.render(element, document.getElementById('alert'))
    const fadeOut = document.getElementById('alert')
    setTimeout(function () {
        var fade = setInterval(function () {
            if (!fadeOut.style.opacity) {
                fadeOut.style.opacity = 1;
            }
            if (fadeOut.style.opacity > 0) {
                fadeOut.style.opacity -= 0.01;
            } else {
                ReactDOM.unmountComponentAtNode(document.getElementById('alert'));
                fadeOut.style.opacity = 1;
                clearInterval(fade);
            }
        }, 10)
    }, 1700)
}

export default UserAlert