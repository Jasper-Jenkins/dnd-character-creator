import React from 'react'
import ClassProficiencies from './ClassProficiencies'

const CharacterClass = props => {
    console.log(props)
    const { classProficiencies } = props.classProps
    const { classProficienciesChoices} = props.classProps
    const { addProficiency } = props.classProps
    const { removeProficiency } = props.classProps





    if (classProficiencies.length > 0) {
        return (<div className='col-12 info'>
            <ClassProficiencies classProficiencies={classProficiencies} classProficienciesChoices={classProficienciesChoices} addProficiency={addProficiency} removeProficiency={removeProficiency} />
                </div>);
    } else {
        return (<div>Choose a class first in order to select proficiencies</div>);
    }

    
}

export default CharacterClass