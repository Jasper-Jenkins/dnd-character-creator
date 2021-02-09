import React, { Component } from 'react';

class spells extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false,            
        }
    }

    componentDidMount() {
        if (isSelected(this.props.classSelected)) {

        }
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