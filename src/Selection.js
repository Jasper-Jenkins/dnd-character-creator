import React, { Component } from 'react'
//import AbilityScoresForm from './AbilityScoresForm'
import ClassProficiencies from './champion/Proficiencies'
import ClassSpells from './ClassSpells'
import Races from './champion/Races'
import Classes from './champion/Classes'
import AbilityScores from './champion/AbilityScores'
import isSelected from './helper/helper-functions'


class Selection extends Component {
    constructor(props) {
        super(props)
        this.state = {
      //      abilityScoresSwitch: false,
        }
     //   this.abilityScoreSwitchy = this.abilityScoreSwitchy.bind(this)
    }

    //abilityScoreSwitchy() {
    //    this.setState(state => ({
    //        abilityScoresSwitch: !state.abilityScoresSwitch,
    //    }));
    //}

    render() {       
        const { classSelected } = this.props;
        const { navigation } = this.props;      
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
                return (<AbilityScores {...this.props} />);               
            default:
                return (<div className='col-12 text-center selection'>DEFAULT: It's a broke!</div>);
        }    
    }


}

export default Selection 