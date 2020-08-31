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



    spellSource = (spell, currentLevel) => {
        const { classSelected } = this.state;
        const { spellsChosen } = this.state;
       // const { spellSlots } = this.state;

        let spells = [];








        //for (var l = 0; l < spellSlots.length; l++) { // the 2 being compared against l needs to be a variable as it will change as the user levels up. What variable though?
        //    const num = l;
        ////    console.log("About to map spells");
        //    spells[num] = spellsChosen.map((spell) => {
        //        if (spell.level === num) {
        //        //    console.log("Mapped Spell");
        //            return spell;
        //        } else {
        //          //  console.log("Mapped empty");
        //            return {};
        //        }
        //    })
        //}


       

        //console.log("Spells to mess with", spells)

        switch(classSelected.name) {
           
                //console.log()

        
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
                break;
            case "Warlock":
                break;
            case "Wizard":
                switch (currentLevel) {
                    case 1:
                        if (spellsChosen.length < 6) {
                            spells = [...spellsChosen, spell];
                            this.setState({
                                spellsChosen: spells,
                            });
                            this.state.setSpells(spells); //parent spells update
                      //      console.log("added " + spell.name + " to your spell book");
                        } else {
                            this.state.updateAlertMessage("You are unable to learn " + spell.name + " at this time.")
                        }
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }

        //if (classSelected.name === "Wizard") { 
        //    switch (parseInt(currentLevel)) {
        //        case 1:
        //               if (spellsChosen.length < 6) {
        //                spells = [...spellsChosen, spell];
        //                this.setState({
        //                    spellsChosen: spells,
        //                });
        //                this.state.setSpells(spells);
        //                console.log("added " + spell.name + " to your spell book");
        //            } else {
        //                this.state.updateAlertMessage("You are unable to learn " + spell.name + " at this time.")
        //            }
        //            break;                                       
        //        default:
        //            break;
        //    }
        //} else {
        //    alert('You are not a wizard!')
        //}
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
     //   const { classSelected } = this.state;
        const { updateSelectedSpell } = this.state;
        const { spellSlots } = this.state;
        const { spellsChosen } = this.state;
        let check = [];
        for (var j = 0; j < spellSlots.length; j++) {
            check[j] = 0;
        }
        if (spellsChosen.length === 0) {
            this.spellSource(spell, 1);
        } else {
            for (var i = 0; i < spellSlots.length; i++) {
                for (var k = 0; k < spellsChosen.length; k++) {
                    if (spellsChosen[k].level === i) {
                        check[i]++;
                        console.log("adding " + spellsChosen[k].name + " to slot " + i)
                    }
                }    
            }
            for (var l = 0; l < spellSlots.length; l++) {
                if (check[l] < spellSlots[l]) {
                   this.spellSource(spell, 1);
                }
            }       
            
        }
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
        const { classSpells } = this.state
        const { spellsChosen } = this.state
      //  let currentLevel = 1;
        let spellLevelLimit = 0;
        let spellsToChooseFrom = [];

        for (var i = 0; i < classSpells.length; i++) {
            var num = parseInt(classSpells[i].level);
            if (spellLevelLimit < num) {
                spellLevelLimit = num;
            } 
        }
        
        for (var j = 0; j < spellLevelLimit + 1; j++) {
            let spellLevel = j;
            let spells = classSpells.map((spell) => {
                if (spell.level === spellLevel) {
                    for (var k = 0; k < spellsChosen.length; k++) {
                        if (spellsChosen[k].name === spell.name) {
                            return (<button className='btn-md btn-primary' onClick={() => this.removeSpell(spell)} key={spell.name + spell.level}>{spell.name}</button>);
                        }
                    }
                    return (<button className='btn-md btn-secondary' onClick={() => this.addSpell(spell)} key={spell.name + spell.level}>{spell.name}</button>);
                } else { return null }
            });

            //for (var l = 0; l < spells.length; l++) {
            //    var keyLength = spells[l].key.length
            //    var keyValue = spells[l].key[keyLength - 1]
            //}
           
            spellsToChooseFrom.push(spells)
        }

        return (<div className="row">
                    <div className="col-12">
                        {spellsToChooseFrom}
                    </div>
                </div>);
    }
           
    render() {
        return (this.displaySpells());
    }
}

export default ClassSpells