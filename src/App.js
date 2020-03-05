import React, { Component } from 'react'
//import { Button, StyleSheet, View } from 'react-native'
import CreateCharacter from './CreateCharacter'
//import CharacterClass from './CharacterClass'

class App extends Component {

    state = {
        //navigation: '',
        //navigationCategories: [],
        //////
        races: {},
        racesInfo: [],
        //raceSelected: {},
        //raceChosen: {},
        ////////
        classes: {},
        classesInfo: [],
        //classSelected: {},
        //classChosen: {}, 
        classProficiencies: [],
        classProficienciesChoices: [],
       
        ///////
        abilityScores: {},
        abilityScoresInfo: [],
        //abilityScoresSelected: {},
        //abilityScoresChosen: [],

        ////////
        spells: {},
        spellsInfo: [],
        //spellsSelected: [],


        ///////
      
    }

    componentDidMount() {
        const url = 'http://www.dnd5eapi.co/api/'
        fetch(url + 'races')
            .then(result => result.json())
            .then(result => { this.setState({ races: result }, this.getInfo(result, 'races')) });
        fetch(url + 'classes')
            .then(result => result.json())
            .then(result => { this.setState({ classes: result }, this.getInfo(result, 'classes')) });
        fetch(url + 'ability-scores')
            .then(result => result.json())
            .then(result => { this.setState({ abilityScores: result }, this.getInfo(result, 'ability-scores')) });
        fetch(url + 'spells')
            .then(result => result.json())
            .then(result => { this.setState({ spells: result }, this.getInfo(result, 'spells')) });
    //    this.setNavigation();
    }
    
    //setNavigation() {
    //    this.setState({ navigation: characterCategories[0] }) // default to race 
    //    this.setState({ navigationCategories: characterCategories })
    //}

    //navigate = (category) => {
    //    this.setState({ navigation: category })
    //}

    getInfo(data, category) {
        let info = []
        const url = 'http://www.dnd5eapi.co'
        for (var i = 0; i < data.results.length; i++) {
            fetch(url + data.results[i].url)
                .then(result => result.json())
                .then(result => info.push(result))
        }
        switch(category) {
            case 'races':
                this.setState({ racesInfo: info, })
            break;
            case 'classes':
                this.setState({ classesInfo: info, })
                break;
            case 'ability-scores':
                this.setState({ abilityScoresInfo: info, })
                let abilityScoresSetup = {}
                for (var j = 0; j < data.count; j++) {
                    let ability = data.results[j].index;
                    abilityScoresSetup[ability] = 0;
                }
                this.setState({ abilityScoresSelected: abilityScoresSetup });
                break;
            case 'spells':
                this.setState({ spellsInfo: info })
                break;
            default:
        }
    }

    getScore = ability => {

        const { abilityScores } = this.state
        const { abilityScoresSelected } = this.state
        let scores = abilityScoresSelected

        for (var i = 0; i < abilityScores.count; i++) {
            if (abilityScores.results[i].index === ability) {
                scores[ability] = this.randomDSix()
                this.setState({abilityScoresSelected: scores})
          //      console.log(scores[ability])
                break;
            }
        }
    }
    
    handleSubmit = (abilities) => {
        const { abilityScoresSelected } = this.state
        let scores = abilityScoresSelected
        let noZeroes = []
        for (var i = 0; i < abilities.length; i++) {
            if (abilities[i].value < 3 || abilities[i].value > 18 ) { //needs better validation
                noZeroes.push(abilities[i].name);
            } else {
                scores[abilities[i].name] = parseInt(abilities[i].value, 10)
                this.setState({ abilityScoresSelected: scores })
            }
        }
        if (noZeroes.length > 0) {
            let zeroesAlert = "Ability Scores must not be 0, you currently have 0 in: ";
            for (var k = 0; k < noZeroes.length; k++) {
                if (k < noZeroes.length-1) {
                    zeroesAlert += noZeroes[k] + ", ";
                } else {
                    zeroesAlert += noZeroes[k];
                }
            }
            zeroesAlert += "."
            alert(zeroesAlert)
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

    //setStartingProficiencies = (chosenClass) => {
    //    const proficiencies = JSON.parse(JSON.stringify(chosenClass.proficiencies))
    //    const proficienciesChoices = JSON.parse(JSON.stringify(chosenClass.proficiency_choices))
                          
    //    this.setState({ classProficiencies: proficiencies, classProficienciesChoices: proficienciesChoices, });
    //} 
    
    //displayRaceInfo = (index) => {
    //    const { racesInfo } = this.state
    //    for (let i = 0; i < racesInfo.length; i++) {
    //        if (racesInfo[i].index === index) {
    //            const RaceSelected = racesInfo.filter(function (race) { return race.name === racesInfo[i].name });
    //            this.setState({ raceSelected: RaceSelected[0], isRaceSelected: true });
    //            break;
    //        }
    //    }
    //}

    //displayClassInfo = (index) => {
    //    const { classesInfo } = this.state
    //    for (let i = 0; i < classesInfo.length; i++) {
    //        if (classesInfo[i].index === index) {
    //            const selectedClass = classesInfo.filter(function (cClass) { return cClass.name === classesInfo[i].name })
    //            this.setState({ classSelected: selectedClass[0], isClassSelected: true }, this.setStartingProficiencies(selectedClass[0]),)
    //            break;
    //        }
    //    }
    //}
          
    render() {
        const { races } = this.state
        const { classes } = this.state
        const { abilityScores } = this.state
        const { spells } = this.state

        if (races.results === undefined || classes.results === undefined || abilityScores.results === undefined || spells.count === undefined) {
            return (<div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <p>...Loading API</p>
                    </div>
                </div>
            </div>);
        } else {
            return (<CreateCharacter characterClass={this.state} />);
        }
    }
}

export default App