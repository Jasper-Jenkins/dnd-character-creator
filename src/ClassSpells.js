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
        console.log("ClassSpells mounted:", this.state);
        this.spellSlots();
        this.setClassSpells(1);
    }
    componentDidUpdate() {
        console.log("ClassSpells updated: ", this.state);
    }
    spellSlots = () => { // this function assumes the level of the character is already resolved and the data for that level has been retrieved: 'levelData'
        const { classSelected } = this.state;
        const { levelData } = this.state;    
        let slotsAvailable = [];
        if (classSelected.name === 'Ranger' || classSelected.name === 'Paladin') {
            for (var h = 0; h < levelData.length; h++) {
                if (levelData[h].class.name === classSelected.name) {
                    slotsAvailable[0] = 0;
                    for (var i = 1; i < 10; i++) {
                        if (levelData[h].spellcasting['spell_slots_level_' + i] !== 0) {
                            slotsAvailable[i] = levelData[h].spellcasting['spell_slots_level_' + i];
                        }
                    }
                }
            }
        } else {
            for (var j = 0; j < levelData.length; j++) {
                if (levelData[j].class.name === classSelected.name) {
                    slotsAvailable[0] = levelData[j].spellcasting.cantrips_known;
                    for (var k = 1; k < 10; k++) {
                        if (levelData[j].spellcasting['spell_slots_level_' + k] !== 0) {
                            slotsAvailable[k] = levelData[j].spellcasting['spell_slots_level_' + k];
                        }
                    }
                }
            }            
        } 
        console.log("slots available ", slotsAvailable);
        this.setState({
            spellSlots: slotsAvailable,
        }, this.state.updateSpellSlots(slotsAvailable));
    }

    updateSpells = (spell) => {
        const { spellsChosen } = this.state;
        let spells = [...spellsChosen, spell];
        this.setState({
            spellsChosen: spells,
        });
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
                console.log("Wizard Spell source. ")
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

    setClassSpells = (level) => { 
        const { classSelected } = this.state;
        const { spellsInfo } = this.state;   
        let spells = []
        console.log("setClassSpells() fired")
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
                console.log("state classSpells updated", spells);
                break;
            default: 
                alert("level of character is invalid in spells creation. ")
        }
    }
    
    addSpell = (spell) => {
        console.log("Add Spell: ", spell.name);
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

    displaySpells = () => {
        const { classSpells } = this.state;
        const { spellsChosen } = this.state;
        const { spellSlots } = this.state;
        let spellChoices = [];
       
        for (var a = 0; a < spellSlots.length; a++) {
      //      let spells = [];
            const slotLevel = a;
            let slotSpells = classSpells.filter((spell) => {
                return (spell.level === slotLevel ? spell : null);
            })

          

            spellChoices[slotLevel] = slotSpells.map((spell) => {
                let classNames = "btn-md btn-primary ";
                    if (spell.damage !== undefined) {
                        if (spell.damage.damage_type !== undefined) {
                            classNames += spell.damage.damage_type.index;
                        }
                    }
                    if (spellsChosen.length === 0) {
                        return (<button className={classNames} onClick={() => this.addSpell(spell)} key={spell.name + spell.level}>{spell.name}</button>);
                    }
                    for (var b = 0; b < spellsChosen.length; b++) {
                        let chosen = b;
                        if (spellsChosen[chosen].name === spell.name) {
                            console.log("displaying a selected spell");
                            return (<button className={classNames} onClick={() => this.removeSpell(spell)} key={spell.name + spell.level}>{spell.name}</button>);
                        }
                        console.log("displaying a non selected spell")
                        return (<button className={classNames} onClick={() => this.addSpell(spell)} key={spell.name + spell.level}>{spell.name}</button>);
                    }
                                    
                return (null);
            });
        }
        return (spellChoices);
    }  
    
    render() {
        return (<div className='col-12'>{this.displaySpells()}</div>);
    }
}

export default ClassSpells