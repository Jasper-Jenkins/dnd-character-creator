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
            console.log("level Data for: ", levelData[j].class.name)
            if (levelData[j].class.name === classSelected.name) {
                const propsKeys = Object.getOwnPropertyNames(levelData[j]);
                for (var p = 0; p < propsKeys.length; p++) {
                    if (propsKeys[p] === 'spellcasting') {  
                        let slotsAvailable = [];
                        slotsAvailable[0] = levelData[j].spellcasting.cantrips_known;
                        for (var k = 1; k < 10; k++) {
                            if (levelData[j].spellcasting['spell_slots_level_' + k] !== 0) {
                                slotsAvailable[k] = levelData[j].spellcasting['spell_slots_level_' + k];
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
        let cantrips = 0;
        let levelOneSpells = 0;
        switch(classSelected.name) {
            case "Barbarian":
                break;
            case "Bard":
                break;
            case "Cleric":
                break;
            case "Druid":
                break;
            case "Fighter":
                break;
            case "Monk":
                break;
            case "Paladin":
                break;
            case "Ranger":
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
                if (cantrips < 4 && spell.level === 0) {
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

    classSpells = (level) => { 
        const { classSelected } = this.state;
        const { spellsInfo } = this.state;   
     //   const { spellSlots } = this.state;
        let spells = []
        switch (level) {
            case 1:
                for (var i = 0; i < spellsInfo.length; i++) {
                    for (var j = 0; j < spellsInfo[i].classes.length; j++) {
                        if (classSelected.name === spellsInfo[i].classes[j].name && (spellsInfo[i].level === 0 || spellsInfo[i].level === 1)) {
                            spells.push(spellsInfo[i])
                        }
                    }
                }
                this.setState({
                    classSpells: spells,
                });
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

    displaySpells() {
        const { classSpells } = this.state;
        const { spellsChosen } = this.state;
        const { spellSlots } = this.state;
        let spellsToChooseFrom = [];
        for (var j = 0; j < spellSlots.length; j++) {
            const spellLevel = j;
            let title = "Level " + j + " spells ";
            let spells = classSpells.map((spell) => {
                if (spell.level === spellLevel) {
                    for (var k = 0; k < spellsChosen.length; k++) {
                        if (spellsChosen[k].name === spell.name) {
                            return (<button className='btn-md btn-primary' onClick={() => this.removeSpell(spell)} key={spell.name + spell.level}>{spell.name}</button>);
                        }
                    }
                    return (<button className='btn-md btn-secondary' onClick={() => this.addSpell(spell)} key={spell.name + spell.level}>{spell.name}</button>);
                } else { return null; } // Returning null works, but seems hacky. Find a better solution. 
            });
            if (spellLevel === 0) {
                title = "Cantrips";
            }
            spellsToChooseFrom.push(
                <div className='row' key={spellLevel}>
                    <div className='col-12'>
                        <h6>{title}</h6>
                        {spells}
                    </div>
                </div>)
        }

        return (spellsToChooseFrom);
    }
           
    render() {
        return (<div className='col-12'>{this.displaySpells()}</div>);
    }
}

export default ClassSpells