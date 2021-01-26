import React, { Component } from 'react'
import isSelected from '../helper/helper-functions'

class ClassProficiencies extends Component {
    constructor(props) {
        super(props);
        //   console.log("constructor() ", props);
        this.state = {
            isClassSelected: false,
            proficiencies: [],
            proficienciesChosen: [],
            category: 0,
        };
        this.setProficiencies = this.setProficiencies.bind(this);
    }

    componentDidMount() {
        const { classSelected } = this.props;
        if (isSelected(classSelected)) {
            this.setProficiencies();
            this.setState({ isClassSelected: true, });

        }
    }

    setProficiencies() {
        const { classSelected } = this.props;
        const { proficiencies } = this.props;
        const { proficienciesChosen } = this.props;
        let chosen = [];
        let numberOfCategories = classSelected.proficiency_choices.length;
        if (proficienciesChosen.length < 1) {
            for (var a = 0; a < numberOfCategories; a++) { // # of categories to choose from
                chosen[a] = [];
            }
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
    }

    addProficiency = (proficiencyName, choicesIndex) => { // Clean up
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
                const message = "You can only select " + choices[choicesIndex].choose + " from this category."
                this.props.updateAlertMessage(message);
                break;
            }
        }
    }

    removeProficiency = (proficiencyName, choicesIndex) => {
        const { proficiencies } = this.state;
        const { proficienciesChosen } = this.state;
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

    proficienciesToChooseFrom(category) {
        const { classSelected } = this.props;
        const { proficiencies } = this.state;
        const { proficienciesChosen } = this.state;
        let chooseFrom = [];
        console.log(classSelected);
        for (var i = 0; i < classSelected.proficiency_choices.length; i++) {
            let choicesIndex = i;
            const chooseProficiencies = classSelected.proficiency_choices[i].from.map((proficiency) => {
                for (var j = 0; j < proficiencies.length; j++) {
                    for (var k = 0; k < proficienciesChosen[choicesIndex].length; k++) {
                        if (proficiency.name === proficienciesChosen[choicesIndex][k].name) {
                            return (<button className='btn-sm col-6 btn-primary' onClick={() => this.removeProficiency(proficiency.name, choicesIndex)} key={proficiency.name}>{proficiency.name}</button>);
                        }
                    }
                }
                return (<button className='btn-sm col-6 btn-secondary' onClick={() => this.addProficiency(proficiency.name, choicesIndex)} key={proficiency.name}>{proficiency.name}</button>);
            });
            chooseFrom.push(chooseProficiencies);
        }
        return (chooseFrom[category]);
    }
    setNavigationCategory(newCategory) {
        this.setState({ category: newCategory, });
    }

    proficienciesNavigation() {
        const { classSelected } = this.props;
        const { category } = this.state;
        const { proficienciesChosen } = this.state;
        let buttons = [];
        for (var a = 0; a < classSelected.proficiency_choices.length; a++) {
            let newCategory = a;
            let check = proficienciesChosen[newCategory]; //I have to check because this comes through undefined the very first time this function runs, need to figure out a better solution.
            let num;
            if (check === undefined) {
                num = 0;
            } else {
                num = proficienciesChosen[newCategory].length;
            }
            if (category === a) {
                buttons.push(<button className='btn-sm btn btn-primary' onClick={() => void (0)} key={classSelected.name + a}>Choose: {classSelected.proficiency_choices[newCategory].choose - num}</button>)
            } else {
                buttons.push(<button className='btn-sm btn btn-secondary' onClick={() => this.setNavigationCategory(newCategory)} key={classSelected.name + a}>Choose: {classSelected.proficiency_choices[newCategory].choose - num}</button>)
            }
        }
        return (<div className='col-12'>{buttons}</div>);
    }


    render() {
        const { category } = this.state;
        const { isClassSelected } = this.state; //this may need to be changed to not confuse with the object 'classSelected'
        return (isClassSelected ? <div className='col-12 text-center selection'>
            <div className="col-12 selectionTitle">
                <h3>Choose your proficiencies</h3>
            </div>
            <div className="card border-dark mb-3 ">
                <div className="card-header text-white bg-dark text-center">
                    {this.proficienciesNavigation()}
                </div>
                <div className="card-body">
                    {this.proficienciesToChooseFrom(category)}
                </div>
            </div>
        </div> : <div className='col-12 text-center selection'><h3 className='selectionTitle'>You must choose a class to select your proficiencies.</h3></div>);
    }
}

export default ClassProficiencies