import React from 'react'
import isSelected from './helper/helper-functions'
//import CharacterImages from'./CharacterImages'
//import ClassProficiencies from './ClassProficiencies'

function InfoDisplay(raceName, className, hit_die, ability_bonuses, abilityScores, saving_throws, characterProficiencies){ //choose 1, either underscores or camelCase. You can't have both!!! Or can you...no

    return (<div className="col-12 info">
        <div className='row'>
            <div className='col-12 characterTitle'>
                <h3>{raceName ? raceName : "Race" } {className ? className : "Class"}</h3>
                <div className='row scores'>{abilityScores}</div>  
            </div>
            <div className='col-6'>            
                <strong>Ability bonuses</strong><br />
                <ul>{ability_bonuses}</ul>
            </div>
            <div className='col-6'>
                <strong>Hit die: </strong>{hit_die}<br />
                <strong>Saving throws</strong><br />
                <ul>{saving_throws}</ul>
                <strong>Proficiencies</strong>
                <ul>
                    {characterProficiencies}
                </ul>
            </div>
        </div>
    </div>);
}

//Work on refactoring this mess
const Info = (props) => {
  //  console.log("Info props", props)
    const { raceSelected } = props
    const { classSelected } = props
    const { abilityScoresInfo } = props
    const { proficiencies } = props
    const { spellsChosen } = props
    const { selectedSpell } = props
    const { setSelectedSpell } = props 
  //  const { proficienciesChosen } = props

    let raceName = null;
    let className = null; 
    let hit_die = "";
    let ability_bonuses = [];
    let saving_throws = [];
    let characterProficiencies = [];
    let classSpells = [];
  //  let classFeatures = [];

    let bonuses = []

    //let abilities = Object.keys(props.abilityScoresSelected);
    console.log("HERE", props.abilityScoresInfo);

    let abilityScores = abilityScoresInfo.map((ability) => {
        return (<div className='col-2 text-center score' key={ability.index}>
            <p>{ability.full_name}</p>
            <p className='scoreBonus'>{props.abilityScoresSelected[ability.index]}</p>
        </div>);
    });

    console.log(abilityScores)
    
    if (isSelected(raceSelected)) { //setting up info for when a race has been selected
        raceName = raceSelected.name
        ability_bonuses = raceSelected.ability_bonuses.map((bonus, index) => {
            for (var i = 0; i < abilityScoresInfo.length; i++) {
                if (abilityScoresInfo[i].name === bonus.ability_score.name) {
                    return (<li key={index}>{abilityScoresInfo[i].full_name}: +{bonus.bonus}</li>);
                }
            }
            return (<li key={index}>Ability: +BONUS</li>);
        });        
        bonuses = raceSelected.ability_bonuses.map((bonus) => {
           // console.log(bonus)
            return bonus
        });

       // console.log(bonuses);
        abilityScores = abilityScoresInfo.map((ability) => {
            for (var i = 0; i < bonuses.length; i++) {
                if (bonuses[i].ability_score.name.toLowerCase() === ability.index) {
                    return (<div className='col-2 text-center score' key={ability.index}>
                        <p>{ability.full_name}</p>
                        <p className='scoreBonus'>{props.abilityScoresSelected[ability.index]}+{bonuses[i].bonus}</p>
                    </div>);
                }
            }
            return (<div className='col-2 text-center score' key={ability.index}>
                <p>{ability.full_name}</p>
                <p className='scoreBonus'>{props.abilityScoresSelected[ability.index]}</p>
            </div>);
        });
    }

    if (isSelected(classSelected)) { //setting up info for when a class has been selected
        className = classSelected.name
        hit_die = props.classSelected.hit_die
        saving_throws = props.classSelected.saving_throws.map((saving_throw, index) => {
            for (var j = 0; j < abilityScoresInfo.length; j++) {
                if (abilityScoresInfo[j].name === saving_throw.name) {
                    return (<li key={saving_throw.name.toLowerCase()}>{abilityScoresInfo[j].full_name}</li>);
                }
            }
            return (<li key={index}>Ability: +BONUS</li>);
        });

       // console.log("Chosen profs ", proficienciesChosen);
      
        characterProficiencies = proficiencies.map((proficiency) => {
            return (<li key={proficiency.name}>{proficiency.name}</li>);
        });




        if (spellsChosen.length > 0) {
            classSpells = spellsChosen.map((spell) => {
                if (spell === selectedSpell) {
                    return (<li key={spell.name}>{spell.name}</li>);
                } else {
                    return (<li onClick={() => setSelectedSpell(spell)} key={spell.name}>{spell.name}</li>);
                }
            });            
        } 
    }
    
    switch (props.navigation) {
        //case "Races":        
        //    if (props.isRaceSelected(raceSelected) || props.isClassSelected(classSelected)) {
        //        return InfoDisplay(raceName, className, hit_die, ability_bonuses, saving_throws);
        //    } else {
        //        return (<div className="col-12 info">
        //                    <p className='text-center'> ...Choose your race</p>
        //                </div>);
        //    }
        //case 'Classes':
        //    if (props.isClassSelected(classSelected) || props.isRaceSelected(raceSelected)) {
        //        return InfoDisplay(raceName, className, hit_die, ability_bonuses, saving_throws);
        //    } else {
        //        return (<div className="col-12 info">
        //                    <h3>{className}</h3>
        //                    <p className='text-center'> ...Choose your class</p>
        //                </div>);
        //    }
        case 'Ability-Scores':
            return InfoDisplay(raceName, className, hit_die, ability_bonuses, abilityScores, saving_throws, characterProficiencies);
        case 'Proficiencies':
            return InfoDisplay(raceName, className, hit_die, ability_bonuses, abilityScores, saving_throws, characterProficiencies);
        case 'Spells':
            if (isSelected(classSelected)) {
                let spellDescription;
                if (selectedSpell.name === undefined) {
               //     console.log("check check check")
                } else {
                    spellDescription = <p>{selectedSpell.desc}</p>
                }
                return (<div className='col-12 info'>
                    <div className='row'>
                        <div className='col-12'>
                            <h3>{props.raceSelected.name} {props.classSelected.name}</h3>
                        </div>
                        <div className='col-3'>
                            <p>Spells</p>
                            <ul>{classSpells}</ul>
                        </div>
                        <div className='col-9'>
                            <h4>{selectedSpell.name} {selectedSpell.level}</h4>
                            {spellDescription}
                        </div>
                    </div>
                </div>);
            } else {
                return (<div className='col-12 info'>
                            <p className='text-center'>..Choose your class to select spells </p>
                        </div>);
            }
        default:
            return InfoDisplay(raceName, className, hit_die, ability_bonuses, abilityScores, saving_throws, characterProficiencies); 
        }
    }
    
export default Info