import React, {Component} from 'react'


class ClassProficiencies extends Component {
    constructor(props) {
        super(props);
        console.log("ClassProficiencies: ", props);
        this.state = {
            classSelected: props.characterClass.classSelected,
            classProficiencies: props.characterClass.classProficiencies,
            classProficienciesChoices: props.characterClass.classProficienciesChoices,
            //currentProficiencies: [],
            proficienciesToChooseFrom: [],
            //proficienciesToDisplay: []
        };
    }

    state = {
        classSelected: {},
        classProficiencies: [],
        classProficienciesChoices: [],
        //currentProficiencies: [],
        proficienciesToChooseFrom: [],
        //proficienciesToDisplay: []
    }

    //componentDidMount() {
    //    this.classProficienciesToChooseFrom();
    //}

    addProficiency = (proficiencyName, choicesIndex) => {
        const { classProficienciesChoices } = this.state
        const { classSelected } = this.state

        const choiceArray = [...classProficienciesChoices]

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
                        classProficiencies: [...state.classProficiencies, newProficiency[0]],
                        classProficienicesChoices: choiceArray,
                    }))
                    break;
                }
            }
        }
    }

    removeProficiency = (proficiencyName, choicesIndex) => {
        const { classProficiencies } = this.state
        const { classProficienciesChoices } = this.state
        const { classSelected } = this.state

        let proficiencies = [...classProficiencies]
        let proficienciesChoices = [...classProficienciesChoices]
        let choices = JSON.parse(JSON.stringify(classSelected.proficiency_choices));

        for (var i = 0; i < classProficiencies.length; i++) {
            if (proficiencies[i].name === proficiencyName) {
                let newProficiencies = proficiencies.filter(function (proficiency) { return proficiency.name !== proficiencyName })
                let newChoice = choices[choicesIndex].from.filter(function (proficiency) { return proficiency.name === proficiencyName })
                
                proficienciesChoices[choicesIndex].from = [...proficienciesChoices[choicesIndex].from, newChoice[0]]

                this.setState({
                    classProficiencies: [...newProficiencies],
                    classProficienicesChoices: proficienciesChoices,
                });
                break;
            }
        }
    }

    currentClassProficienices() {
        const { classProficiencies } = this.state


        let currentProficiencies = classProficiencies.map((proficiency) => {
            //if (proficiency.index === undefined) {
            //    return (<span className='proficiencies' key={proficiency.name}>{proficiency.name}</span>);
            //} else {
            //    return (<button className='chosenProficiency btn-md btn-secondary' onClick={() => this.removeProficiency(proficiency.name, proficiency.index)} key={proficiency.name}>{proficiency.name}</button>);
            //}
            if (proficiency.index < 20 && proficiency.index > -1 ) {
                return (<button className='chosenProficiency btn-md btn-secondary' onClick={() => this.removeProficiency(proficiency.name, proficiency.index)} key={proficiency.name}>{proficiency.name}</button>);
            } else {
                return (<span className='proficiencies' key={proficiency.name}>{proficiency.name}</span>);
            }

        });
        return (currentProficiencies);
    }

    classProficienciesToChooseFrom() {
        const { classProficienciesChoices } = this.state
        let chooseFrom = []
        for (var i = 0; i < classProficienciesChoices.length; i++) {
            let choiceArrayIndex = i;
            const chooseProficiencies = classProficienciesChoices[i].from.map((proficiency) => {
                return (<button className='btn-md btn-primary' onClick={() => this.addProficiency(proficiency.name, choiceArrayIndex)} key={proficiency.name}>{proficiency.name}</button>);
            })
            chooseFrom.push(<div className='col-12 chooseProficiency' key={choiceArrayIndex}>{chooseProficiencies}</div>)
        }
        return (chooseFrom);
    }

    render() {
        return (<div className='col-12 selection'>
            <div className='row'>
                <div className='col-12'>{this.currentClassProficienices()}</div>
            </div>
            <div className='row'>
                {this.classProficienciesToChooseFrom()}
            </div>
        </div>);
    }
}

export default ClassProficiencies