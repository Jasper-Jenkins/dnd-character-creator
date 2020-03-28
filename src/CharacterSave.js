import React from 'react'


const CharacterSave = (props) => {
   // console.log("CharacterSave", props)


    //let saveButton = () => {
    //    if (this.isSelected(classSelected)) {
    //        return (<button className='shiny' onClick={() => this.saveCharacter(classSelected)}>Save</button>);
    //    } else {
    //        return (<button>Save</button>);
    //    }
    //}

    
    //const saveCharacter = (data, filename, type) => {
    //    var file = new Blob([JSON.stringify(data)], { type: type });
    //    if (window.navigator.msSaveOrOpenBlob) // IE10+
    //        window.navigator.msSaveOrOpenBlob(file, filename);
    //    else { // Others
    //        var a = document.createElement("a"),
    //            url = URL.createObjectURL(file);
    //        a.href = url;
    //        a.download = filename;
    //        document.body.appendChild(a);
    //        a.click();
    //        setTimeout(function () {
    //            document.body.removeChild(a);
    //            window.URL.revokeObjectURL(url);
    //        }, 0);
    //    }
    //}
    

    //const saveCharacter = (classSelected) => {
    //    if (props.isClassSelected(classSelected)) {
    //        const characterSave = JSON.stringify(props.classSelected)
    //        var uriContent = "data:application/json," + encodeURIComponent(characterSave);
    //        window.open(uriContent, 'Save Character');
    //    }
    //}

    //if (props.isClassSelected(props.classSelected)) {
    //    return (<div className='col-12'>
    //        <button onClick={() => saveCharacter(props.classSelected, 'character', 'application/json')} >Save</button>
    //            </div>);
    //} else {
    return (<div className='col-12'>
                <p>Nothing</p>
            </div>);
    //}
    
    

    
}

export default CharacterSave
