import React from 'react'
import CharacterImages from'./CharacterImages'

const Info = (props) => {
    const { raceSelected } = props.character
    const { classSelected } = props.character
    const { abilityScoresInfo } = props.character
    const { proficiencies } = props.character
    const { spellsChosen } = props.character

    let raceName = ""
    let className = "" 
    let hit_die = ""
    let ability_bonuses = []
    let saving_throws = []
    let characterProficiencies = []
    let classSpells = []

    if (props.character.isRaceSelected(raceSelected)) {
        raceName = raceSelected.name
        hit_die = props.character.classSelected.hit_die
        ability_bonuses = props.character.raceSelected.ability_bonuses.map((bonus, index) => {
            for (var i = 0; i < abilityScoresInfo.length; i++) {
                if (abilityScoresInfo[i].name === bonus.name) {
                    return (<li key={index}>{abilityScoresInfo[i].full_name}: +{bonus.bonus}</li>);
                }
            }
            return (<li key={index}>Ability: +BONUS</li>);
        });
    }

    if (props.character.isClassSelected(classSelected)) {
        className = classSelected.name
        saving_throws = props.character.classSelected.saving_throws.map((saving_throw, index) => {
            for (var j = 0; j < abilityScoresInfo.length; j++) {
                if (abilityScoresInfo[j].name === saving_throw.name) {
                    return (<li key={saving_throw.name.toLowerCase()}>{abilityScoresInfo[j].full_name}</li>);
                }
            }
            return (<li key={index}>Ability: +BONUS</li>);
        });
        characterProficiencies = proficiencies.map((proficiency) => {
            return (<li key={proficiency.name}>{proficiency.name}</li>);
        });
        if (spellsChosen.length > 0) {
            classSpells = spellsChosen.map((spell) => {
                return (<li key={spell.name}>{spell.name}</li>);
            })
        }

    }
    
    switch (props.character.navigation) {
        case "Races":        
            if (props.character.isRaceSelected(raceSelected) || props.character.isClassSelected(classSelected)) {
                return (<div className="col-12 info">
                            <CharacterImages {...props.character} />
                            <h3>{raceName}</h3>
                            <h3>{className}</h3>
                            <p>Hit die: {hit_die}</p>
                            <p>{raceName} ability bonuses</p>
                            <ul>{ability_bonuses}</ul>
                            <p>Saving throws</p>
                            <ul>{saving_throws}</ul>
                        </div>)
            } else {
                return (<div className="col-12 info">
                            <CharacterImages {...props.character} />
                            <p className='text-center'> ...Choose your class</p>
                        </div>);
            }
        case 'Classes':
            if (props.character.isClassSelected(classSelected) || props.character.isRaceSelected(raceSelected)) {
                return (<div className="col-12 info">
                            <CharacterImages {...props.character} />
                            <h3>{raceName}</h3>
                            <h3>{className}</h3>
                            <p>Hit die: {hit_die}</p>
                            <p>{raceName} ability bonuses</p>
                            <ul>{ability_bonuses}</ul>
                            <p>Saving throws</p>
                            <ul>{saving_throws}</ul>
                        </div>)
            } else {
                return (<div className="col-12 info">
                            <CharacterImages {...props.character} />
                            <h3>{raceName}</h3>
                            <p className='text-center'> ...Choose your class</p>
                        </div>);
            }
        case 'Ability-Scores':
            var abilities = Object.keys(props.character.abilityScoresSelected);
            let abilityScores = abilities.map((ability) => {
                return (<div className='col text-center abilityScores' key={ability}>
                            <h6>{ability}</h6>
                            {props.character.abilityScoresSelected[ability]}
                </div>);
            });
            if (props.character.isRaceSelected(raceSelected)) {
                let bonuses = raceSelected.ability_bonuses.map((bonus) => {
                    return bonus
                });
                abilityScores = abilities.map((ability) => {
                    for (var i = 0; i < bonuses.length; i++) {
                        if (bonuses[i].name.toLowerCase() === ability) {
                            return (<div className='col text-center abilityScores' key={ability}>
                                        <h6>{ability}</h6>
                                        <p>{props.character.abilityScoresSelected[ability]}+{bonuses[i].bonus}</p>
                                    </div>);
                        }
                    }
                    return (<div className='col text-center abilityScores' key={ability}>
                                <h6>{ability}</h6>
                                <p>{props.character.abilityScoresSelected[ability]}</p>
                            </div>);
                });
                console.log("BONUSES", bonuses)
                return (<div className="col-12 info">
                            <CharacterImages {...props.character} />
                            <h3>{raceSelected.name}</h3>
                            <h3>{classSelected.name}</h3>
                            <div className='row row-col-4'>
                                {abilityScores}
                            </div>
                        </div>);
            }
            return (<div className="col-12 info">
                        <CharacterImages {...props.character} />
                        <h3>{raceSelected.name}</h3>
                        <h3>{classSelected.name}</h3>
                        <div className='row row-col-4'>
                            {abilityScores}
                        </div>
                    </div>);
        case 'Proficiencies':
            if (props.character.isClassSelected(classSelected)) {
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
               
                return (<div className="col-12 info">
                            <CharacterImages {...props.character} />
                            <h3>{props.character.raceSelected.name}</h3>
                            <h3>{props.character.classSelected.name}</h3>
                            <ul>{ability_bonuses}</ul>
                            <p>Spells</p>
                            <ul>{classSpells}</ul>
                            <p>{}</p>
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