import React, { Component } from 'react'
import isSelected from '../helper/helper-functions'
import ProficiencyModal from '../helper/modal/proficiency-modal'


class ClassProficiencies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: 0,
            proficiencies: [],
            proficienciesChosen: [],           
            proficienciesInfo: [], //objects
            proficienciesChoices: [],  //objects          
            startingProficiencies: [], //objects
            proficiencyNavigationButtons: [], //jsx
            proficiencyIndex: '',
            proficiencySelectedInfo: {},
        };
        this.setProficiencies = this.setProficiencies.bind(this);        
    }

    componentDidMount() {
        const { classSelected } = this.props;
        if (isSelected(classSelected)) {
            this.setProficiencies();
            this.getProficienciesChoices();          
        }
    }   

    getProficienciesChoices() {
        const { classSelected } = this.props;
        const url = 'https://www.dnd5eapi.co';
        let choices = [];
        for (var b = 0; b < classSelected.proficiency_choices.length; b++) {
            const index = b;
            for (var c = 0; c < classSelected.proficiency_choices[b].from.length; c++) {
                const check = c;
                fetch(url + classSelected.proficiency_choices[b].from[c].url)
                    .then(result => result.json())
                    .then(result => { choices.push(result); if (check === classSelected.proficiency_choices[index].from.length - 1 && index === classSelected.proficiency_choices.length - 1) { this.setState({ proficienciesInfo: choices }); } })
                    .catch(e => { console.log(e + " -- getProficiencyChoices()  -- " + url); });
            }           
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


    getProficiencyInfo(proficiency) { 
        const url = 'https://www.dnd5eapi.co'
        fetch(url + proficiency.references[0].url)
            .then(result => result.json())
            .then(result => { this.setState({ proficiencySelectedInfo: result, proficiencyIndex: proficiency.index, }); })
            .catch(e => { console.log(e + " -- getProficiencyInfo()  -- " + url); });
    }
       
    startingProficiencies() {
       const { classSelected } = this.props;
        const count = classSelected.proficiencies.length;
        let startingProficiences = classSelected.proficiencies.map((proficiency, index) => {
            let proficiencyFormatting = '';
            if (index === count - 1) {
                proficiencyFormatting = proficiency.name + '.'
                return (proficiencyFormatting)
            }            
            proficiencyFormatting = proficiency.name + ', '
            return (proficiencyFormatting)
        });
        return (startingProficiences);
    }
    
    addProficiency = (proficiencyName, choicesIndex) => { // Clean up
        const { classSelected } = this.props;
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

    proficiencySelectedInfo(str) {
        const { proficienciesInfo } = this.state;
        for (var a = 0; a < proficienciesInfo.length; a++) {
            if (str === proficienciesInfo[a].index) {
                this.getProficiencyInfo(proficienciesInfo[a])
            }
        }        
    }
     
    proficienciesToChooseFrom() {
        const { classSelected } = this.props;        
        const { proficienciesChosen, category } = this.state;       
        let chooseFrom = [];       
        for (var i = 0; i < classSelected.proficiency_choices.length; i++) {
            let choicesIndex = i;
            const chooseProficiencies = classSelected.proficiency_choices[i].from.map((proficiency, index) => {
                let classNames = 'btn btn-md '
                if (proficienciesChosen.length !== 0) {
                    for (var k = 0; k < proficienciesChosen[choicesIndex].length; k++) {
                        if (proficiency.name === proficienciesChosen[choicesIndex][k].name) {
                            classNames += 'btn-success col-11';
                            let prof = []
                            prof[0] = proficiency;                           
                            return (<div className="btn-group col-12 proficiency-selection" role="group" aria-label="proficiency-buttons" key={index}>
                                <button className={classNames} type='button' onClick={() => this.removeProficiency(proficiency.name, choicesIndex)} key={proficiency.index}>{proficiency.name}</button>
                                <button className='btn btn-sm btn-primary ' type='button' data-toggle="modal" data-target='#proficiency-info' onClick={() => { this.proficiencySelectedInfo(proficiency.index) }} key={'info-btn-proficiency-' + proficiency.indec}>?</button>
                            </div>);
                        }
                    }
                }                 
                classNames += 'btn-secondary col-11';
                let prof = []
                prof[0] = proficiency; //putting this into array so getProficiencyInfo(prof) can handle multiple incoming object.
                return (<div className="btn-group col-12 proficiency-selection" role="group" aria-label="proficiency-buttons" key={index}>
                    <button className={classNames} type='button' onClick={() => this.addProficiency(proficiency.name, choicesIndex)} key={proficiency.index}>{proficiency.name}</button>
                    <button className='btn btn-sm btn-primary ' type='button' data-toggle="modal" data-target='#proficiency-info' onClick={() => { this.proficiencySelectedInfo(proficiency.index) }} key={'info-btn-proficiency-' + proficiency.index}>?</button>
                </div>)
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
        return (<div className='card-header text-white bg-dark text-center'>{buttons}</div>);
    }

    render() {
        const { classSelected } = this.props;
        const { proficiencySelectedInfo } = this.state;
         return (isSelected(classSelected) ? <div className='col-12 selection'>
            <div className="col-12 text-center selectionTitle">
                <h3>{classSelected.name} Proficiencies</h3>
            </div>
            <div className='row'>
                <div className="card col-12 border-dark mb-3 character-card ">                   
                        {this.proficienciesNavigation()}                   
                    <div className="card-body">
                        <h5 className='card-title text-center'>Starting Proficiencies</h5>
                        <p className='card-text'>{this.startingProficiencies()}</p>
                        <h5 className='card-title text-center'>Choose Proficiencies</h5>
                        {this.proficienciesToChooseFrom()}
                        <ProficiencyModal proficiencySelectedInfo={proficiencySelectedInfo} classSelected={classSelected} /> 
                    </div>
                </div>
            </div>
        </div> : <div className='col-12 text-center selection'><h3 className='selectionTitle'>Choose a class to select your proficiencies.</h3></div>);
    }
}

export default ClassProficiencies