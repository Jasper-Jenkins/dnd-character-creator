import React, { Component } from 'react'

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
        this.initialState['imagesForRaces'] = this.imagesForRaces;
        this.state = this.initialState;
    //    this.imagesForRaces();
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

    imagesForRaces = (race) => {
        const { racesInfo } = this.state

        let imagesForRaceSelection = [
            { name: 'dragonborn', url: 'https://i.pinimg.com/564x/61/e4/de/61e4ded99a6ac9f0a388cbd9b82ae567.jpg', author: '', contact:'', },
            { name: 'dwarf', url: 'https://i.pinimg.com/564x/c0/8d/ff/c08dff825c68e504edea38371c5ee102.jpg', author: '', contact: '', },
            { name: 'elf', url: 'https://i.pinimg.com/originals/63/86/73/63867332e190ee9ee647b82128399c75.jpg', author: '', contact: '', },
            { name: 'gnome', url: 'https://i.pinimg.com/564x/46/4e/4f/464e4fc3b4f7d342cc06a3edbbc11498.jpg', author: '', contact: '', },
            { name: 'half-elf', url: 'https://i.pinimg.com/564x/fd/19/7a/fd197a8cb51cb31e2a081203a6526e7b.jpg', author: '', contact: '', },
            { name: 'halfling', url: 'https://i.pinimg.com/564x/57/ba/be/57babe55a84414e8de15424848567959.jpg', author: '', contact: '', },
            { name: 'half-orc', url: 'https://i.pinimg.com/564x/e8/aa/82/e8aa821de4be602c6bfc776da87ca1e8.jpg', author: '', contact: '', },
            { name: 'human', url: 'https://i.pinimg.com/564x/cc/e7/fd/cce7fdd2ee1e9451f39cc1efbd04c243.jpg', author: '', contact: '', },
            { name: 'tiefling', url: 'https://i.pinimg.com/564x/0d/e0/01/0de001eb65d3920c851f040690e0bdc6.jpg', author: '', contact: '', },
        ]

        for (var i = 0; i < racesInfo.length; i++) {
            if (race === imagesForRaceSelection[i].name) {
                return (<img src={imagesForRaceSelection[i].url} className='raceSelectImage' alt={race} />);
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

    isClassSelected = (classSelected) => {
        return (this.isSelected(classSelected));
    }

    isRaceSelected = (raceSelected) => {
        return (this.isSelected(raceSelected));
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
                    <div className='row creation'>
                        <Info character={this.state} />
                        <Selection {...props} displayRaceInfo={this.displayRaceInfo} displayClassInfo={this.displayClassInfo} handleSubmit={this.handleSubmit} getScore={this.getScore} />
                        <Navigation navigate={this.navigate} navigationCategories={navigationCategories} navigation={navigation}/>
                    </div>
                </div>);
    }
}

export default CreateCharacter