import React from 'react'
import CharacterImages from'./CharacterImages'
//import ClassProficiencies from './ClassProficiencies'
//import CharacterClass from './CharacterClass'


const Info = (props) => {
    const raceSelected = props.character.raceSelected
    const classSelected = props.character.classSelected
    let ability_bonuses = [];
    if (props.character.isRaceSelected(raceSelected)) {
        ability_bonuses = props.character.raceSelected.ability_bonuses.map((bonus) => {
            return (<li key={bonus.name}>{bonus.name}: {bonus.bonus}</li>);
        });
    }


    switch (props.character.navigation) {
        case "Races":
            if (props.character.isRaceSelected(raceSelected)) {
                return (<div className="col-12 info">
                            <CharacterImages {...props.character} />
                            <h3>{raceSelected.name}</h3>
                            <h3>{classSelected.name}</h3>
                            <p>Racial ability bounues</p>
                            <ul>{ability_bonuses}</ul>
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
                const { hit_die } = props.character.classSelected
                const saving_throws = props.character.classSelected.saving_throws.map((saving_throw) => {
                    return (<li key={saving_throw.name.toLowerCase()}>{saving_throw.name}</li>);
                });
                return (<div className="col-12 info">
                            <CharacterImages {...props.character} />
                                
                            <h3>{raceSelected.name}</h3>
                            <h3>{classSelected.name}</h3>
                            
                            <p>Hit die: d{hit_die}</p>
                            <p>Saving throws</p>    
                            <ul>{saving_throws}</ul>
                        </div>);
            } else {
                return (<div className="col-12 info">
                            <CharacterImages {...props.character} />
                            <h3>{raceSelected.name}</h3>
                            <p className='text-center'> ...Choose your class</p>
                        </div>);
            }
        case 'Ability-Scores':
            var abilities = Object.keys(props.character.abilityScoresSelected);
            let abilityScoresInfo = abilities.map((ability) => {
                return (<div className='col text-center abilityScores' key={ability}>
                        <h6>{ability}</h6>
                        {props.character.abilityScoresSelected[ability]}
                        </div>);
            });
            return (<div className="col-12 info">
                        <CharacterImages {...props.character} />
                        <h3>{raceSelected.name}</h3>
                        <h3>{classSelected.name}</h3>
                        <div className='row row-col-4'>
                            {abilityScoresInfo}
                        </div>
                    </div>);
        case 'Proficiencies':
            if (props.character.isClassSelected(classSelected)) {
                console.log("no problems here yet")
                const { proficiencies } = props.character
                let characterProficiencies = proficiencies.map((proficiency) => {
                    return (<li key={proficiency.name}>{proficiency.name}</li>)
                });
                return (<div className="col-12 info">
                            <CharacterImages {...props.character} />
                            <h3>{props.character.raceSelected.name}</h3>
                            <h3>{props.character.classSelected.name}</h3>
                            <ul>{ability_bonuses}</ul>
                            <p>Starting Proficiencies</p>
                            <ul>{characterProficiencies}</ul>
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