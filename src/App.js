import React, { Component } from 'react'
import Create from './Create'
//import CharacterClass from './CharacterClass'

const characterCategories = ['Race', 'Class', 'Ability-Scores', 'Proficiencies']


class App extends Component {

    state = {
        navigation: '',
        navigationCategories: [],
        //////
        races: {},
        racesInfo: [],
        raceSelected: {},
        raceChosen: {},
        //////
        classes: {},
        classesInfo: [],
        classSelected: {},
        classChosen: {}, 
        classProficiencies: [],
        classProficienciesChoices: [],
       
        ///////
        abilityScores: {},
        abilityScoresInfo: [],
        abilityScoresSelected: {},
        abilityScoresChosen: [],

        ///////
        isRaceSelected: false,
        isClassSelected: false,
        isRaceChosen: false,
        isClassChosen: false,
        isAbilityScoresSelected: false,
        isAbilityScoresChosen: false,
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
        this.setNavigation();
    }

    
    setNavigation() {
        this.setState({ navigation: characterCategories[0] }) // default to race 
        this.setState({ navigationCategories: characterCategories })
    }

    navigate = (category) => {
        this.setState({ navigation: category })
    }

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
        const { abilityScores } = this.state
        const { abilityScoresSelected } = this.state
        let scores = abilityScoresSelected
        let noZeroes = []
        for (var i = 0; i < abilities.length; i++) {
            if (abilities[i].value < 3 || abilities[i].value > 18) {
                noZeroes.push(abilities[i].name);
            } else {
                for (var j = 0; j < abilityScores.count; j++) {
                        scores[abilities[j].name] = parseInt(abilities[j].value, 10)
                        this.setState({ abilityScoresSelected: scores })
                        console.log(scores[abilities[j].name])                                            
                }
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

    //setScore = (key, abilities) => {
    //    const { abilityScores } = this.state
    //    const { abilityScoresSelected } = this.state
    //    let scores = abilityScoresSelected
       
    //    //if reused for leveling up character need to add a level check so it can go above 18

    //   // console.log('no Zeroes', noZeroes.length)
    //    if (abilities[key] < 3 || abilities[key] > 18) {
    //        //console.log('Not a proper value')
    //        noZeroes.push(key);
    //    } else {
    //        for (var i = 0; i < abilityScores.count; i++) {
    //            if (abilityScores.results[i].index === key) {
    //                scores[key] = parseInt(abilities[key], 10)
    //                this.setState({ abilityScoresSelected: scores })
    //                console.log(scores[key])
    //                break;
    //            }
    //        }
    //    }       
    //}

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

    setStartingProficiencies(chosenClass) {
        const proficiencies = JSON.parse(JSON.stringify(chosenClass.proficiencies))
        const proficienciesChoices = JSON.parse(JSON.stringify(chosenClass.proficiency_choices))
                          
        this.setState({ classProficiencies: proficiencies, classProficienciesChoices: proficienciesChoices, });
        } 


    addProficiency = (proficiencyName, choiceArrayIndex) => {

        const { classProficienciesChoices } = this.state
        const { classSelected } = this.state

        const choiceArray = [...classProficienciesChoices]

        for (var i = 0; i < choiceArray[choiceArrayIndex].from.length; i++) {
            if (choiceArray[choiceArrayIndex].from.length === (classSelected.proficiency_choices[choiceArrayIndex].from.length - choiceArray[choiceArrayIndex].choose)) {
                alert('no more available!')
                break;
            } else {
                if (choiceArray[choiceArrayIndex].from[i].name === proficiencyName) {

                    const newChoices = choiceArray[choiceArrayIndex].from.filter(function (proficiency) { return proficiency.name !== proficiencyName })
                    let newProficiency = choiceArray[choiceArrayIndex].from.filter(function (proficiency) { return proficiency.name === proficiencyName })

                    newProficiency[0]['index'] = choiceArrayIndex; //added for a check in the classProficiencies component for the removeProficiency() 

                    choiceArray[choiceArrayIndex].from = [...newChoices]

                    this.setState(state => ({
                        classProficiencies: [...state.classProficiencies, newProficiency[0]],
                        classProficienicesChoices: choiceArray,
                    }))
                    break;
                }
            }
        }
    }

    removeProficiency = (proficiencyName, choicesIndex) => {

        const { classProficiencies } = this.state
        const { classProficienciesChoices } = this.state
        const { classSelected } = this.state

        let proficiencies = [...classProficiencies]
        let proficienciesChoices = [...classProficienciesChoices]
        let choices = JSON.parse(JSON.stringify(classSelected.proficiency_choices));

        for (var i = 0; i < classProficiencies.length; i++) {
            if (proficiencies[i].name === proficiencyName) {
                let newProficiencies = proficiencies.filter(function (proficiency) { return proficiency.name !== proficiencyName })
                let newChoice = choices[choicesIndex].from.filter(function (proficiency) { return proficiency.name === proficiencyName })

                console.log(newChoice)

                proficienciesChoices[choicesIndex].from = [...proficienciesChoices[choicesIndex].from, newChoice[0]]

                this.setState({
                    classProficiencies: [...newProficiencies],
                    classProficienicesChoices: proficienciesChoices,
                });
                break;
            }
        }
    }
             
    displayRaceInfo = index => {
        const { racesInfo } = this.state
        for (let i = 0; i < racesInfo.length; i++) {
            if (racesInfo[i].index === index) {
                const RaceSelected = racesInfo.filter(function (race) { return race.name === racesInfo[i].name });
                this.setState({ raceSelected: RaceSelected[0], isRaceSelected: true });
                break;
            }
        }
    }

    displayClassInfo = index => {
        const { classesInfo } = this.state
        for (let i = 0; i < classesInfo.length; i++) {
            if (classesInfo[i].index === index) {
                const selectedClass = classesInfo.filter(function (cClass) { return cClass.name === classesInfo[i].name })
                this.setState({ classSelected: selectedClass[0], isClassSelected: true }, this.setStartingProficiencies(selectedClass[0]),)
                break;
            }
        }
    }
          
    render() {
        const { races } = this.state
        const { racesInfo } = this.state
        const { raceSelected } = this.state
        const { isRaceSelected } = this.state
        
        const { classes } = this.state
        const { classesInfo } = this.state
        const { classSelected } = this.state
        const { isClassSelected } = this.state
        const { classProficiencies } = this.state
        const { classProficienciesChoices } = this.state
        
        const { abilityScores } = this.state
        const { abilityScoresSelected } = this.state

        const { navigation } = this.state
        const { navigationCategories} = this.state

        if (races.results === undefined || classes.results === undefined || abilityScores.results === undefined) {
            return (<div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <p>...Loading API</p>
                    </div>
                </div>
            </div>);
        } else {
            //if (navigation === characterCategories[0]) { //Race
            //    return (<Create raceSelected={raceSelected} isRaceSelected={isRaceSelected} category='races' races={races} racesInfo={racesInfo} displayRaceInfo={this.displayRaceInfo} navigationCategories={navigationCategories} navigate={this.navigate} navigation={navigation} />);
            //} else if (navigation === characterCategories[1]) { //Class
            //    return (<Create classes={classes} classesInfo={classesInfo} displayClassInfo={this.displayClassInfo} classSelected={classSelected} isClassSelected={isClassSelected} category='classes' classProficiencies={classProficiencies} classProficienciesChoices={classProficienciesChoices} navigationCategories={navigationCategories} navigate={this.navigate} navigation={navigation} addProficiency={this.addProficiency} removeProficiency={this.removeProficiency} />);
            //} else if (navigation === characterCategories[2]) { //Ability-Scores
            //    return (<Create abilityScores={abilityScores} abilityScoresSelected={abilityScoresSelected} category='ability-scores' getScore={this.getScore} navigationCategories={navigationCategories} navigate={this.navigate} navigation={navigation} handleSubmit={this.handleSubmit} />);
            //} else if (navigation === characterCategories[3]) { //Proficiencies
            //    // eslint-disable-next-line
            //    return (<Create classSelected={classSelected} isClassSelected={isClassSelected} category='classes' classProficiencies={classProficiencies} classProficienciesChoices={classProficienciesChoices} category='proficiencies' navigationCategories={navigationCategories} navigate={this.navigate} navigation={navigation} addProficiency={this.addProficiency} removeProficiency={this.removeProficiency} navigate={this.navigate} navigation={navigation} />);
           // }
            switch (navigation) {
                case characterCategories[0]: //Race
                    return (<Create raceSelected={raceSelected} isRaceSelected={isRaceSelected} category='races' races={races} racesInfo={racesInfo} displayRaceInfo={this.displayRaceInfo} navigationCategories={navigationCategories} navigate={this.navigate} navigation={navigation} />);
                case characterCategories[1]: //Class
                    return (<Create classes={classes} classesInfo={classesInfo} displayClassInfo={this.displayClassInfo} classSelected={classSelected} isClassSelected={isClassSelected} category='classes' classProficiencies={classProficiencies} classProficienciesChoices={classProficienciesChoices} navigationCategories={navigationCategories} navigate={this.navigate} navigation={navigation} addProficiency={this.addProficiency} removeProficiency={this.removeProficiency} />);
                case characterCategories[2]: //Ability-Scores
                    return (<Create abilityScores={abilityScores} abilityScoresSelected={abilityScoresSelected} category='ability-scores' getScore={this.getScore} navigationCategories={navigationCategories} navigate={this.navigate} navigation={navigation} handleSubmit={this.handleSubmit}/>);
                case characterCategories[3]: //Proficiencies
                    //   eslint-disable-next-line
                    return (<Create classSelected={classSelected} isClassSelected={isClassSelected} classProficiencies={classProficiencies} classProficienciesChoices={classProficienciesChoices} category='proficiencies' navigationCategories={navigationCategories} navigate={this.navigate} navigation={navigation} addProficiency={this.addProficiency} removeProficiency={this.removeProficiency}  navigate={this.navigate} navigation={navigation} />);

                default:
            }
        }
    }
}

export default App