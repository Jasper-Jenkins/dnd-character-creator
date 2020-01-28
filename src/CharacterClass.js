import React from 'react'

const CharacterClass = props => {
    console.log("Character Class proficiencies", props.classProps)
    
    console.log("Character Class proficiency choices", props.classProps.proficiencyChoices)


    return (<div className="col-12 info">
                <p>working on class again</p>
            </div>);


}

export default CharacterClass