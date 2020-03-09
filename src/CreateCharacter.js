import React, { Component } from 'react'
//import Info from './Info'
import Navigation from './Navigation'
import Selection from './Selection'
import Info from './Info'
//import CharacterClass from'./CharacterClass'


class CreateCharacter extends Component {
    constructor(props) {
        super(props);
        console.log("CreateCharacter: ", props);
        this.initialState = props.character;
        this.initialState['navigationCategories'] = ['Races', 'Classes', 'Ability-Scores', 'Proficiencies', 'Spells'];
        this.initialState['navigation'] = 'Races';
        this.initialState['classSelected'] = {};
        this.initialState['raceSelected'] = {};
        this.initialState['isClassSelected'] = this.isClassSelected;
        this.initialState['isRaceSelected'] = this.isRaceSelected;
        this.state = this.initialState;

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

    imagesForRaces = () => {
        const { races } = this.state
        for (var i = 0; i < races.length; i++) {

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


    displayRaceInfo = (index) => {
        const { racesInfo } = this.state
        for (let i = 0; i < racesInfo.length; i++) {
            if (racesInfo[i].index === index) {
                const RaceSelected = racesInfo.filter(function (race) { return race.name === racesInfo[i].name });
                this.setState({ raceSelected: RaceSelected[0]});
                break;
            }
        }
    }

    displayClassInfo = (index) => {
        const { classesInfo } = this.state
        for (let i = 0; i < classesInfo.length; i++) {
            if (classesInfo[i].index === index) {
                const selectedClass = classesInfo.filter(function (cClass) { return cClass.name === classesInfo[i].name });
                this.setState({ classSelected: selectedClass[0]});
                break;
            }
        }
    }

    isClassSelected = (obj) => {
        return (this.isSelected(obj));
    }

    isRaceSelected = (obj) => {
        return (this.isSelected(obj));
    }

    isSelected = (obj) => {
        for (var key in obj) {
            obj.hasOwnProperty(key)
            return true;
        }
        return false;
    }


    handleSubmit = (abilities) => {
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
        const { navigationCategories, navigation } = this.state
      //  const { classSelected, raceSelected } = this.state
        const props = this.state;
        return (<div className='container-fluid'>
            <div className='row'>
            <Info character={this.state} />
            <Selection {...props} displayRaceInfo={this.displayRaceInfo} displayClassInfo={this.displayClassInfo} handleSubmit={this.handleSubmit} getScore={this.getScore} />
            <Navigation navigate={this.navigate} navigationCategories={navigationCategories} navigation={navigation}/>
            </div></div>);
    }
}

export default CreateCharacter