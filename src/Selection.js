import React from 'react'
import AbilityScoresForm from './AbilityScoresForm'
import ClassProficiencies from './ClassProficiencies'
import ClassSpells from './ClassSpells'
import Races from './champion/Races'
import Classes from './champion/Classes'
import isSelected from './helper/helper-functions'

const Selection = (props) => {
    //console.log("Selection() props", props)
    const abilityScoresInfo = props.abilityScoresInfo;
    const classSelected = props.classSelected;
    const navigation = props.navigation;
    const getScore = props.getScore; 

    switch (navigation) {
        case 'Races':
            return (<Races {...props} />);           
        case 'Classes':
            return (<Classes {...props} />); 
        case 'Proficiencies':
            if (isSelected(classSelected)) {
                return (<ClassProficiencies {...props} />);
            }
            return (<div className='col-12 text-center selection'>You must choose a class to select your proficiencies.</div>);            
        case 'Spells':
            if (isSelected(classSelected) && classSelected.spellcasting !== undefined) { // Needs better validation? 
                return (<ClassSpells {...props} />);
            }
            return (<div className='col-12 text-center selection'>{classSelected.name} is not a spell caster.</div>);            
        case 'Ability-Scores':
            let scores = abilityScoresInfo.map((abilityScore, index) => {
                return (<button onClick={() => getScore(abilityScore.index)} className='col-4 selectionButtons' key={index}>{abilityScore.full_name}</button>)
            });
            return (
                <div className='col-12 text-center selection'>                    
                        {scores}                        
                        <AbilityScoresForm handleSubmit={props.handleSubmit} />
                </div>
            );
        default:
            return (<div className='col-12 text-center selection'>DEFAULT: It's a broke!</div>);
    }    
}

//<div className='row'>
    //<div className='col-12'>
    //    <AbilityScoresForm handleSubmit={props.handleSubmit} />
    //</div>
//</div>

export default Selection 