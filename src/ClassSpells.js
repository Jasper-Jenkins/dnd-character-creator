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
            levelData: props.levelData,
            classSpells: [],
            cantrips: [],
            updateAlertMessage: props.updateAlertMessage,
        };
        this.classSpells(this.state.classSelected, 1);
    }

    componentDidMount() {
        console.log("ClassSpells", this.state);
    }

    spellsKnown(characterClass, currentLevel) {        
        const { levelData } = this.state;

        for (var j = 0; j < levelData.length; j++) {
            if (levelData[j].class.name === characterClass) {
                switch (currentLevel) {
                    case 1:

                        break;
                    default:
                        break;

                }
            } else {
                console.log("No");
            }
        }
    }



    spellBook(spell, classLevel) {
        const { classSelected } = this.state
        const { spellsChosen } = this.state
        const { levelData } = this.state
        let spells = []

      

        for (var l = 0; l < 2; l++) { // the 2 being compared against l needs to be a variable as it will change as the user levels up. What variable though?
            const num = l;
            console.log("About to map spells");
            spells[num] = spellsChosen.map((spell) => { if (spell.level === num) { console.log("Mapped Spell"); return spell } else { console.log("Mapped empty");return {} } })
        }

        console.log("Spells to mess with", spells)

        switch (classSelected.name) {
           
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
                this.spellsKnown(classSelected.name, 1);
                break;
            default:
                return null;
        }

        if (classSelected.name === "Wizard") { 
            switch (parseInt(classLevel)) {
                case 1:
                    if (spell.level === 0) { // INCOMPLETE trying to separate spells by level
                        for (var i = 0; i < spellsChosen.length; i++) {

                        }
                    }
                    if (spellsChosen.length < 6) {
                        spells = [...spellsChosen, spell];
                        this.setState({
                            spellsChosen: spells,
                        });
                        this.state.setSpells(spells);
                        console.log("added " + spell.name + " to your spell book");
                    } else {
                        this.state.updateAlertMessage("You are unable to learn " + spell.name + " at this time.")
                    }
                    break;                                       
                default:
                    break;
            }
        } else {
            alert('You are not a wizard!')
        }
    }

    classSpells(classSelected, level) { // needs to be fixed, improper 'classSpells' state update
        const { classSpells } = this.state
        const { spellsInfo } = this.state
        switch (level) {
            case 1:
                for (var i = 0; i < spellsInfo.length; i++) {
                    for (var j = 0; j < spellsInfo[i].classes.length; j++) {
                        if (classSelected.name === spellsInfo[i].classes[j].name && (spellsInfo[i].level === 0 || spellsInfo[i].level === 1)) {
                            classSpells.push(spellsInfo[i])
                        }
                    }
                }
                break;
            default: 
                alert("level of character is invalid in spells creation. ")
        }
    }
    
    addSpell = (spell, classLevel) => {
        const { classSelected } = this.state
        const { updateSelectedSpell } = this.state
        switch (classSelected.name) {
            case "Wizard":
                this.spellBook(spell, classLevel)
                break;
            case "Sorcerer":
                this.spellBook(spell, classLevel) // just messing around trying to add spells to a spellbook, while not being a wizard. 
                break;
            default:
                console.log("setting spells that are not for a wizard")
                break;
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
        let classLevel = 1;
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
                    return (<button className='btn-md btn-secondary' onClick={() => this.addSpell(spell, classLevel)} key={spell.name + spell.level}>{spell.name}</button>);
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