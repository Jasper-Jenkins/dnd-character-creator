import React, {Component} from 'react'


class ClassProficiencies extends Component {
    constructor(props) {
        super(props);
        console.log("ClassProficiencies: ", props);
        this.state = {
            classSelected: props.characterClass.classSelected,
            isClassSelected: props.characterClass.isClassSelected,
            proficiencies: [],
            proficienciesChoices: [],
        };
    }

    state = {
        classSelected: {},
        proficiencies: [],
        proficienciesChoices: [],
    }

    componentDidMount() {
        const { classSelected } = this.state
        if (this.state.isClassSelected(classSelected)) {
            this.setStartingProficiencies(classSelected)
        } else {
            //Do nothing if a class has not been selected, needs something here...
        }
    }

    componentWillUnmount(d) {
        console.log("Whatever data it gives me before it dies", d)
    }


    setStartingProficiencies = (chosenClass) => {
        console.log("Set Starting proficiencies", chosenClass)
        const proficiencies = JSON.parse(JSON.stringify(chosenClass.proficiencies))
        const proficienciesChoices = JSON.parse(JSON.stringify(chosenClass.proficiency_choices))
        this.setState({ proficiencies: proficiencies, proficienciesChoices: proficienciesChoices, });
    }


    addProficiency = (proficiencyName, choicesIndex) => {
        const { proficienciesChoices } = this.state
        const { classSelected } = this.state

        const choiceArray = [...proficienciesChoices]

        for (var i = 0; i < choiceArray[choicesIndex].from.length; i++) {
            if (choiceArray[choicesIndex].from.length === (classSelected.proficiency_choices[choicesIndex].from.length - choiceArray[choicesIndex].choose)) {
                alert('no more available!')
                break;
            } else {
                if (choiceArray[choicesIndex].from[i].name === proficiencyName) {
                    const newChoices = choiceArray[choicesIndex].from.filter(function (proficiency) { return proficiency.name !== proficiencyName })
                    let newProficiency = choiceArray[choicesIndex].from.filter(function (proficiency) { return proficiency.name === proficiencyName })

                    newProficiency[0]['index'] = choicesIndex; //added for a check in the classProficiencies component for the removeProficiency() 

                    choiceArray[choicesIndex].from = [...newChoices]

                    this.setState(state => ({
                        proficiencies: [...state.proficiencies, newProficiency[0]],
                        proficienciesChoices: choiceArray,
                    }))
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
                });
                break;
            }
        }
    }


    currentClassProficienices() {
        //   const { proficiencies } - this.state
        const { proficiencies } = this.state
        console.log("Current Proficiencies", proficiencies) 
        let currentProficiencies = proficiencies.map((proficiency) => {
            if (proficiency.index < 20 && proficiency.index > -1) { //needs better validation
                return (<button className='chosenProficiency btn-md btn-secondary' onClick={() => this.removeProficiency(proficiency.name, proficiency.index)} key={proficiency.name}>{proficiency.name}</button>);
            } else {
                return (<span className='proficiencies' key={proficiency.name}>{proficiency.name}</span>);
            }
        });
        return (<div className='col-12'>currentProficiencies</div>);
    }

    classProficienciesToChooseFrom() {
        const { proficienciesChoices } = this.state
        console.log("Proficiency Choices", proficienciesChoices)

        let chooseFrom = []

        for (var i = 0; i < proficienciesChoices.length; i++) {
            let choiceArrayIndex = i;
            const chooseProficiencies = proficienciesChoices[i].from.map((proficiency) => {
                return (<button className='btn-md btn-primary' onClick={() => this.addProficiency(proficiency.name, choiceArrayIndex)} key={proficiency.name}>{proficiency.name}</button>);
            })
            chooseFrom.push(<div className='col-12 chooseProficiency' key={choiceArrayIndex}>{chooseProficiencies}</div>)
        }
        return (chooseFrom);
    }


    render() {
        return (<div className='row'>
                    {this.currentClassProficienices()}
                    {this.classProficienciesToChooseFrom()}
                </div>);
    }
}

export default ClassProficiencies