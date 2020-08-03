import React from 'react'
//import CharacterImages from'./CharacterImages'

function InfoDisplay (raceName, className, hit_die, ability_bonuses, saving_throws){
    return (<div className="col-12 info">
        <table className='infoDisplay'>
            <tbody>
                <tr>
                    <th><h3>{raceName}</h3></th>
                    <th><h3>{className}</h3></th>
                </tr>
                <tr>
                    <td>Ability bonuses <ul>{ability_bonuses}</ul></td>
                    <td>Hit die: {hit_die}</td>
                </tr>
                <tr>
                    <td></td>
                    <td>Saving throws<ul>{saving_throws}</ul></td>
                </tr>
            </tbody>
        </table>
    </div>);
}

//Work on refactoring this mess
const Info = (props) => {
    console.log("Info props", props)
    const { raceSelected } = props
    const { classSelected } = props
    const { abilityScoresInfo } = props
    const { proficiencies } = props
    const { spellsChosen } = props
    const { selectedSpell } = props
    const { updateSelectedSpell } = props 

    let raceName = ""
    let className = "" 
    let hit_die = ""
    let ability_bonuses = []
    let saving_throws = []
    let characterProficiencies = []
    let classSpells = []

    if (props.isRaceSelected(raceSelected)) { //setting up info for when a race has been selected
        raceName = raceSelected.name
        hit_die = props.classSelected.hit_die
        ability_bonuses = props.raceSelected.ability_bonuses.map((bonus, index) => {
            for (var i = 0; i < abilityScoresInfo.length; i++) {
                if (abilityScoresInfo[i].name === bonus.name) {
                    return (<li key={index}>{abilityScoresInfo[i].full_name}: +{bonus.bonus}</li>);
                }
            }
            return (<li key={index}>Ability: +BONUS</li>);
        });
    }

    if (props.isClassSelected(classSelected)) { //setting up info for when a class has been selected
        className = classSelected.name
        saving_throws = props.classSelected.saving_throws.map((saving_throw, index) => {
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
                if (spell === selectedSpell) {
                    return (<li key={spell.name}>{spell.name}</li>);
                } else {
                    return (<li onClick={() => updateSelectedSpell(spell)} key={spell.name}>{spell.name}</li>);
                }
            })
        } 
    }
    
    switch (props.navigation) {
        case "Races":        
            if (props.isRaceSelected(raceSelected) || props.isClassSelected(classSelected)) {
                return InfoDisplay(raceName, className, hit_die, ability_bonuses, saving_throws);
            } else {
                return (<div className="col-12 info">
                            <p className='text-center'> ...Choose your race</p>
                        </div>);
            }
        case 'Classes':
            if (props.isClassSelected(classSelected) || props.isRaceSelected(raceSelected)) {
                return InfoDisplay(raceName, className, hit_die, ability_bonuses, saving_throws);
            } else {
                return (<div className="col-12 info">
                            <h3>{raceName}</h3>
                            <p className='text-center'> ...Choose your class</p>
                        </div>);
            }
        case 'Ability-Scores':
            var abilities = Object.keys(props.abilityScoresSelected);
            let abilityScores = abilities.map((ability) => {
                return (<div className='col text-center abilityScores' key={ability}>
                            <h6>{ability}</h6>
                            {props.abilityScoresSelected[ability]}
                </div>);
            });
            if (props.isRaceSelected(raceSelected)) {
                let bonuses = raceSelected.ability_bonuses.map((bonus) => {
                    return bonus
                });
                abilityScores = abilities.map((ability) => {
                    for (var i = 0; i < bonuses.length; i++) {
                        if (bonuses[i].name.toLowerCase() === ability) {
                            return (<div className='col text-center abilityScores' key={ability}>
                                        <h6>{ability}</h6>
                                        <p>{props.abilityScoresSelected[ability]}+{bonuses[i].bonus}</p>
                                    </div>);
                        }
                    }
                    return (<div className='col text-center abilityScores' key={ability}>
                                <h6>{ability}</h6>
                                <p>{props.abilityScoresSelected[ability]}</p>
                            </div>);
                });
                console.log("BONUSES", bonuses)
                return (<div className="col-12 info">
                            <h3>{raceSelected.name}</h3>
                            <h3>{classSelected.name}</h3>
                            <div className='row row-col-4'>
                                {abilityScores}
                            </div>
                        </div>);
            }
            return (<div className="col-12 info">
                        <h3>{raceSelected.name}</h3>
                        <h3>{classSelected.name}</h3>
                        <div className='row row-col-4'>
                            {abilityScores}
                        </div>
                    </div>);
        case 'Proficiencies':
            if (props.isClassSelected(classSelected)) {
                return (<div className="col-12 info">
                            <h3>{props.raceSelected.name}</h3>
                            <h3>{props.classSelected.name}</h3>
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
            if (props.isClassSelected(classSelected)) {
                let spellDescription = []
                if (selectedSpell.name === undefined) {
                    console.log("check check check")
                } else {
                    spellDescription = selectedSpell.desc.map((desc, index) => {
                        return (<p key={index}>{desc}</p>)
                    })

                }
                return (<div className="col-12 info">
                            <h3>{props.raceSelected.name}</h3>
                            <h3>{props.classSelected.name}</h3>
                            <ul>{ability_bonuses}</ul>
                            <p>Spells</p>
                            <ul>{classSpells}</ul>
                            <h4>{selectedSpell.name}</h4>
                            {spellDescription}
                        </div>)
            } else {
                return (<div className='col-12 info'>
                            <p className='text-center'>..Choose your class to select spells </p>
                        </div>);
            }
        default:
            return InfoDisplay(raceName, className, hit_die, ability_bonuses, saving_throws); //this needs to be a <div>, or anything other than null
        }
    }
    
export default Info