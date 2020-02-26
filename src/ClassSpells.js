import React, {Component} from 'react'

class ClassSpells extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spellsInfo: props.spellsInfo,
            classSelected: props.classSelected,
        };
    }
    state = {
        spellsInfo: {},
        classSelected: {},
        classSpells: [],
        chosenSpells: []
    }

    render() {
        return (<div className='row'>
            <div className='col-12'>
                <div className='row'>
                    <div className='col-12'>spells that you will keep</div>
                </div>
                <div className='row'>
                    <div className='col-12'>spells that you will choose from</div>
                </div>
            </div>
        </div>);
    }
}

export default ClassSpells