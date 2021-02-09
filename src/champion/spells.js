import React, { Component } from 'react';

class spells extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false,
            spells: {},
            spellsInfo: [],
            spellSlots: [],
        }
    }

    componentDidMount() {
        if (isSelected(this.props.classSelected)) {
            this.spellSlots();
        }
    }

    getSpells() {
        const { classSelected } = this.props;
        const url = 'https://www.dnd5eapi.co'
        fetch(url + classSelected.spells)
            .then(result => result.json())
            .then(result => { this.setState({ spells: result, }, this.getInfo(result)) })
            .catch(e => { console.log(e + " -- getSpells() -- " + url); });
    }


    getInfo(data) {
        const { classSelected } = this.props;
        console.log(classSelected.name, ' spells ', data);
        // let info = []
        const url = 'https://www.dnd5eapi.co'
        for (var i = 0; i < data.results.length; i++) {
            fetch(url + data.results[i].url)
                .then(result => result.json())
                .then(result => { this.setState((state) => ({ spellsInfo: [...state.spellsInfo, result] })) });
        }
    }



    spellSlots() { // this function assumes the level of the character is already resolved and the data for that level has been retrieved: 'levelData'
        const { classSelected } = this.props;
        const { levelData } = this.props;
        let slotsAvailable = [];
        console.log("spellSlots(), levelData: ", levelData)
        if (levelData.spellcasting !== undefined) {
            if (classSelected.name === 'Ranger' || classSelected.name === 'Paladin') {
                for (var i = 1; i < 6; i++) {
                    if (levelData.spellcasting['spell_slots_level_' + i] !== 0) {
                        slotsAvailable[i] = levelData.spellcasting['spell_slots_level_' + i];
                        console.log(classSelected.name, " spell slots available: ", slotsAvailable[i])
                    }
                }
            } else {
                slotsAvailable[0] = levelData.spellcasting.cantrips_known;
                for (var k = 1; k < 10; k++) {
                    if (levelData.spellcasting['spell_slots_level_' + k] !== 0) {
                        slotsAvailable[k] = levelData.spellcasting['spell_slots_level_' + k];
                    }
                }
            }
        }
        console.log("Slots available ", slotsAvailable);
        this.setState({
            spellSlots: slotsAvailable,
        }, this.props.updateSpellSlots(slotsAvailable));
    }

   


    render() {
        const { navigationCategory, selected } = this.state;
        const spells = this.displaySpells();
        const navigation = this.spellsNavigation();
        return (selected ?
            <div className='col-12 text-center selection'>
                {navigation}
                {spells[navigationCategory]}
            </div> :
            <div className='col-12 text-center selection'>
                <h3>Choose a class to select your spells.</h3>
            </div>);
    }
}

export default spells;