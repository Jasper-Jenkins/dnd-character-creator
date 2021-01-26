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
        const { abilityScoresInfo } = this.props;
        const { classSelected } = this.props;
        const { navigation } = this.props;
        const { getScore } = this.props;
        const { abilityScoresSwitch } = this.state;
        switch (navigation) {
            case 'Races':
                return (<Races {...this.props} />);           
            case 'Classes':
                return (<Classes {...this.props} />); 
            case 'Proficiencies':
                return (<ClassProficiencies {...this.props} />);      
            case 'Spells':
                if (isSelected(classSelected) && classSelected.spellcasting !== undefined) { // Needs better validation? 
                    return (<ClassSpells {...this.props} />);
                }
                return (<div className='col-12 text-center selection'>{classSelected.name} is not a spell caster.</div>);            
            case 'Ability-Scores':
                let scores = abilityScoresInfo.map((abilityScore, index) => {
                    return (<button onClick={() => getScore(abilityScore.index)} className='col-4 selectionButtons' key={index}>{abilityScore.full_name}</button>)
                });
                return (<div className='col-12 text-center selection'>                   
                                {abilityScoresSwitch ? <AbilityScoresForm handleSubmit={this.props.handleSubmit} abilityScoresSelected={this.props.abilityScoresSelected} /> : scores}                           
                                <button onClick={() => this.abilityScoreSwitchy()} className='btn btn-primary col-6 align-text-bottom'>{abilityScoresSwitch ? "Auto fill " : "Manual fill "}</button><br />
                            
                </div>);
            default:
                return (<div className='col-12 text-center selection'>DEFAULT: It's a broke!</div>);
        }    
    }


}

export default Selection 