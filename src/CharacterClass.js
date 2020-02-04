import React from 'react'
import ClassProficiencies from './ClassProficiencies'

const CharacterClass = props => {
    console.log(props)
    const { classSelected } = props.classProps
    const { classProficiencies } = props.classProps
    const { classProficienciesChoices} = props.classProps
    const { addProficiency } = props.classProps
    const { removeProficiency } = props.classProps
    const { category } = props.classProps

    switch (category) {
        case 'classes':
            return (<div className='col-12 info'>
                <h1 className='text-center'>{classSelected.name}</h1>
                <p>Hit die: {classSelected.hit_die} + constitution modifier<br />
                   
                </p>
            </div>);
        case 'proficiencies':
            return (<div className='col-12 info'>
                <ClassProficiencies classProficiencies={classProficiencies} classProficienciesChoices={classProficienciesChoices} addProficiency={addProficiency} removeProficiency={removeProficiency} />
            </div>);
        default:
    }     
}

export default CharacterClass