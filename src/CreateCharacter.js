import React, { Component } from 'react'

import Info from './Info'
import Selection from './Selection'
import Navigation from './Navigation'
import CharacterSave from'./CharacterSave'

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
        this.initialState['spells'] = [];
        this.initialState['isClassSelected'] = this.isClassSelected;
        this.initialState['isRaceSelected'] = this.isRaceSelected;
        this.initialState['selectedProficiencies'] = this.selectedProficiencies;
        this.initialState['imagesForRaces'] = this.imagesForRaces;
        this.initialState['imagesForHumans'] = this.imagesForHumans;
        this.state = this.initialState;
    //    this.imagesForRaces();
    }
    selectedProficiencies(classProficiencies) {
        this.setState({ proficiencies: classProficiencies, });
    }

    dateTimeStamp() {

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

    imagesForHumans = (characterClassIndex) => {
        const { classesInfo } = this.state
      //  console.log("did it make it?", classesInfo)
        const imagesForClassSelectionAsHuman = [
            { index: 'barbarian', url: 'https://i.pinimg.com/564x/db/c8/7c/dbc87c7ceb36d62190d3d90f9d4dafc2.jpg', author: '', contact: '', },
            { index: 'bard', url: 'https://i.pinimg.com/564x/b3/07/90/b30790fbb186269e1e935bc7723c42d4.jpg', author: '', contact: '', },
            { index: 'cleric', url: 'https://i.pinimg.com/564x/1a/3b/78/1a3b784f009047d3213235de843607ae.jpg', author: '', contact: '', },
            { index: 'druid', url: 'https://i.pinimg.com/564x/72/7b/e5/727be5cd3cab5399fdec593d6331cd6c.jpg', author: '', contact: '', },
            { index: 'fighter', url: 'https://i.pinimg.com/564x/24/cf/fc/24cffc7132c9a450490e9ac1c87468d4.jpg', author: '', contact: '', },
            { index: 'monk', url: 'https://i.pinimg.com/564x/8c/37/71/8c3771cd013384aa23f5730720899c9a.jpg', author: '', contact: '', },
            { index: 'paladin', url: 'https://i.pinimg.com/564x/45/24/72/4524723510cd2602015af0c304bc9a4e.jpg', author: '', contact: '', },
            { index: 'ranger', url: 'https://i.pinimg.com/564x/81/68/05/816805148150db62e71a576111996331.jpg', author: '', contact: '', },
            { index: 'rogue', url: 'https://i.pinimg.com/564x/83/45/38/834538b196724b0c00f8e5b232105737.jpg', author: '', contact: '', },
            { index: 'sorcerer', url: 'https://i.pinimg.com/564x/a0/73/ee/a073ee9630a21db6bb789c4bf60ee4a1.jpg', author: '', contact: '', },
            { index: 'warlock', url: 'https://i.pinimg.com/564x/58/c0/a6/58c0a66f043e574167d6ad8846b0764f.jpg', author: '', contact: '', },
            { index: 'wizard', url: 'https://i.pinimg.com/564x/a8/7c/af/a87caf005ff8e694317734fb00bc9b49.jpg', author: '', contact: '', },
         ]
        for (var i = 0; i < classesInfo.length; i++) {
            if (characterClassIndex === imagesForClassSelectionAsHuman[i].index) {
                return (<img src={imagesForClassSelectionAsHuman[i].url} className='classSelectImage' alt={characterClassIndex} />);
            }
        }
    }
       


    imagesForRaces = (characterRaceIndex) => {
        const { racesInfo } = this.state
    //    console.log("Did it make it. races info",racesInfo)
        let imagesForRaceSelection = [
            { index: 'dragonborn', url: 'https://i.pinimg.com/564x/61/e4/de/61e4ded99a6ac9f0a388cbd9b82ae567.jpg', author: '', contact:'', },
            { index: 'dwarf', url: 'https://i.pinimg.com/564x/c0/8d/ff/c08dff825c68e504edea38371c5ee102.jpg', author: '', contact: '', },
            { index: 'elf', url: 'https://i.pinimg.com/originals/63/86/73/63867332e190ee9ee647b82128399c75.jpg', author: '', contact: '', },
            { index: 'gnome', url: 'https://i.pinimg.com/564x/3e/54/26/3e5426b3dbec68142d1a836f04dd0e66.jpg', author: '', contact: '', },
            { index: 'half-elf', url: 'https://i.pinimg.com/564x/fd/19/7a/fd197a8cb51cb31e2a081203a6526e7b.jpg', author: '', contact: '', },
            { index: 'halfling', url: 'https://i.pinimg.com/564x/57/ba/be/57babe55a84414e8de15424848567959.jpg', author: '', contact: '', },
            { index: 'half-orc', url: 'https://i.pinimg.com/564x/e8/aa/82/e8aa821de4be602c6bfc776da87ca1e8.jpg', author: '', contact: '', },
            { index: 'human', url: 'https://i.pinimg.com/564x/cc/e7/fd/cce7fdd2ee1e9451f39cc1efbd04c243.jpg', author: '', contact: '', },
            { index: 'tiefling', url: 'https://i.pinimg.com/564x/0d/e0/01/0de001eb65d3920c851f040690e0bdc6.jpg', author: '', contact: '', },
        ]

        for (var i = 0; i < racesInfo.length; i++) {
            if (characterRaceIndex === imagesForRaceSelection[i].index) {
                return (<img src={imagesForRaceSelection[i].url} className='raceSelectImage' alt={characterRaceIndex} />);
            }            
        }
    }

    imagesForClasses = (characterClassName) => {
        const { classesInfo } = this.state
        let imagesForClassSelection = [
            { index: 'barbarian', url: '', author: '', contact: '', },
            { index: 'bard', url: '', author: '', contact: '', },
            { index: 'cleric', url: '', author: '', contact: '', },
            { index: 'druid', url: '', author: '', contact: '', },
            { index: 'fighter', url: '', author: '', contact: '', },
            { index: 'monk', url: '', author: '', contact: '', },
            { index: 'paladin', url: '', author: '', contact: '', },
            { index: 'ranger', url: '', author: '', contact: '', },
            { index: 'rogue', url: '', author: '', contact: '', },
            { index: 'sorcerer', url: '', author: '', contact: '', },
            { index: 'warlock', url: '', author: '', contact: '', },
            { index: 'wizard', url: '', author: '', contact: '', },
        ]

        for (var i = 0; i < classesInfo.length; i++) {
            if (characterClassName === imagesForClassSelection[i].name) {
                return (<img src={imagesForClassSelection[i].url} className='classSelectImage' alt={characterClassName} />);
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
                this.setState({ classSelected: selectedClass[0] });
                break;
            }
        }
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
        const { navigationCategories, navigation, } = this.state
        //  const { classSelected, raceSelected } = this.state
        const { classSelected } = this.state
     

        const props = this.state;
        return (<div className='container-fluid creation'>
                    <div className='row'>
                        <Info character={this.state} />
                    </div>      
                    <div className='row'>
                        <Selection {...props} selectRace={this.selectRace} selectClass={this.selectClass} handleSubmit={this.handleSubmit} getScore={this.getScore} />
                    </div>
                    <div className='row'>
                        <Navigation {...props} navigate={this.navigate} navigationCategories={navigationCategories} navigation={navigation} />
                    </div>
                    <div className='row'>
                        <CharacterSave {...props} />
                    </div>
                </div>);
    }
}

export default CreateCharacter