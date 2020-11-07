import React, { Component } from 'react';

class ClassSpells extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classSpells: [], 
            spellSlots: [], 
            spellsChosen: [],    
        };
    }

    componentDidMount() {
     //   console.log("ClassSpells mounted:", this.props);        
        this.spellSlots();
        this.setClassSpells(1); // character level: 1
    }
    componentDidUpdate() {
   //     console.log("ClassSpells updated: ", this.props);
    }
    spellSlots = () => { // this function assumes the level of the character is already resolved and the data for that level has been retrieved: 'levelData'
        const { classSelected } = this.props;
        const { levelData } = this.props;    
        let slotsAvailable = [];
        if (classSelected.name === 'Ranger' || classSelected.name === 'Paladin') {
            for (var h = 0; h < levelData.length; h++) {
                if (levelData[h].class.name === classSelected.name) {
                    slotsAvailable[0] = 0;
                    for (var i = 1; i < 6; i++) {
                        if (levelData[h].spellcasting['spell_slots_level_' + i] !== 0) {
                            slotsAvailable[i] = levelData[h].spellcasting['spell_slots_level_' + i];
                            console.log("SLOTS avail", slotsAvailable[i])
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
      //  console.log("slots available ", slotsAvailable);
        this.setState({
            spellSlots: slotsAvailable,
        }, this.props.updateSpellSlots(slotsAvailable));
    }

    updateSpells = (spell) => {
        const { spellsChosen } = this.props;
        let spells = [...spellsChosen, spell];
        this.setState({
            spellsChosen: spells,
        });
        this.props.setSpells(spells); //parent spells update so Info can display chosen spells
    }

    spellsChosenByLevel = () => {
        const { spellsChosen } = this.props;
        let cantrips = 0;
        let levelOneSpells = 0;
        let spells = [];
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
        const { classSelected } = this.props;
        const { spellsChosen } = this.props;
        const { spellSlots } = this.state;
        let cantrips = 0;
        let levelOneSpells = 0;
        let level0, level1;
        let message = "You cannot add " + spell.name + " to your spell book.";
        
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
                    break;
                }
               
                this.props.updateAlertMessage(message);
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
                
                this.props.updateAlertMessage(message);
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
               
                this.props.updateAlertMessage(message);
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
               
                this.props.updateAlertMessage(message);
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
               
                this.props.updateAlertMessage(message);
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
                    break;
                } 
              
                this.props.updateAlertMessage(message);
                break;
            default:
                break;
        }              
    }

    setClassSpells = (level) => { 
        const { classSelected } = this.props;
        const { spellsInfo } = this.props;   
        let spells = []
       // console.log("setClassSpells() fired")
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
      //  console.log("Add Spell: ", spell.name);
        const { setSelectedSpell } = this.props;
        this.spellSource(spell, 1);
        setSelectedSpell(spell)
    }

    removeSpell = (spell) => {
        const { spellsChosen } = this.props
        const { setSelectedSpell } = this.props

        let spells = []

        for (var i = 0; i < spellsChosen.length; i++) {
            if (spellsChosen[i].name !== spell.name) {
                spells.push(spellsChosen[i])
            }
        }
      //  console.log("Spells that wont be removed, ", spells)
        this.setState({
            spellsChosen: spells,
        });
        this.props.setSpells(spells)
        setSelectedSpell({})
    }

    displaySpells = () => {
        const { classSelected } = this.props;
        const { classSpells } = this.state;
        const { spellSlots } = this.state;

        const { spellsChosen } = this.props;
        let spellChoices = [];
       
        for (var a = 0; a < spellSlots.length; a++) {         
            const slotLevel = a;
            let slotSpells = classSpells.filter((spell) => {
                return (spell.level === slotLevel ? spell : null);
            });
            //console.log("Slots Spells", slotSpells);

            spellChoices[slotLevel] = slotSpells.map((spell) => {
                let classNames = "btn btn-sm btn-block spell-btn ";
              //  console.log("Spell ", spell);
                    if (spell.damage !== undefined) { // Is there a better check for this?
                        if (spell.damage.damage_type !== undefined) {
                            classNames += spell.damage.damage_type.index + " ";
                        }
                    }
                if (spellsChosen.length === 0) {
                    classNames += "btn-secondary ";
                        return (<button className={classNames} onClick={() => this.addSpell(spell)} key={spell.name + spell.level}>{spell.name}</button>);
                }
                for (var b = 0; b < spellsChosen.length; b++) {
                    let chosen = b;
                    if (spellsChosen[chosen].name === spell.name) {  
                        classNames += "btn-primary ";
                        return (<button className={classNames} onClick={() => this.removeSpell(spell)} key={spell.name + spell.level}>{spell.name}</button>);
                    } 
                }
                classNames += 'btn-secondary ';
                return (<button className={classNames} onClick={() => this.addSpell(spell)} key={spell.name + spell.level}>{spell.name}</button>);
            });
        }
        let spellChoiceDisplay = [];
        for (var b = 0; b < spellChoices.length; b++) {
            if (b === 0) {
                if (classSelected.name === "Paladin" || classSelected.name === "Ranger") {
                    spellChoiceDisplay[b] = <div className='col-12' key='cantrips'><h6>You have no spells to choose from at level 1</h6></div>
                } else {
                    spellChoiceDisplay[b] = <div className='col-6' key='cantrips'><h6>Cantrips</h6>{spellChoices[b]}</div>
                }                
            } else {
                let keyForThee = "spellLevel";
                spellChoiceDisplay[b] = <div className='col-6' key={keyForThee + b}><h6>Spell Level {b}</h6>{spellChoices[b]}</div> 
            }            
        }
        return (spellChoiceDisplay);
    }  
    
    render() {
        return (<div className='col-12 text-center selection'>{this.displaySpells()}</div>);
    }
}

export default ClassSpells;