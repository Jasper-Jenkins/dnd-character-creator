import React from 'react'
import ClassProficiencies from './ClassProficiencies'

const CharacterClass = props => {

    const { proficiencies } = props.classProps
    const { proficienciesChoices} = props.classProps
    const { addProficiency } = props.classProps

    if (proficiencies.length > 0) {
         return (<div className='col-12 info'>
                   <ClassProficiencies proficiencies={proficiencies} proficienciesChoices={proficienciesChoices} addProficiency={addProficiency} />
                </div>);
    } else {
        return (<div>breaking class</div>);
    }
    return (<div>breaking class</div>)

    
}

export default CharacterClass