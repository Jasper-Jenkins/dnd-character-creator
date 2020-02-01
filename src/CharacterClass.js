import React from 'react'
import ClassProficiencies from './ClassProficiencies'

const CharacterClass = props => {
    console.log("character class component", props)
    const { classProficiencies } = props.classProps
    const { classProficienciesChoices} = props.classProps
    const { addProficiency } = props.classProps

    if (classProficiencies.length > 0) {
         return (<div className='col-12 info'>
                   <ClassProficiencies classProficiencies={classProficiencies} classProficienciesChoices={classProficienciesChoices} addProficiency={addProficiency} />
                </div>);
    } else {
        return (<div>breaking class</div>);
    }

    
}

export default CharacterClass