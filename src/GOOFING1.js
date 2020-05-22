function alertUser() {
    var divElem = document.createElement("DIV"); // style this div elements attribute with position: absolute, and a z-index: 10. 
                                                 // to ensure its positioning is out front and is independent of the other elements. 
                                                 // this elements parent is the body.
    document.body.appendChild(divElem);
    var divText = document.createTextNode("If you go back you will lose progress");
    divElem.appendChild(divText);

    var btnReturn = document.createElement("BUTTON");
    var btnStay = document.createElement("BUTTON");
    var btnReturnText = document.createTextNode("Go Back");
    var btnStayText = document.createTextNode("Stay on page");
    btnReturn.appendChild(btnReturnText);
    btnStay.appendChild(btnStayText);

    divElem.appendChild(btnReturn);
    divElem.appendChild(btnStay);    
    divElem.setAttribute("id", "customAlert")
    btnReturn.setAttribute("id", "return");
    btnStay.setAttribute("id", "stay");
    var returnButton = document.getElementById("return");
    var stayButton = document.getElementById("stay")
    returnButton.addEventListener('click', () => leavePage(event), false);
    stayButton.addEventListener('click', () => stayOnPage(event), false);

}


function leavePage(e) {
    alert("Left page, progress lost")
    var customAlert = document.getElementById('customAlert')
    customAlert.remove()
    /**
     Your code to handle the user leaving the page     
     */
}

function stayOnPage(e) {
    alert("Stayed on page")
    var customAlert = document.getElementById('customAlert')
    customAlert.remove()
    /**
    Your code to handle the user staying on the page
    **/

}