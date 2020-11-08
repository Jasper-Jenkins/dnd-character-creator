import React, { Component } from 'react'
import AbilityScoresForm from './AbilityScoresForm'
import ClassProficiencies from './ClassProficiencies'
import ClassSpells from './ClassSpells'
import Races from './champion/Races'
import Classes from './champion/Classes'
import isSelected from './helper/helper-functions'


class Selection extends Component {
    constructor(props) {
        super(props)
        this.state = {
            abilityScoresSwitch: false,
        }
        this.abilityScoreSwitchy = this.abilityScoreSwitchy.bind(this)
    }

    abilityScoreSwitchy() {
        this.setState(state => ({
            abilityScoresSwitch: !state.abilityScoresSwitch,
        }));
    }

    render() {
        const abilityScoresInfo = this.props.abilityScoresInfo;
        const classSelected = this.props.classSelected;
        const navigation = this.props.navigation;
        const getScore = this.props.getScore;
        const abilityScoresSwitch = this.state.abilityScoresSwitch
        switch (navigation) {
        case 'Races':
            return (<Races {...this.props} />);           
        case 'Classes':
            return (<Classes {...this.props} />); 
        case 'Proficiencies':
            if (isSelected(classSelected)) {
                return (<ClassProficiencies {...this.props} />);
            }
            return (<div className='col-12 text-center selection'>You must choose a class to select your proficiencies.</div>);            
        case 'Spells':
            if (isSelected(classSelected) && classSelected.spellcasting !== undefined) { // Needs better validation? 
                return (<ClassSpells {...this.props} />);
            }
            return (<div className='col-12 text-center selection'>{classSelected.name} is not a spell caster.</div>);            
        case 'Ability-Scores':
            let scores = abilityScoresInfo.map((abilityScore, index) => {
                return (<button onClick={() =>getScore(abilityScore.index)} className='col-4 selectionButtons' key={index}>{abilityScore.full_name}</button>)
            });
                return (<div className='col-12 text-center selection'>
                    <button onClick={() => this.abilityScoreSwitchy()} >Push me</button><br />
                    {abilityScoresSwitch ? <AbilityScoresForm handleSubmit={this.props.handleSubmit} abilityScoresSelected={this.props.abilityScoresSelected} /> : scores}                  
                </div>);
        default:
            return (<div className='col-12 text-center selection'>DEFAULT: It's a broke!</div>);
    }    
    }


}

export default Selection 