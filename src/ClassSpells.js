import React, {Component} from 'react'

class ClassSpells extends Component {
    constructor(props) {
        super(props);
        console.log("ClassSpells", props);
        this.state = {
            classSelected: props.classSelected,
            classes: props.classes,
            spells: props.spells,
            spellsInfo: props.spellsInfo,
            setSpells: props.setSpells,
            spellsChosen: props.spellsChosen,
            levelOne: props.levelOne,
            classSpells: [],
        };
        this.classSpells(this.state.classSelected, 1);
    }

    componentWillUnmount() {

    }

    classSpells(classSelected, level) {
        const { classSpells } = this.state
        const { spellsInfo } = this.state
        switch (level) {
            case 1:
                for (var i = 0; i < spellsInfo.length; i++) {
                    for (var j = 0; j < spellsInfo[i].classes.length; j++) {
                        if (classSelected.name === spellsInfo[i].classes[j].name && spellsInfo[i].level === 1) {
                            classSpells.push(spellsInfo[i])
                        }
                    }
                }
                break;
            default: 
                alert("level of character is invalid in spells creation. ")

        }
     }

    displaySpells() {
        const { classSpells } = this.state
        const { spellsChosen} = this.state
        let spells = classSpells.map((spell) => {
            for (var i = 0; i < spellsChosen.length; i++) {
                if (spellsChosen[i].name === spell.name) {
                    return (<button className='btn-md btn-secondary' onClick={() => this.removeSpell(spell)} key={spell.name}>{spell.name}</button>);
                }
            }
            return (<button className='btn-md btn-primary' onClick={() => this.addSpell(spell)} key={spell.name}>{spell.name}</button>);
        });
        return (spells);
    }

    addSpell = (spell) => {
        const { classSelected } = this.state
        const { spellsChosen } = this.state
        const { levelOne } = this.state
        let spells = []
        let spellsKnown = 0

        console.log("Level One", levelOne)
        console.log("SpellsChosen", spellsChosen)

        for (var i = 0; i < levelOne.length; i++) {
            if (levelOne[i].class.name === classSelected.name) {
                if (levelOne[i].spellcasting.spells_known === undefined) {                    
                    spellsKnown = parseInt(levelOne[i].spellcasting.spell_slots_level_1)
                    if (spellsChosen.length === spellsKnown) {
                        alert("NO more spells")
                    } else {
                        spells = [...spellsChosen, spell]
                        this.setState({
                            spellsChosen: spells,
                        });
                        this.state.setSpells(spells)
                        console.log("added spell to cast")
                    }
                    break;
                } else {
                    spellsKnown = parseInt(levelOne[i].spellcasting.spells_known)
                    if (spellsChosen.length === spellsKnown) {
                        alert("NO more spells")
                    } else {
                        spells = [...spellsChosen, spell]
                        this.setState({
                            spellsChosen: spells,
                        });
                        this.state.setSpells(spells)
                        console.log("added spell")
                    }
                    break;
                }
            }
            console.log("cycled spell add")
        }
    }

    removeSpell = (spell) => {
        const { spellsChosen } = this.state
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
    }

           
    render() {
        return (<div className='row'>
            <div className='col-12'>
                <div className='row'>
                    <div className='col-12'>{this.displaySpells()}</div>
                </div>
            </div>
        </div>);
    }
}

export default ClassSpells