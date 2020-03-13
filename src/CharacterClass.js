import React, { Component } from 'react'
//import ClassProficiencies from './ClassProficiencies'
import ClassSpells from './ClassSpells'
import Selection from './Selection'
import ClassProficiencies from './ClassProficiencies';
//import Info from './Info'

class CharacterClass extends Component {     
    constructor(props) {
        console.log("CharacterClass: ", props)
        super(props);
        this.intialState = props;
        
    }

    state = {

    }   

    displayClassInfo = (index) => {
        const { classesInfo } = this.state
        for (let i = 0; i < classesInfo.length; i++) {
            if (classesInfo[i].index === index) {
                const selectedClass = classesInfo.filter(function (cClass) { return cClass.name === classesInfo[i].name })
                this.setState({ classSelected: selectedClass[0], isClassSelected: true }, this.setStartingProficiencies(selectedClass[0]))
                break;
            }
        }
    }

    setStartingProficiencies = (chosenClass) => {
        const proficiencies = JSON.parse(JSON.stringify(chosenClass.proficiencies))
        const proficienciesChoices = JSON.parse(JSON.stringify(chosenClass.proficiency_choices))
        this.setState({ classProficiencies: proficiencies, classProficienciesChoices: proficienciesChoices, });
    }

       
    render() {
        return (<div className='row'>
                </div>);
    }
}

export default CharacterClass