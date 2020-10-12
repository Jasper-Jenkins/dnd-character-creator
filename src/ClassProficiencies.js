import React, { Component } from 'react'
import isSelected from './helper/helper-functions'

class ClassProficiencies extends Component {
    constructor(props) {
        super(props);
        console.log("ClassProficiencies: ", props);
        this.state = {
            proficiencies: [],
            proficienciesChosen: [],
            
        };
        this.setProficiencies = this.setProficiencies.bind(this);
    }

    componentDidMount() {
        const { classSelected }  = this.props;
        if (isSelected(classSelected)) {
            this.setProficiencies();
        }    
        
    }   
    
    setProficiencies() {
        const { classSelected } = this.props;
        const { proficienciesChosen } = this.props;
        console.log("SET PROFICIENCIES ", proficienciesChosen);
        let proficiencies = classSelected.proficiencies;
        let chosen = []; 
        let numberOfCategories = classSelected.proficiency_choices.length;
        
        for (var b = 0; b < numberOfCategories; b++) {
            if (proficienciesChosen.length > 0) {
                if (proficienciesChosen[b].length > 0) {
                    chosen[b] = [...proficienciesChosen[b]]
                    console.log("DID IT", chosen[b]);
                    if (b === proficienciesChosen.length) {
                        break;
                    }
                }               
            } else {
                chosen[b] = [];
            }
        }
        console.log("chosen: ", chosen);
        this.setState({
            proficiencies: proficiencies,
            proficienciesChosen: chosen,
        });
    }
   
    addProficiency = (proficiencyName, choicesIndex) => {
        const { classSelected } = this.props;
       // const { proficiencies } = this.state; // testing another way to use state in setState below. 
        const { proficienciesChosen } = this.state;
        const choices = classSelected.proficiency_choices;     
        for (var i = 0; i < choices[choicesIndex].from.length; i++) {
            if (proficienciesChosen[choicesIndex].length < choices[choicesIndex].choose) {
                if (choices[choicesIndex].from[i].name === proficiencyName) {
                    let newProficiency = choices[choicesIndex].from.filter(function (proficiency) { return proficiency.name === proficiencyName });
                    const newProfs = [...this.state.proficiencies, newProficiency[0]];
                    let chosen = proficienciesChosen;
                    chosen[choicesIndex] = [...chosen[choicesIndex], newProficiency[0]];
                    this.setState(state => ({
                        proficiencies: [...state.proficiencies, newProficiency[0]],
                        proficienciesChosen: chosen,
                    }), this.props.setProficiencies(newProfs, chosen));
                    break;
                }
            } else {
                this.props.updateAlertMessage('You have selected the maximum number of proficiencies from this category');
                break;
            }            
        }
    }
    
    removeProficiency = (proficiencyName, choicesIndex) => {
        const { proficiencies } = this.state;
        const { proficienciesChosen } = this.state;
        console.log("PROFICIENCIES::::CHOSEN ", proficiencies, " :::: ", proficienciesChosen);
        
        for (var a = 0; a < proficienciesChosen.length; a++) {
            for (var b = 0; b < proficienciesChosen[a].length; b++) {
                if (proficienciesChosen[a][b].name === proficiencyName) {                    
                    let newProficiencies = proficiencies.filter(function (proficiency) { return proficiency.name !== proficiencyName });
                    let newChoices = proficienciesChosen;
                    newChoices[choicesIndex] = proficienciesChosen[choicesIndex].filter(function (proficiency) { return proficiency.name !== proficiencyName });

                    this.setState({
                        proficiencies: [...newProficiencies],
                        proficienciesChosen: newChoices,
                    }, this.props.setProficiencies([...newProficiencies], newChoices));
                    break;
                }
            }           
        }
    }

    classProficienciesToChooseFrom() {
        const { classSelected } = this.props;
        const { proficiencies } = this.state;
        const { proficienciesChosen } = this.state;
        let chooseFrom = []
        for (var i = 0; i < classSelected.proficiency_choices.length; i++) {
            let choicesIndex = i;
            const chooseProficiencies = classSelected.proficiency_choices[i].from.map((proficiency) => {
                for (var j = 0; j < proficiencies.length; j++) {
                    for (var k = 0; k < proficienciesChosen[choicesIndex].length; k++) {
                        if (proficiency.name === proficienciesChosen[choicesIndex][k].name) {
                            return (<button className='col-12 btn-md btn-sm btn-block btn-secondary' onClick={() => this.removeProficiency(proficiency.name, choicesIndex)} key={proficiency.name}>{proficiency.name}</button>);
                        }
                    }                    
                }
                return (<button className='col-12 btn-md btn-sm btn-block btn-primary' onClick={() => this.addProficiency(proficiency.name, choicesIndex)} key={proficiency.name}>{proficiency.name}</button>);
            });
            chooseFrom.push(<div className='col-6 chooseProficiency' key={'catetory' + choicesIndex}><h6>Choose: {classSelected.proficiency_choices[choicesIndex].choose}</h6>{chooseProficiencies}</div>)
        }
        return (chooseFrom);
    }

    render() {
          return (<div className='row'>
                    {this.classProficienciesToChooseFrom()}
                </div>);
    }
}

export default ClassProficiencies