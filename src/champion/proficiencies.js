import React, { Component } from 'react'
import isSelected from '../helper/helper-functions'
import ProficiencyModal from '../helper/modal/proficiency-modal'


class ClassProficiencies extends Component {
    constructor(props) {
        super(props);
        //   console.log("constructor() ", props);
        this.state = {
            category: 0,
            isClassSelected: false,           
            proficiencies: [],
            proficienciesChosen: [],           
            proficienciesInfo: [], //objects
            proficienciesChoices: [],  //objects          
            startingProficiencies: [], //objects
            proficiencyNavigationButtons: [], //jsx
            proficienciesSelected: [],
        };
        this.setProficiencies = this.setProficiencies.bind(this);
        
    }

    componentDidMount() {
        const { classSelected } = this.props;
        if (isSelected(classSelected)) {
            console.log(this.props)
            this.setProficiencies();
           // this.getStartingProficiencies();
            this.getProficienciesChoices();           
           
            this.setState({ isClassSelected: true, });           
        }
    }

    getStartingProficiencies() {
        const { classSelected } = this.props;
        const startingProficiencies = classSelected.proficiencies;
        const url = 'https://www.dnd5eapi.co'
        let proficiencyArray = [];
        for (var a = 0; a < startingProficiencies.length; a++) {
            const check = a;
            fetch(url + startingProficiencies[a].url)
                .then(result => result.json())
                .then(result => { proficiencyArray.push(result); console.log(result); if (check === startingProficiencies.length - 1) { this.getProficiencyInfo(proficiencyArray); } })
                .catch(e => { console.log(e + " -- getStartingProficiency()  -- " + url); });
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
                    .then(result => { choices.push(result); console.log(result); if (check === classSelected.proficiency_choices[index].from.length - 1 && index === classSelected.proficiency_choices.length - 1) { this.getProficiencyInfo(choices) } })
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

    getProficiencyInfo(proficiencies) { 
        const url = 'https://www.dnd5eapi.co'
        console.log(proficiencies)
        let info = [];
        for (var a = 0; a < proficiencies.length; a++) {
            const check = a;
            fetch(url + proficiencies[check].references[0].url)
                .then(result => result.json())
                .then(result => { info.push(result);  if (check === proficiencies.length - 1) { this.setState((state) => ({ proficienciesInfo: state.proficienciesInfo.concat(info) })) } })
        }
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



    showProficiencyInfo(prof) {
        const { proficienciesInfo } = this.state;
        console.log(proficienciesInfo)
        for (var a = 0; a < proficienciesInfo.length; a++) {

        }

    }

    proficienciesToChooseFrom() {
        const { classSelected } = this.props;
      //  const { proficiencies } = this.state;
        const { proficienciesChosen } = this.state;
      //  const { proficienciesChoices } = this.state;
        let chooseFrom = [];
        console.log('Chosen ', proficienciesChosen)
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
                            console.log("whats happening")
                            return (<div className="btn-group col-12 proficiency-selection" role="group" aria-label="proficiency-buttons" key={index}>
                                <button className={classNames} type='button' onClick={() => this.removeProficiency(proficiency.name, choicesIndex)} key={proficiency.index}>{proficiency.name}</button>
                                <button className='btn btn-sm btn-primary ' type='button' data-toggle="modal" data-target='#proficiency-info' onClick={() => { this.showProficiencyInfo(prof) }} key={'info-btn-proficiency-' + proficiency.indec}>?</button>
                            </div>);
                        }
                    }
                }                 
                classNames += 'btn-secondary col-11';
                let prof = []
                prof[0] = proficiency; //putting this into array so getProficiencyInfo(prof) can handle multiple incoming object.
                return (<div className="btn-group col-12 proficiency-selection" role="group" aria-label="proficiency-buttons" key={index}>
                    <button className={classNames} type='button' onClick={() => this.addProficiency(proficiency.name, choicesIndex)} key={proficiency.index}>{proficiency.name}</button>
                    <button className='btn btn-sm btn-primary ' type='button' data-toggle="modal" data-target='#proficiency-info' onClick={() => { this.showProficiencyInfo(prof) }} key={'info-btn-proficiency-' + proficiency.index}>?</button>
                </div>)
            });
            chooseFrom.push(chooseProficiencies);
        }       
        return (chooseFrom);
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
        //console.log("render()")
        const { classSelected } = this.props;
        const { category, proficienciesInfo, startingProficiencies } = this.state;
        const choices = this.proficienciesToChooseFrom();
        const { isClassSelected } = this.state; //this may need to be changed to not confuse with the object 'classSelected'
        console.log(proficienciesInfo)
        return (isClassSelected ? <div className='col-12 selection'>
            <div className="col-12 text-center selectionTitle">
                <h3>{classSelected.name} proficiencies</h3>
            </div>
            <div className='row'>
                <div className="card border-dark mb-3 character-card ">                   
                        {this.proficienciesNavigation()}                   
                    <div className="card-body">
                        <h5 className='card-title'>Starting Proficiencies</h5>
                        <p className='card-text'>{this.startingProficiencies() }
                            <button className='btn btn-sm btn-primary ' type='button' data-toggle="modal" data-target='#proficiency-info' onClick={() => { this.getProficiencyInfo(startingProficiencies) }} >?</button>
                        </p>                       
                        {choices[category]}
                        <ProficiencyModal proficiencies={proficienciesInfo} classSelected={classSelected} /> 
                    </div>
                </div>
            </div>
        </div> : <div className='col-12 text-center selection'><h3 className='selectionTitle'>You must choose a class to select your proficiencies.</h3></div>);
    }
}

export default ClassProficiencies