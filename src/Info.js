import React from 'react'
import CharacterClass from './CharacterClass'

const Info = (props) => {
    console.log('info props', props)

    switch (props.category) {
        case 'races':
            if (props.isRaceSelected) {
                return (<div className="col-12 info">
                            <p>{props.raceSelected.name}</p>
                            <p>{props.raceSelected.speed}</p>
                            <p>{props.raceSelected.alignment}</p>
                        </div>);
            } else {
                return (<div className="col-12 info">
                            <p>...Choose your race</p>
                        </div>);
            }
        case 'classes':
            if (props.isClassSelected) {
           //     console.log('info proficiency', props.classSelected)
                return (<CharacterClass classProps={props} />);
            } else {
                return (<div className="col-12 info">
                            <p>...Choose your class</p>
                        </div>);
            }
        case 'ability-scores':
            var abilities = Object.keys(props.abilityScoresSelected); 
            let abilityScoresDisplay = abilities.map((ability, index) => {
                return (<div className='col-2 text-center abilityScores' key={index}>{props.abilityScoresSelected[ability]}</div>);
            });
            return (<div className="col-12 info">
                        <div className="row" >
                            {abilityScoresDisplay}  
                        </div>
            </div>);
        case 'proficiencies':
            if (props.isClassSelected) {
                //     console.log('info proficiency', props.classSelected)
                return (<CharacterClass classProps={props} />);
            } else {
                return (<div className="col-12 info">
                    <p>...Choose your class to select proficiencies </p>
                </div>);
            }
         default:
            
        }
    }
    
export default Info