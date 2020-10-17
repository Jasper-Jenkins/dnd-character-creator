import React, { Component } from 'react'
import isSelected from './helper/helper-functions'

class ClassProficiencies extends Component {
    constructor(props) {
        super(props);
        console.log("constructor() ", props);
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
        const { proficiencies } = this.props; 
        const { proficienciesChosen } = this.props;
        
        
        console.log("setProficiencies() ", proficienciesChosen);
        //let setProficiencies = proficiencies;
        let chosen = []; 

        //// You need to figure out a way to set the proficienciesChosen back to an empty array instead of arrays nested inside
        //// Only because it craps on you because it expects there to be a value in the nested arrays if they exist. 






        let numberOfCategories = classSelected.proficiency_choices.length;
        console.log("#ofCategories ", numberOfCategories);
        if (proficienciesChosen.length < 1) {
            for (var a = 0; a < numberOfCategories; a++) { // # of categories to choose from
                chosen[a] = [];
            }
            console.log("chosen[]: ", chosen, " Should only happen once");
            this.setState({
                proficiencies: proficiencies,
                proficienciesChosen: chosen,
            }, this.props.setProficiencies(proficiencies, chosen));
        } else {
            this.setState({
                proficiencies: proficiencies,
                proficienciesChosen: proficienciesChosen,
            });
        }


        //if (proficienciesChosen.length > 0) { // 
        //    for (var a = 0; a < numberOfCategories.length; a++) { // # of categories to choose from
        //        if (proficienciesChosen[a].length > 0) {
        //            chosen[a] = proficienciesChosen[a].filter((prof) => { return ()})
        //            for (var b = 0; b < proficiencies.length; b++) {
        //                if (proficiencies[b].index === proficienciesChosen[a][b].index) {
        //                    break;
        //                }
        //            }
        //        } else { chosen[a] = []; }
        //    }
        //} else {

        //}

        


        
        //for (var b = 0; b < numberOfCategories; b++) {
        //    if (proficienciesChosen.length > 0) {
        //        if (proficienciesChosen[b].length > 0) {
        //            //proficiencies = [...proficienciesChosen[b]];
                    
        //            for (var c = 0; c < proficienciesChosen[b].length; c++) {
        //                for (var a = 0; a < proficiencies.length; a++) {
        //                    if (proficiencies[a].index === proficienciesChosen[b][c].index) {
        //                        console.log("Found the solution");
        //                        break;
        //                    } else {
        //                        setProficiencies.push(proficienciesChosen[b][c]);
        //                        console.log("DID IT", proficienciesChosen[b][c]);
        //                    }                    
        //                }
        //            }
        //            chosen[b] = [...proficienciesChosen[b]]
        //            if (b === proficienciesChosen.length) {
        //                break;
        //            }
        //        } else {
        //            chosen[b] = [];
        //        }          
        //    } else {
        //        chosen[b] = [];
        //    }
        //}
       // console.log("setProficiences() chosen: ", chosen);

       // let setChosen 

        
    }
   
    addProficiency = (proficiencyName, choicesIndex) => {
        const { classSelected } = this.props;
       // const { proficiencies } = this.state; // testing another way to use state in setState below. 
        const { proficienciesChosen } = this.state;
        const choices = classSelected.proficiency_choices;
        //const categories = choices.length;
        console.log("addProficiency()", proficienciesChosen);
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
        console.log("Added proficiency", proficienciesChosen);
    }
    
    removeProficiency = (proficiencyName, choicesIndex) => {
        const { proficiencies } = this.state;
        const { proficienciesChosen } = this.state;
       // console.log("PROFICIENCIES::::CHOSEN ", proficiencies, " :::: ", proficienciesChosen);
        
        for (var a = 0; a < proficienciesChosen.length; a++) {
            for (var b = 0; b < proficienciesChosen[a].length; b++) {
                if (proficienciesChosen[a][b].name === proficiencyName) {                    
                    let newProficiencies = proficiencies.filter(function (proficiency) { return proficiency.name !== proficiencyName });
                    let newChoices = proficienciesChosen;
                    newChoices[choicesIndex] = proficienciesChosen[choicesIndex].filter(function (proficiency) { return proficiency.name !== proficiencyName });
                    console.log("New Choices ", newChoices);
                    
                    this.setState({
                        proficiencies: [...newProficiencies],
                        proficienciesChosen: newChoices,
                    }, this.props.setProficiencies([...newProficiencies], newChoices));
                    break;
                }
            }           
        }
        console.log("Removed Proficiency ", proficienciesChosen);
    }

    classProficienciesToChooseFrom() {
        const { classSelected } = this.props;
        const { proficiencies } = this.state;
        const { proficienciesChosen } = this.state;

        console.log("classProficienciesToChooseFrom() ", proficienciesChosen);
        let chooseFrom = []
        for (var i = 0; i < classSelected.proficiency_choices.length; i++) {
            let choicesIndex = i;
            const chooseProficiencies = classSelected.proficiency_choices[i].from.map((proficiency) => {
               
                    for (var j = 0; j < proficiencies.length; j++) {
                        for (var k = 0; k < proficienciesChosen[choicesIndex].length; k++) {
                            if (proficiency.name === proficienciesChosen[choicesIndex][k].name) {
                                return (<button className='btn-sm btn-block btn-secondary' onClick={() => this.removeProficiency(proficiency.name, choicesIndex)} key={proficiency.name}>{proficiency.name}</button>);
                            }
                        }
                    }
                
                    return (<button className='btn-sm btn-block btn-primary' onClick={() => this.addProficiency(proficiency.name, choicesIndex)} key={proficiency.name}>{proficiency.name}</button>);
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