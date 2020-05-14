import React, {Component} from 'react'

class ClassSpells extends Component {
    constructor(props) {
        super(props);
        console.log("ClassSpells", props);
        this.state = {
            classSelected: props.classSelected,
            spells: props.spells,
            spellsInfo: props.spellsInfo,
            setSpells: props.setSpells,
            spellsChosen: props.spellsChosen,
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
        let spells = classSpells.map((spell) => {
            return (<button className='btn-md btn-primary' onClick={() => this.addSpell(spell)} key={spell.name}>{spell.name}</button>);
        });
        return (spells);
    }

    addSpell = (spell) => {
        let spells = this.state.spellsChosen
        spells.push(spell)
        this.state.setSpells(spells)
    }

            //onClick={() => this.addSpell()}

    render() {
        return (<div className='row'>
            <div className='col-12'>
                <div className='row'>
                    <div className='col-12'>spells that you will keep</div>
                </div>
                <div className='row'>
                    <div className='col-12'>{this.displaySpells()}</div>
                </div>
            </div>
        </div>);
    }
}

export default ClassSpells