import React, { Component } from 'react'
import isSelected from './helper/helper-functions'

class Info extends Component {
    constructor(props) {
        super(props);
        this.state = {            
            raceName: null,
            className: null,
            hit_die: null,
            abilityScores: [],
            ability_bonuses: [],
            saving_throws: [],
            characterProficiencies: [],
            classSpells: [],
        }
        
    }

    componentDidMount() {
        this.setInfo();
    }

    setInfo() {
        console.log("Info props", this.props)
        //const { raceSelected } = this.props
        //const { classSelected } = this.props
        //const { abilityScoresInfo } = this.props
        //const { proficiencies } = this.props
        //const { spellsChosen } = this.props
        //const { selectedSpell } = this.props
        //const { setSelectedSpell } = this.props 

        //let raceName = null;
        //let className = null;
        //let hit_die = "";
        //let ability_bonuses = [];
        //let saving_throws = [];
        //let characterProficiencies = [];
        //let classSpells = [];
        ////  let classFeatures = [];

        //let bonuses = []

        //let abilityScores = abilityScoresInfo.map((ability) => {
        //    let abilityScore = "abilityScore";
        //    if (isSelected(classSelected)) {
        //        for (var a = 0; a < classSelected.saving_throws.length; a++) {
        //            if (ability.index === classSelected.saving_throws[a].index) {
        //                abilityScore += "abilityScore savingThrow "
        //            }
        //        }
        //    }
        //    return (<div className='col-2 text-center ability' key={ability.index}>
        //        <p>{ability.full_name}</p>
        //        <p className={abilityScore}>{this.props.abilityScoresSelected[ability.index]}</p>
        //    </div>);
        //});     

        //if (isSelected(raceSelected)) { //setting up info for when a race has been selected
        //    raceName = raceSelected.name
        //    ability_bonuses = raceSelected.ability_bonuses.map((bonus, index) => {
        //        for (var i = 0; i < abilityScoresInfo.length; i++) {
        //            if (abilityScoresInfo[i].name === bonus.ability_score.name) {
        //                return (<li className='col-6 align-self-center text-center' key={index}>{abilityScoresInfo[i].full_name}: +{bonus.bonus}</li>);
        //            }
        //        }
        //        return (<li key={index}>Ability: +BONUS</li>);
        //    });
        //    bonuses = raceSelected.ability_bonuses.map((bonus) => {
        //        return bonus
        //    });
        //    abilityScores = abilityScoresInfo.map((ability) => {
        //        let abilityScore = "abilityScore ";
        //        if (isSelected(classSelected)) {
        //            for (var a = 0; a < classSelected.saving_throws.length; a++) {
        //                if (ability.index === classSelected.saving_throws[a].index) {
        //                    abilityScore = "abilityScore savingThrow "
        //                }
        //            }
        //        }
        //        for (var i = 0; i < bonuses.length; i++) {
        //            if (bonuses[i].ability_score.name.toLowerCase() === ability.index) {
        //                abilityScore += "bonus "
        //                let bonus = this.props.abilityScoresSelected[ability.index] + bonuses[i].bonus;
        //                return (<div className='col-2 text-center ability' key={ability.index}>
        //                    <p>{ability.full_name}</p>
        //                    <p className={abilityScore}>{bonus}</p>
        //                </div>);
        //            }
        //        }
        //        return (<div className='col-2 text-center ability' key={ability.index}>
        //            <p>{ability.full_name}</p>
        //            <p className={abilityScore}>{this.props.abilityScoresSelected[ability.index]}</p>
        //        </div>);
        //    });
        //}

        //if (isSelected(classSelected)) { //setting up info for when a class has been selected
        //    className = classSelected.name
        //    hit_die = classSelected.hit_die
        //    saving_throws = classSelected.saving_throws.map((saving_throw, index) => {
        //        for (var j = 0; j < abilityScoresInfo.length; j++) {
        //            if (abilityScoresInfo[j].name === saving_throw.name) {
        //                return (<li className='col-6 align-self-center text-center' key={saving_throw.name.toLowerCase()}> {abilityScoresInfo[j].full_name}</li>);
        //            }
        //        }
        //        return (<li key={index}>Ability: +BONUS</li>);
        //    });
        //    characterProficiencies = proficiencies.map((proficiency) => {
        //        return (<li className='col-6 align-self-center text-center' key={proficiency.name}>{proficiency.name}</li>);
        //    });
        //    if (spellsChosen.length > 0) {
        //        classSpells = spellsChosen.map((spell) => {
        //            if (spell === selectedSpell) {
        //                return (<li key={spell.name}>{spell.name}</li>);
        //            } else {
        //                return (<li onClick={() => setSelectedSpell(spell)} key={spell.name}>{spell.name}</li>);
        //            }
        //        });
        //    }
        //}
        //console.log("racename ", raceName)
        //this.setState({
        //    raceName: raceName,
        //    className: className,
        //    hit_die: hit_die,
        //    ability_bonuses: ability_bonuses,
        //    abilityScores: abilityScores,
        //    saving_throws: saving_throws,
        //    characterProficiencies: characterProficiencies,
        //    classSpells: classSpells,
        //});
    }

    characterRaceInfo() {
        const { raceSelected, classSelected, abilityScoresInfo } = this.props;
        let bonuses, ability_bonuses = [];


        let abilityScores = abilityScoresInfo.map((ability) => {
            let abilityScore = "abilityScore";
            if (isSelected(classSelected)) {
                for (var a = 0; a < classSelected.saving_throws.length; a++) {
                    if (ability.index === classSelected.saving_throws[a].index) {
                        abilityScore += "abilityScore savingThrow "
                        console.log("saving throw set: ", classSelected.saving_throws[a].index);
                    }
                }
            }
            return (<div className='col-2 text-center ability' key={ability.index}>
                <p>{ability.full_name}</p>
                <p className={abilityScore}>{this.props.abilityScoresSelected[ability.index]}</p>
            </div>);
        }); 

        if (isSelected(raceSelected)) { //setting up info for when a race has been selected
           
            ability_bonuses = raceSelected.ability_bonuses.map((bonus, index) => {
                for (var i = 0; i < abilityScoresInfo.length; i++) {
                    if (abilityScoresInfo[i].name === bonus.ability_score.name) {
                        return (<li className='col-6 align-self-center text-center' key={index}>{abilityScoresInfo[i].full_name}: +{bonus.bonus}</li>);
                    }
                }
                return (<li key={index}>Ability: +BONUS</li>);
            });
            bonuses = raceSelected.ability_bonuses.map((bonus) => {
                return bonus
            });
            abilityScores = abilityScoresInfo.map((ability) => {
                let abilityScore = "abilityScore ";
                if (isSelected(classSelected)) {
                    for (var a = 0; a < classSelected.saving_throws.length; a++) {
                        if (ability.index === classSelected.saving_throws[a].index) {
                            abilityScore = "abilityScore savingThrow "
                        }
                    }
                }
                for (var i = 0; i < bonuses.length; i++) {
                    if (bonuses[i].ability_score.name.toLowerCase() === ability.index) {
                        abilityScore += "bonus "
                        let bonus = this.props.abilityScoresSelected[ability.index] + bonuses[i].bonus;
                        return (<div className='col-2 text-center ability' key={ability.index}>
                            <p>{ability.full_name}</p>
                            <p className={abilityScore}>{bonus}</p>
                        </div>);
                    }
                }
                return (<div className='col-2 text-center ability' key={ability.index}>
                    <p>{ability.full_name}</p>
                    <p className={abilityScore}>{this.props.abilityScoresSelected[ability.index]}</p>
                </div>);
            });
        }
        return ([ability_bonuses, abilityScores, bonuses])
    }

    characterClassInfo() {
        const { abilityScoresInfo, classSelected, spellsChosen, proficiencies, selectedSpell, setSelectedSpell } = this.props;
        let characterProficiencies = [];
        let classSpells = [];
        let hit_die = "";       
        let saving_throws = [];
       
        //let classFeatures = [];
        

        if (isSelected(classSelected)) { //setting up info for when a class has been selected
            
            hit_die = classSelected.hit_die
            saving_throws = classSelected.saving_throws.map((saving_throw, index) => {
                for (var j = 0; j < abilityScoresInfo.length; j++) {
                    if (abilityScoresInfo[j].name === saving_throw.name) {
                        return (<li className='col-6 align-self-center text-center' key={saving_throw.name.toLowerCase()}> {abilityScoresInfo[j].full_name}</li>);
                    }
                }
                return (<li key={index}>Ability: +BONUS</li>);
            });
            characterProficiencies = proficiencies.map((proficiency) => {
                return (<li className='col-6 align-self-center text-center' key={proficiency.name}>{proficiency.name}</li>);
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
        return ([characterProficiencies, classSpells, hit_die, saving_throws])
    }

    render() {
        
      //  const { raceName, className, abilityScores, ability_bonuses, classSpells, saving_throws, hit_die, characterProficiencies } = this.state;
        const { raceSelected, classSelected, navigation } = this.props;
        const [ability_bonuses, abilityScores] = this.characterRaceInfo();
        const [characterProficiencies, classSpells, hit_die, saving_throws] = this.characterClassInfo();
        switch (navigation) {
            case 'Spells':
                if (isSelected(this.props.classSelected)) {
                    let spellDescription;
                    let selectedSpellName;
                    let selectedSpellLevel;
                    const { selectedSpell } = this.props.selectedSpell;
                    if (isSelected(selectedSpell)) {                       
                        spellDescription = <p>{selectedSpell.desc}</p>
                        selectedSpellName = selectedSpell.name;
                        selectedSpellLevel = selectedSpell.level;
                    }
                    return (<div className='col-12 info'>
                        <div className='row'>
                            <div className='col-12 characterTitle'>
                                <h3>{raceSelected.name ? raceSelected.name : "-"}<span> </span>{classSelected.name ? classSelected.name : "-"}</h3>
                                <div className='row'>{abilityScores}</div>
                            </div>
                            <div className='col-3'>
                                <p>Spells</p>
                                <ul>{classSpells}</ul>
                            </div>
                            <div className='col-9'>
                                <h4>{selectedSpellName} {selectedSpellLevel}</h4>
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
                return (<div className="col-12 info">
                    <div className='row'>
                        <div className='col-12 characterTitle'>
                            <h3>{raceSelected.name ? raceSelected.name : "-"}<span> </span>{classSelected.name ? classSelected.name : "-"}</h3>
                            <div className='row'>{abilityScores}</div>
                        </div>
                        <div className='col-6 info-col-left'>
                            <h6>Ability bonuses</h6>
                            <ul>{ability_bonuses}</ul>
                        </div>
                        <div className='col-6 info-col-right'>
                            <h6>Hit die: {hit_die}</h6>
                            <h6>Saving throws</h6>
                            <ul>{saving_throws}</ul>
                            <h6>Proficiencies</h6>
                            <ul>
                                {characterProficiencies}
                            </ul>
                        </div>
                    </div>
                </div>);
        }

        
    }
}

    
export default Info


