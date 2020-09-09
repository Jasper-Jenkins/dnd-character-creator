import React, {Component} from 'react'

class ClassSpells extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classSelected: props.classSelected,
            classes: props.classes,
            spells: props.spells,
            spellsInfo: props.spellsInfo,
            setSpells: props.setSpells,
            spellsChosen: props.spellsChosen,
            updateSelectedSpell: props.updateSelectedSpell,
            levelData: props.levelData, // this should be resolved for the characters level before its initialized here. 
            classSpells: [],
            cantrips: [],
            spellSlots: [],
            spellsByDamage: [],
            updateAlertMessage: props.updateAlertMessage,
            updateSpellSlots: props.updateSpellSlots,
        };        
    }

    componentDidMount() {
        console.log("ClassSpells", this.state);
        this.spellSlots();
        this.classSpells(1);
    }

    spellSlots = () => { // this function assumes the level of the character is already resolved and the data for that level has been retrieved: 'levelData'
        const { classSelected } = this.state;
        const { levelData } = this.state;    
        for (var j = 0; j < levelData.length; j++) {
            if (levelData[j].class.name === classSelected.name) {
                const propsKeys = Object.getOwnPropertyNames(levelData[j]);
                for (var p = 0; p < propsKeys.length; p++) {
                    if (propsKeys[p] === 'spellcasting') {  // this is breaking because not all of the classes have a 'cantrips_known' data point inside 'spellcasting'
                        let slotsAvailable = [];                        
                        if (classSelected.name === 'Ranger' || 'Paladin') {
                            slotsAvailable[0] = 0;
                            for (var k = 1; k < 6; k++) {
                                if (levelData[j].spellcasting['spell_slots_level_' + k] !== 0) {
                                    slotsAvailable[k] = levelData[j].spellcasting['spell_slots_level_' + k];
                                }
                            }
                        } else {
                            slotsAvailable[0] = levelData[j].spellcasting.cantrips_known;
                            for (var l = 1; l < 10; l++) {
                                if (levelData[j].spellcasting['spell_slots_level_' + l] !== 0) {
                                    slotsAvailable[l] = levelData[j].spellcasting['spell_slots_level_' + l];
                                }
                            }
                        }                        
                        console.log("Available Slots", slotsAvailable);
                        this.setState({
                            spellSlots: slotsAvailable,
                        }, this.state.updateSpellSlots(slotsAvailable));
                        break;
                    }      
                }                
                break;
            } 
        }
    }

    updateSpells = (spell) => {
        const { spellsChosen } = this.state;
        let spells = [...spellsChosen, spell];
        this.setState({
            spellsChosen: spells,
        }, this.spellDamageByColor());
        this.state.setSpells(spells); //parent spells update
    }

    spellsChosenByLevel = () => {
        const { spellsChosen } = this.state;
        let cantrips = 0;
        let levelOneSpells = 0;
        let spells = []
        for (var i = 0; i < spellsChosen.length; i++) {
            if (spellsChosen[i].level === 0) {
                cantrips++;
            } else if (spellsChosen[i].level === 1) {
                levelOneSpells++;
            }
        }
        spells.push(cantrips);
        spells.push(levelOneSpells);
        return spells;
    }

    spellSource = (spell, currentLevel) => {
        const { classSelected } = this.state;
        const { spellsChosen } = this.state;
        const { spellSlots } = this.state;
        let cantrips = 0;
        let levelOneSpells = 0;
        let level0, level1;
        switch(classSelected.name) {
            case "Barbarian":
                break;
            case "Bard":
                if (spellsChosen.length === 0) {
                    this.updateSpells(spell);
                    break;
                }
                [level0, level1] = spellSlots; 
                [cantrips, levelOneSpells] = this.spellsChosenByLevel();
                if (cantrips < level0 && spell.level === 0) {
                    this.updateSpells(spell);
                    break;
                }

                if (levelOneSpells < level1 && spell.level === 1) {
                    this.updateSpells(spell);
                }
                break;
            case "Cleric":
                if (spellsChosen.length === 0) {
                    this.updateSpells(spell);
                    break;
                }
                [level0, level1] = spellSlots;
                [cantrips, levelOneSpells] = this.spellsChosenByLevel();
                if (cantrips < level0 && spell.level === 0) {
                    this.updateSpells(spell);
                    break;
                }

                if (levelOneSpells < level1 && spell.level === 1) {
                    this.updateSpells(spell);
                }
                break;
            case "Druid":
                if (spellsChosen.length === 0) {
                    this.updateSpells(spell);
                    break;
                }
                [level0, level1] = spellSlots;
                [cantrips, levelOneSpells] = this.spellsChosenByLevel();
                if (cantrips < level0 && spell.level === 0) {
                    this.updateSpells(spell);
                    break;
                }
                if (levelOneSpells < level1 && spell.level === 1) {
                    this.updateSpells(spell);
                }
                break;
            case "Fighter":
                break;
            case "Monk":
                break;
            case "Paladin":
                if (spellsChosen.length === 0) {
                    this.updateSpells(spell);
                    break;
                }
                [level0, level1] = spellSlots;
                [cantrips, levelOneSpells] = this.spellsChosenByLevel();
                if (cantrips < level0 && spell.level === 0) {
                    this.updateSpells(spell);
                    break;
                }

                if (levelOneSpells < level1 && spell.level === 1) {
                    this.updateSpells(spell);
                }
                break;
            case "Ranger":
                if (spellsChosen.length === 0) {
                    this.updateSpells(spell);
                    break;
                }
                [level0, level1] = spellSlots;
                [cantrips, levelOneSpells] = this.spellsChosenByLevel();
                if (cantrips < level0 && spell.level === 0) {
                    this.updateSpells(spell);
                    break;
                }
                if (levelOneSpells < level1 && spell.level === 1) {
                    this.updateSpells(spell);
                }
                break;
            case "Rogue":
                break;
            case "Sorcerer":
                if (spellsChosen.length === 0) {
                    this.updateSpells(spell);
                    break;
                }               
                [cantrips, levelOneSpells] = this.spellsChosenByLevel();
                if (cantrips < 4 && spell.level === 0) {
                    this.updateSpells(spell);
                    break;
                }

                if (levelOneSpells < 2 && spell.level === 1) {
                    this.updateSpells(spell);
                }
                break;
            case "Warlock":
                if (spellsChosen.length === 0) {
                    this.updateSpells(spell);
                    break;
                }
                [cantrips, levelOneSpells] = this.spellsChosenByLevel();
                if (cantrips < 2 && spell.level === 0) {
                    this.updateSpells(spell);
                    break;
                }

                if (levelOneSpells < 2 && spell.level === 1) {
                    this.updateSpells(spell);
                }
                break;
            case "Wizard":
                if (spellsChosen.length === 0) {
                    this.updateSpells(spell);
                    break;
                } 
                [cantrips, levelOneSpells] = this.spellsChosenByLevel();
                if (cantrips < 3 && spell.level === 0) {
                    this.updateSpells(spell);
                    break;
                } 
                if (levelOneSpells < 6 && spell.level === 1) {
                    this.updateSpells(spell);
                } 
                break;
            default:
                break;
        }              
    }

    spellDamageByColor = () => { // this depends on other functions to have set a spell. 
        const { classSpells } = this.state;
        const { spellSlots } = this.state;
        let spellsByDamageColored = [];
        for (var j = 0; j < spellSlots.length; j++) {
            const spellLevel = j;
            let spells = [];
            let count = false;
            let damageType = "";
            for (var i = 0; i < classSpells.length; i++) {
                if (classSpells[i].level === j) {
                    count = true;;
                    break;
                }
            }
            if (count) {             
                for (var k = 0; k < classSpells.length; k++) {
                    if (classSpells[k].level === spellLevel) {
                        damageType = this.spellDamageType(classSpells[k]);
                        spells.push({ [classSpells[k].name]: damageType, });
                    } 
                }
                spellsByDamageColored.push(spells);                           
            } 
        }
        this.setState({
            spellsByDamage: spellsByDamageColored,
        });
        console.log("Color spells", spellsByDamageColored);
    }

    classSpells = (level) => { 
        const { classSelected } = this.state;
        const { spellsInfo } = this.state;   
        let spells = []

        switch (level) {
            case 1:
                for (var i = 0; i < spellsInfo.length; i++) {
                    for (var j = 0; j < spellsInfo[i].classes.length; j++) {
                        if (classSelected.name === spellsInfo[i].classes[j].name && (spellsInfo[i].level <= level)) {
                            spells.push(spellsInfo[i])
                        }
                    }
                }
                this.setState({
                    classSpells: spells,
                });
                console.log("Made it here");
                break;
            default: 
                alert("level of character is invalid in spells creation. ")
        }
    }
    
    addSpell = (spell) => {
        const { updateSelectedSpell } = this.state;
        this.spellSource(spell, 1);
        updateSelectedSpell(spell)
    }

    removeSpell = (spell) => {
        const { spellsChosen } = this.state
        const { updateSelectedSpell } = this.state

        let spells = []
        for (var i = 0; i < spellsChosen.length; i++) {
            if (spellsChosen[i].name !== spell.name) {
                spells.push(spellsChosen[i])
            }
        }
        this.setState({
            spellsChosen: spells,
        });
        this.state.setSpells(spells)
        updateSelectedSpell({})
    }

    spellDamageType = (spell) => {
        let descriptionWords = [];
        let damageType = "noDamage";
        for (var i = 0; i < spell.desc.length; i++) {
            descriptionWords = spell.desc[i].split(" ");
            let check = false;
            for (var j = 0; j < descriptionWords.length; j++) {
                switch (descriptionWords[j]) {
                    case 'fire':
                        damageType = descriptionWords[j];
                        check = true;
                        break;
                    case 'necrotic':
                        damageType = descriptionWords[j];
                        check = true;
                        break;
                    case 'lightning':
                        damageType = descriptionWords[j];
                        check = true;
                        break;
                    case 'cold':
                        damageType = descriptionWords[j];
                        check = true;
                        break;
                    case 'holy':
                        damageType = descriptionWords[j];
                        check = true;
                        break;
                    case 'poison':
                        damageType = descriptionWords[j];
                        check = true;
                        break;
                    case 'acid':
                        damageType = descriptionWords[j];
                        check = true;
                        break;
                    case 'thunder':
                        damageType = descriptionWords[j];
                        check = true;
                        break;
                    default:
                        damageType = 'noDamage';
                        break;
                }
                if (check) {
                    break;
                }
            }
            if (check) {
                break;
            }
        }
        return damageType;
    }

    displaySpells() {
        const { classSpells } = this.state;
        const { spellsChosen } = this.state;
        const { spellSlots } = this.state;
        let spellsToChooseFrom = [];
        console.log("Class Spells", classSpells);
        for (var j = 0; j < spellSlots.length; j++) {
            const spellLevel = j;
            let title = "";
            let spells = [];
            let count = false;
            let damageType = "";
            title = "Level " + j + " spells ";
            if (spellLevel === 0) {
                title = "Cantrips";
            }
            for (var i = 0; i < classSpells.length; i++) {
                if (classSpells[i].level === j) {
                    count = true;;
                    break;
                }
            }
            if (count) {
                //spells = classSpells.map((spell) => {
                //    if (spell.level === spellLevel) {
                //        damageType = this.spellDamageType(spell);
                //        if (spell.damage !== undefined) {
                //            console.log("SPELL", spell.damage);
                //        }
                //        let classNames = "btn-md btn-primary " + damageType;
                //        for (var k = 0; k < spellsChosen.length; k++) {
                //            if (spellsChosen[k].name === spell.name) {
                                
                //                return (<button className={classNames} onClick={() => this.removeSpell(spell)} key={spell.name + spell.level}>{spell.name}</button>);
                //            }
                //        }
                //        return (<button className={classNames} onClick={() => this.addSpell(spell)} key={spell.name + spell.level}>{spell.name}</button>);
                //    } else {
                //        return null; // Returning null works, but seems hacky. Find a better solution.!?
                //    }  
                //});
                for (var k = 0; k < classSpells; k++) {
                    if (classSpells[k].level === spellLevel) {
                        console.log("Mad it")
                        let classNames = "btn-md btn-primary "
                        if (classSpells[k].damage !== undefined) {
                            classNames += classSpells[k].damage.damage_type.index;                            
                        } 
                        for (var l = 0; l < spellsChosen.length; l++) {
                            if (spellsChosen[l].name === classSpells[k].name) {
                                spells.push(<button className={classNames} onClick={() => this.removeSpell(classSpells[k])} key={classSpells[k].name + classSpells[k].level}>{classSpells[k].name}</button>);
                            } else {
                                spells.push(<button className={classNames} onClick={() => this.addSpell(classSpells[k])} key={classSpells[k].name + classSpells[k].level}>{classSpells[k].name}</button>);
                            }
                        }
                    }                    
                }
                



               console.log("Spells", spells)
                    spellsToChooseFrom.push(
                        <div className='row' key={spellLevel}>
                            <div className='col-12'>
                                <h6>{title}</h6>
                                {spells}
                            </div>
                        </div>);
                
            //    console.log("Spells have been found for level ", j)
            } else {// this needs tending to. I want nothing to display if there are no spells for the heroes level.
                spellsToChooseFrom.push(
                    <div className='row' key={spellLevel}>
                    </div>);
           //     console.log("No spells found for level ", j);
            }
        }
        return (spellsToChooseFrom);
    }      
    render() {
        return (<div className='col-12'>{this.displaySpells()}</div>);
    }
}

export default ClassSpells