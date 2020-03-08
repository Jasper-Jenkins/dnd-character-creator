import React from 'react'
import AbilityScoresForm from './AbilityScoresForm'
import ClassProficiencies from './ClassProficiencies'

const Selection = (props) => {
    console.log("Selection() props", props)
    

    switch (props.navigation) {
        case 'Races':
            let races = props.races.results.map((race, index) => {
                return (<button onClick={() => props.displayRaceInfo(race.index)} className='btn btn-primary col-4' key={index}>{race.name}</button>)
            });
            return (<div className="col-12 text-center selection">{races}</div>);
        case 'Classes':
            let classes = props.classes.results.map((characterClass, index) => {
                return (<button onClick={() => props.displayClassInfo(characterClass.index)} className='btn btn-primary col-4' key={index}>{characterClass.name}</button>)
            });
            return (<div className='col-12 text-center selection'>{classes}</div>);

        case 'Proficiencies':
          //     console.log("Selection() proficiencies", props.classSelected)
            const { classSelected } = props.classSelected
                                 
            if (props.isClassSelected(classSelected)) {
                return (<div className='col-12 text-center selection'>You must first choose a class, before you can select your proficiencies.</div>)
            } else {
                return (<ClassProficiencies characterClass={props} />);
            }

            case 'Spells':

            return (<div className='col-12'>HMmmm spell transfer is off</div>);

        case 'Ability-Scores':
            let abilityScores = props.abilityScores.results.map((abilityScore, index) => {
                return (<button onClick={() => props.getScore(abilityScore.index)} className='btn btn-primary col-2' key={index}>{abilityScore.name}</button>)
            });
            return (
                <div className='col-12 text-center selection'>
                    <div className='row'>
                        <div className='col-12'>
                            {abilityScores}
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12'>
                            <AbilityScoresForm handleSubmit={props.handleSubmit} />
                        </div>
                    </div>
                </div>
            );

        default:
            return (<div className='col-12 text-center selection'>DEFAULT: It's a broke!</div>);

    }
}

export default Selection 