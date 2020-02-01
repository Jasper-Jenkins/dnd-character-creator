import React, { Component } from 'react'
import Create from './Create'

class App extends Component {
    constructor(props) {
        super(props);
        const url = 'http://www.dnd5eapi.co/api/';
      
        fetch(url + 'classes')
            .then(result => result.json())
            .then(result => { this.setState({ classes: result, }, this.getInfo(result, 'classes')) });
    }

    state = {
        classes: {}, //assigned value from API call in constructor
        classesInfo: [], //assigned value from API call in getInfo()
        classSelected: {}, //assigned a value derived from classInfo in displayClassInfo()
        classProficiencies: [],   //assigned a value derived from classSelected in setStartingProficiencies()
        classProficienciesChoices: [],  //assigned a value derived from classSelected in setStartingProficiencies()
    } 

    getInfo(data, category) {
        let info = []
        const url = 'http://www.dnd5eapi.co'
        for (var i = 0; i < data.results.length; i++) {
            fetch(url + data.results[i].url)
                .then(result => result.json())
                .then(result => info.push(result))
        }
        switch(category) {
            case 'classes':
                this.setState({ classesInfo: info, })
                break;
            default:
        }
    }

    setStartingProficiencies(chosenClass) {

        const profs = chosenClass.proficiencies.map((prof) => {
            return prof;
        });
        const proChoice = chosenClass.proficiency_choices.map((choices) => {
            return choices;
        });

        this.setState({ classProficiencies: profs, classProficienciesChoices: proChoice, });        
    } 

    addProficiency = (proficiencyName) => { 
        const { classProficienciesChoices } = this.state
        // classProficienciesChoices: [
        //        { choose: 2, type: 'proficiencies', from: [{ name: 'someName', url: 'someUrl' }, { name: 'someName', url: 'someUrl' }] },
        //          ]
        // different classes have more objects in the parent array
               
        let newChoiceArray = classProficienciesChoices.map((choices) => {
            return choices
        })

        for (var i = 0; i < newChoiceArray.length; i++) { 
            for (var j = 0; j < newChoiceArray[i].from.length; j++) {
                if (newChoiceArray[i].from[j].name === proficiencyName) {

                    let newChoices = newChoiceArray[i].from.filter(function (proficiency) { return proficiency.name !== pIndex })
                    let newProficiency = newChoiceArray[i].from.filter(function (proficiency) { return proficiency.name === pIndex })

                    newChoiceArray[i].from = newChoices //I think this is the problem

                    this.setState(state => ({
                        classProficiencies: [...state.classProficiencies, newProficiency[0]],
                        proficienciesChoices: newChoiceArray,
                    }))
                }
            }
        }
    }
    
    displayClassInfo = index => {
        const { classesInfo } = this.state
        for (let i = 0; i < classesInfo.length; i++) {
            if (classesInfo[i].index === index) {
                const classSelected = classesInfo.filter(function (cClass) { return cClass.name === classesInfo[i].name })
                this.setState({ classSelected: classSelected[0], isClassSelected: true }, this.setStartingProficiencies(classSelected[0]),)
                break;
            }
        }
    }
          
    render() {

        const { classes, classesInfo, classSelected, isClassSelected, classProficiencies, classProficienciesChoices } = this.state

        return (<Create classes={classes} classesInfo={classesInfo} displayClassInfo={this.displayClassInfo} classSelected={classSelected} isClassSelected={isClassSelected} category='classes' classProficiencies={classProficiencies} classProficienciesChoices={classProficienciesChoices} addProficiency={this.addProficiency} />);
         
    }
}

export default App