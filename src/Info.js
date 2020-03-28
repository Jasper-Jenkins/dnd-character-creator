import React from 'react'
import CharacterImages from'./CharacterImages'
//import ClassProficiencies from './ClassProficiencies'
//import CharacterClass from './CharacterClass'

const Info = (props) => {
 //   console.log("Info() props: ", props)
    const raceSelected = props.character.raceSelected
    const classSelected = props.character.classSelected


    switch (props.character.navigation) {
        case "Races":
            if (props.character.isRaceSelected(raceSelected)) {
                return (<div className="col-12 info">
                            <CharacterImages {...props.character} />
                            <h2>{raceSelected.name}</h2>
                            <h2>{classSelected.name}</h2>
                            <p>{raceSelected.alignment}</p>
                            <p>{raceSelected.size_description}</p>
                        </div>);
            } else {
                return (<div className="col-12 info">
                            <p className='text-center'>...Choose your race</p>
                        </div>);
            }
        case 'Classes':
            if (props.character.isClassSelected(classSelected)) {
                return (<div className="col-12 info">
                            <CharacterImages {...props.character} />
                            <h2>{raceSelected.name}</h2>
                            <h2>{classSelected.name}</h2>
                            <p>Starting Proficiencies:</p>
                        </div>);
            } else {
                return (<div className="col-12 info">
                            <CharacterImages {...props.character} />
                            <h2>{raceSelected.name}</h2>
                            <p className='text-center'> ...Choose your class</p>
                        </div>);
            }
        case 'Ability-Scores':
            var abilities = Object.keys(props.character.abilityScoresSelected);
            let abilityScoresInfo = abilities.map((ability) => {
                return (<div className='col text-center abilityScores' key={ability}>
                            {props.character.abilityScoresSelected[ability]}
                        </div>);
            });
            return (<div className="col-12 info">
                        <div className='row row-col-4'>
                            {abilityScoresInfo}
                        </div>
                    </div>);
        case 'Proficiencies':
            if (props.character.isClassSelected(classSelected)) {
                console.log("no problems here yet")
                const { proficiencies } = props.character
                let characterProficiencies = proficiencies.map((proficiency) => {
                    return (<span key={proficiency.name}>{proficiency.name} </span>)
                });


                return (<div className="col-12 info">
                            <CharacterImages {...props.character} />
                            <h2>{props.character.classSelected.name}</h2>
                            <p>{characterProficiencies}</p>
                        </div>);
            } else {
                return (<div className='col-12 info'>
                            <p className='text-center'>...Choose your class to select proficiencies </p>
                        </div>);
            }
        case 'Spells':
            if (props.character.isClassSelected(classSelected)) {
                return (<div className='col-12 info'>
                            <p className='text-center'>...Spell Information...</p> 
                        </div>)
            } else {
                return (<div className='col-12 info'>
                            <p className='text-center'>..Choose your class to select spells </p>
                        </div>);
            }
        default:
            return null;
        }
    }
    
export default Info