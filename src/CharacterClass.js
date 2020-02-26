import React from 'react'
import ClassProficiencies from './ClassProficiencies'
import ClassSpells from './ClassSpells'

const CharacterClass = props => {
    console.log(props)
    const { classSelected } = props.classProps
    const { classProficiencies } = props.classProps
    const { classProficienciesChoices} = props.classProps
    const { category } = props.classProps
    const { spellsInfo } = props.classProps

    switch (category) {
        case 'classes':
            return (<div className='col-12 info'>
                    <h1 className='text-center'>{classSelected.name}</h1>
                    <p>Hit die: {classSelected.hit_die} + constitution modifier<br />
                   
                    </p>
                </div>);
        case 'proficiencies':
            return (<div className='col-12 info'>
                        <h1 className='text-center'>{classSelected.name}</h1>
                    </div>);
        case 'spells':

           
            return (<div className='col-12 spellsInfo'>
                        <h1 className='text-center'>{classSelected.name}</h1>  
                <ClassSpells classSelected={classSelected} spellsInfo={spellsInfo}/>
                    </div>)
        default:
    }     
}

export default CharacterClass