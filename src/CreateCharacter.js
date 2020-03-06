import React, { Component } from 'react'
//import Info from './Info'
import Navigation from './Navigation'
import Selection from './Selection'
import Info from './Info'
//import CharacterClass from'./CharacterClass'


class CreateCharacter extends Component {
    constructor(props) {
        super(props);
        console.log("CreateCharacter: ", props.characterClass);
        this.state = props.characterClass;
        this.state['navigationCategories'] = ['Races', 'Classes', 'Ability-Scores', 'Proficiencies', 'Spells'];
        this.state['navigation'] = ['Races'];
        this.state['classSelected'] = {};
        this.state['raceSelected'] = {};
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

    getScore = ability => {

        const { abilityScores } = this.state
        const { abilityScoresSelected } = this.state
        let scores = abilityScoresSelected

        for (var i = 0; i < abilityScores.count; i++) {
            if (abilityScores.results[i].index === ability) {
                scores[ability] = this.randomDSix()
                this.setState({abilityScoresSelected: scores})
                console.log(scores[ability])
                break;
            }
        }
    }

    randomDSix() {
        let totalDiceRolls = 5;
        let totalRollsToKeep = 3;

        let abilityPoint = 0
        let abilityPoints = 0
        let abilityPointsArray = []

        for (var i = 0; i < totalDiceRolls; i++) {
            abilityPoint = Math.floor((Math.random() * 6) + 1)
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
                this.setState({ raceSelected: RaceSelected[0], isRaceSelected: true });
                break;
            }
        }
    }

    displayClassInfo = (index) => {
        const { classesInfo } = this.state
        for (let i = 0; i < classesInfo.length; i++) {
            if (classesInfo[i].index === index) {
                const selectedClass = classesInfo.filter(function (cClass) { return cClass.name === classesInfo[i].name });
                this.setState({ classSelected: selectedClass[0], isClassSelected: true });
                break;
            }
        }
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
    componentDidMount() {
        //this.navigate('Race')
    }
    componentDidUpdate() {
        console.log("A Change to CreateCharacter has occured")
    }

    render() {
        const { navigationCategories } = this.state
        const { classSelected, raceSelected } = this.state
        
        return (<div className='row'>
            <Info classSelected={classSelected} raceSelected={raceSelected} />
            <Selection character={this.state} displayRaceInfo={this.displayRaceInfo} displayClassInfo={this.displayClassInfo} handleSubmit={this.handleSubmit} getScore={this.getScore} />
            <Navigation navigate={this.navigate} navigationCategories={navigationCategories} />
            </div>);
    }
}

export default CreateCharacter