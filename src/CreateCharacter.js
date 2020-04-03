import React, { Component } from 'react'

import Info from './Info'
import Selection from './Selection'
import Navigation from './Navigation'
import CharacterSave from'./CharacterSave'

//import GOOFING from './GOOFING'

class CreateCharacter extends Component {
    constructor(props) {
        super(props);
        console.log("CreateCharacter: ", props);
        this.initialState = props.character;
        this.initialState['navigationCategories'] = ['Races', 'Classes', 'Ability-Scores', 'Proficiencies', 'Spells'];
        this.initialState['navigation'] = 'Races';
        this.initialState['classSelected'] = {};
        this.initialState['raceSelected'] = {};
        this.initialState['proficiencies'] = [];
        this.initialState['proficienciesChoices'] = [];
        this.initialState['spellsChosen'] = [];
        this.initialState['isClassSelected'] = this.isClassSelected;
        this.initialState['isRaceSelected'] = this.isRaceSelected;
        this.initialState['selectedProficiencies'] = this.selectedProficiencies;
        this.initialState['addProficiency'] = this.addProficiency;
        this.initialState['removeProficiency'] = this.removeProficiency;
        this.initialState['startingProficiencies'] = this.startingProficiencies;
        this.initialState['updateProficiencies'] = this.updateProficiencies;
        this.state = this.initialState;
    }

    selectedProficiencies = (classProficiencies) => {
        this.setState({ proficiencies: classProficiencies, });
    }
    
    //setCharacterClassProps(props) {
    //    const propsKeys = Object.getOwnPropertyNames(props.characterClass);
    //    let properties = {};
    //    for (var i = 0; i < propsKeys.length; i++) {
    //        properties[propsKeys[i]] = props.characterClass[propsKeys[i]];
    //    };        
    //    return properties
    //}

    navigate = (category) => {
        this.setState({ navigation: category, });
    }

    getScore = (ability) => {
        const { abilityScores } = this.state
        const { abilityScoresSelected } = this.state
        let scores = abilityScoresSelected
        for (var i = 0; i < abilityScores.count; i++) {
            if (abilityScores.results[i].index === ability) {
                scores[ability] = this.randomDiceRoll(6)
                this.setState({abilityScoresSelected: scores})
                console.log(scores[ability])
                break;
            }
        }
    }

    randomDiceRoll = (maxNum) => {
        let totalDiceRolls = 5;
        let totalRollsToKeep = 3;
        let abilityPoint = 0
        let abilityPoints = 0
        let abilityPointsArray = []
        for (var i = 0; i < totalDiceRolls; i++) {
            abilityPoint = Math.floor((Math.random() * maxNum) + 1)
            abilityPointsArray.push(abilityPoint)
        }
        abilityPointsArray.sort()
        abilityPointsArray.splice(0, totalDiceRolls - totalRollsToKeep)
        for (var j = 0; j < abilityPointsArray.length; j++) {
            abilityPoints += abilityPointsArray[j]
        }
        return abilityPoints
    }

    selectRace = (index) => {
        const { racesInfo } = this.state
        for (let i = 0; i < racesInfo.length; i++) {
            if (racesInfo[i].index === index) {
                const RaceSelected = racesInfo.filter(function (race) { return race.name === racesInfo[i].name });
                this.setState({ raceSelected: RaceSelected[0] });
                break;
            }
        }
    }

    selectClass = (index) => {
        const { classesInfo } = this.state
        for (let i = 0; i < classesInfo.length; i++) {
            if (classesInfo[i].index === index) {
                const selectedClass = classesInfo.filter(function (cClass) { return cClass.name === classesInfo[i].name });
                this.setState({ classSelected: selectedClass[0], proficiencies: [] });
                break;
            }
        }
    }

    addProficiency = (proficiency) => {
        this.setState(state => ({
            proficiencies: [...state.proficiencies, proficiency],
        }));
    }

    removeProficiency = (proficiencies) => {
        console.log("Removing?", proficiencies)
        this.setState({
            proficiencies: proficiencies
        }, this.removed);
    }

    removed = () => {
        const { proficiencies } = this.state
        console.log("Removed", proficiencies)
    }

    updateProficiencies = (proficiencies, choices) => {
   //     const { classSelected } = this.state

   //     if () { }
        this.setState({
            proficiencies: proficiencies,
            proficienciesChoices: choices,
        });
    }

    //resetClassProficiencies = (classChangingTo) => {
    //    //if  
    //}




    startingProficiencies = (proficiencies) => {        
        this.setState({proficiencies: proficiencies });
    }
    
    isRaceSelected = (raceSelected) => {
        return (this.isSelected(raceSelected));
    }

    isClassSelected = (classSelected) => {
        return (this.isSelected(classSelected));
    }

    isSelected = (obj) => {
        for (var key in obj) {
            obj.hasOwnProperty(key)
            return true;
        }
        return false;
    }

    handleSubmit = (abilities) => { //needs tending too, add better out of bounds messages...and how its handled maaaybe
        const { abilityScoresSelected } = this.state
        let scores = abilityScoresSelected
        let noZeroes = []
        for (var i = 0; i < abilities.length; i++) {
            if (abilities[i].value < 3 || abilities[i].value > 18) { //needs better validation
                noZeroes.push(abilities[i].name);
            } else {
                scores[abilities[i].name] = parseInt(abilities[i].value, 10)
                this.setState({ abilityScoresSelected: scores })
            }
        }
        if (noZeroes.length > 0) {
            let zeroesAlert = "Ability Scores must not be 0, you currently have 0 in: ";
            for (var k = 0; k < noZeroes.length; k++) {
                if (k < noZeroes.length - 1) {
                    zeroesAlert += noZeroes[k] + ", ";
                } else {
                    zeroesAlert += noZeroes[k];
                }
            }
            zeroesAlert += "."
            alert(zeroesAlert)
        }
    }

    componentDidUpdate() {
        console.log("A Change to CreateCharacter has occured")
    }

    render() {
        const { navigationCategories, navigation, } = this.state
    
        return (<div className='container-fluid creation'>
                    <div className='row'>
                        <Info character={this.state} />
                    </div>
                    <div className='row'>
                        <Selection {...this.state} selectRace={this.selectRace} selectClass={this.selectClass} handleSubmit={this.handleSubmit} getScore={this.getScore} />
                    </div>
                    <div className='row'>
                        <Navigation {...this.state} navigate={this.navigate} navigationCategories={navigationCategories} navigation={navigation} />
                    </div>
                    <div className='row'>
                        <CharacterSave {...this.state} />
                    </div>
               </div>);
    }
}

// <GOOFING />
export default CreateCharacter