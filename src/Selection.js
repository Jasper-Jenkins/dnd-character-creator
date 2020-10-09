import React from 'react'
import AbilityScoresForm from './AbilityScoresForm'
import ClassProficiencies from './ClassProficiencies'
import ClassSpells from './ClassSpells'
import Races from './champion/Races'
import Classes from './champion/Classes'
import isSelected from './helper/helper-functions'

const Selection = (props) => {
    console.log("Selection() props", props)

    const abilityScores = props.abilityScores;
    const classSelected = props.classSelected;
    const navigation = props.navigation;
    const getScore = props.getScore;

    switch (navigation) {
        case 'Races':
            return (<Races {...props} />);           
        case 'Classes':
            return (<div className='col-12 text-center selection'><Classes {...props} /></div>); 
        case 'Proficiencies':
            if (isSelected(classSelected)) {
                return (<div className='col-12 text-center selection'>
                            <ClassProficiencies {...props}/>
                        </div>);
            }
            return (<div className='col-12 text-center selection'>You must first choose a class, before you can select your proficiencies.</div>)
            
        case 'Spells':
            if (isSelected(classSelected) && classSelected.spellcasting !== undefined) {
                return (<div className='col-12 text-center selection'>
                            <ClassSpells {...props} />
                        </div>);
            }
            return (<div className='col-12 text-center selection'>{classSelected.name} is not a spell caster.</div>);
            
        case 'Ability-Scores':
            let scores = abilityScores.results.map((abilityScore, index) => {
                return (<button onClick={() => getScore(abilityScore.index)} className='col-2 abilityScoresSelection' key={index}>{abilityScore.name}</button>)
            });
            return (
                <div className='col-12 text-center selection'>
                    <div className='row'>
                        <div className='col-12'>
                            {scores}
                        </div>
                        <AbilityScoresForm handleSubmit={props.handleSubmit} />
                    </div>

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