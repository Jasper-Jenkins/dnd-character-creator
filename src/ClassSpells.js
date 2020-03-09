import React, {Component} from 'react'

class ClassSpells extends Component {
    constructor(props) {
        super(props);
//        console.log("ClassSpells", props)
        this.state = {
            spellsInfo: props.spellsInfo,
            classSelected: props.classSelected,
            classSpells: [],
            chosenSpells: []
        };
        this.classSpells(this.state.classSelected)
    }
    state = {
        spellsInfo: {},
        classSelected: {},
        classSpells: [],
        chosenSpells: []
    }

    classSpells(classSelected) {
        const { spellsInfo } = this.state
        const { classSpells } = this.state
        for (var i = 0; i < spellsInfo.length; i++) {
            for (var j = 0; j < spellsInfo[i].classes.length; j++) {
                if (classSelected.name === spellsInfo[i].classes[j].name && spellsInfo[i].level === 1) {
                   classSpells.push(spellsInfo[i])
                }
            }
        }
    }

    displaySpells() {
        const { classSpells } = this.state
        let spells = classSpells.map((spell) => {
            return (<button className='btn-md btn-primary' key={spell.name}>{spell.name}</button>);
        });
        return (spells);
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