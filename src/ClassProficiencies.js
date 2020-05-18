import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import UserAlert from './Alert'

class ClassProficiencies extends Component {
    constructor(props) {
        super(props);
        console.log("ClassProficiencies: ", props);
        this.state = {
            classSelected: props.classSelected,
            isClassSelected: props.isClassSelected,
            proficiencies: props.proficiencies,
            proficienciesChoices: props.proficienciesChoices,
            startingProficiencies: props.startingProficiencies,
            setProficiencies: props.setProficiencies,
            updateProficiencies: props.updateProficiencies,
        };
    }

    componentDidMount() {
        this.startingProficiencies()
    }

    componentWillUnmount() {
        const { proficiencies } = this.state
        const { proficienciesChoices } = this.state        
        this.state.updateProficiencies(proficiencies, proficienciesChoices)
    }

    startingProficiencies = () => {
        const { classSelected } = this.state
        const { proficiencies } = this.state
        const { proficienciesChoices } = this.state
        if (proficiencies.length < 1) { //needs better validation
            console.log("should default here")
            this.setStartingProficiencies(classSelected.proficiencies, classSelected.proficiency_choices)
        } else {
            console.log("created proficiencies from those already selected")
            this.setStartingProficiencies(proficiencies, proficienciesChoices)
        }        
    }

    setStartingProficiencies = (proficiencies, choices) => {
        const startingProficiencies = JSON.parse(JSON.stringify(proficiencies))
        const proficienciesChoices = JSON.parse(JSON.stringify(choices))
        this.setState({
            proficiencies: startingProficiencies,
            proficienciesChoices: proficienciesChoices,
        }, this.state.startingProficiencies(startingProficiencies));
    }

    fadeEffect = () => {

    }

    addProficiency = (proficiencyName, choicesIndex) => {
        const { classSelected } = this.state
        const { proficienciesChoices } = this.state
        const choices = [...proficienciesChoices]
        for (var i = 0; i < choices[choicesIndex].from.length; i++) {
            if (choices[choicesIndex].from.length === (classSelected.proficiency_choices[choicesIndex].from.length - choices[choicesIndex].choose)) {
                UserAlert('You have selected the maximum number of proficiencies from this category');
                break;
            } else {
                if (choices[choicesIndex].from[i].name === proficiencyName) {
                    let newProficiency = choices[choicesIndex].from.filter(function (proficiency) { return proficiency.name === proficiencyName })
                    const newChoices = choices[choicesIndex].from.filter(function (proficiency) { return proficiency.name !== proficiencyName })
                    choices[choicesIndex].from = [...newChoices]
                    const newProfs = [...this.state.proficiencies, newProficiency[0]]
                    this.setState(state => ({
                        proficiencies: [...state.proficiencies, newProficiency[0]],
                    }), this.state.setProficiencies(newProfs));
                    break;
                }
            }
        }
    }
    
    removeProficiency = (proficiencyName, choicesIndex) => {
        const { proficiencies } = this.state
        const { proficienciesChoices } = this.state
        const { classSelected } = this.state
        let classProficiencies = [...proficiencies]
        let classProficienciesChoices = [...proficienciesChoices]
        let choices = JSON.parse(JSON.stringify(classSelected.proficiency_choices));
        for (var i = 0; i < classProficiencies.length; i++) {
            if (classProficiencies[i].name === proficiencyName) {
                let newProficiencies = proficiencies.filter(function (proficiency) { return proficiency.name !== proficiencyName })
                let newChoice = choices[choicesIndex].from.filter(function (proficiency) { return proficiency.name === proficiencyName })
                classProficienciesChoices[choicesIndex].from = [...proficienciesChoices[choicesIndex].from, newChoice[0]]
                this.setState({
                    proficiencies: [...newProficiencies],
                    proficienicesChoices: classProficienciesChoices,
                }, this.state.setProficiencies(newProficiencies));
                break;
            }
        }
    }

    classProficienciesToChooseFrom() {
        const { classSelected } = this.state
        const { proficiencies } = this.state
        let chooseFrom = []
        for (var i = 0; i < classSelected.proficiency_choices.length; i++) {
            let choicesIndex = i;
            const chooseProficiencies = classSelected.proficiency_choices[i].from.map((proficiency) => {
                for (var j = 0; j < proficiencies.length; j++) {
                    if (proficiency.name === proficiencies[j].name) {
                        return (<button className='btn-md btn-secondary' onClick={() => this.removeProficiency(proficiency.name, choicesIndex)} key={proficiency.name}>{proficiency.name}</button>);
                    }
                }
                return (<button className='btn-md btn-primary' onClick={() => this.addProficiency(proficiency.name, choicesIndex)} key={proficiency.name}>{proficiency.name}</button>);
            });
            chooseFrom.push(<div className='col-12 chooseProficiency' key={choicesIndex}>{chooseProficiencies}</div>)
        }
        return (chooseFrom);
    }

    render() {
     // const { proficienciesChoices } = this.state
     // console.log("pro choices: ", proficienciesChoices)
        return (<div className='row'>
                    {this.classProficienciesToChooseFrom()}
                </div>);
    }
}

export default ClassProficiencies