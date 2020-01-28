import React, { Component } from 'react'
import Selection from './Selection'
import Info from './Info'
import Navigation from './Navigation'


const characterCategories = ['Race', 'Class', 'Ability-Scores', 'Professions']


class App extends Component {
    constructor(props) {
        super(props);
        const url = 'http://www.dnd5eapi.co/api/'
        fetch(url + 'races')
            .then(result => result.json())
            .then(result => { this.setState({ races: result, }, this.getInfo(result, 'races')) });
        fetch(url + 'classes')
            .then(result => result.json())
            .then(result => { this.setState({ classes: result, }, this.getInfo(result, 'classes')) });
        fetch(url + 'ability-scores')
            .then(result => result.json())
            .then(result => { this.setState({ abilityScores: result, }, this.getInfo(result, 'ability-scores')) });

    }

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
        classProficiencies:[],
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
        this.navigation();
    }

    
    navigation() {
        this.setState({ navigation: characterCategories[0] }) // default to race 
        this.setState({ navigationCategories: [characterCategories[0], characterCategories[1], characterCategories[2],] })
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

    selectProficiencies() {
        const { classSelected } = this.state
        //  const { classProficiencies } = this.state
       // console.log("Class selected", classSelected)
        for (var i = 0; i < classSelected.proficiencies.length; i++) {
            console.log(classSelected.proficiencies[i])
        }
    }

          
    displayRaceInfo = index => {
        const { racesInfo } = this.state
        for (let i = 0; i < racesInfo.length; i++) {
            if (racesInfo[i].index === index) {
                const RaceSelected = racesInfo.filter(function (race) { return race.name === racesInfo[i].name })
                this.setState({ raceSelected: RaceSelected[0], isRaceSelected: true })
                break;
            }
        }
    }

    displayClassInfo = index => {
        const { classesInfo } = this.state
        for (let i = 0; i < classesInfo.length; i++) {
            if (classesInfo[i].index === index) {
                const ClassSelected = classesInfo.filter(function (cClass) { return cClass.name === classesInfo[i].name })
                this.setState({ classSelected: ClassSelected[0], isClassSelected: true }, this.selectProficiencies)
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

        const { abilityScores } = this.state
       // const { abilityScoresInfo } = this.state
        const { abilityScoresSelected } = this.state

        const { navigation } = this.state
        const { navigationCategories} = this.state


        if (races.results === undefined && classes.results === undefined && abilityScores.results === undefined) {
            return (<div className="container-fluid">
                        <div className="row">
                             <div className="col-12">
                                  <p>...Loading API</p>
                             </div>
                        </div>
                    </div>);
        } else {
            switch (navigation) {
                case characterCategories[0]:
                    return (<div className="container-fluid">
                                <div className="row creation">
                                    <div className="col-12">
                                        <div className="row">
                                            <Info raceSelected={raceSelected} isRaceSelected={isRaceSelected} category='races' />
                                        </div>
                                        <div className="row">
                                    <Selection races={races} racesInfo={racesInfo} displayRaceInfo={this.displayRaceInfo} selectProficiencies={this.selectProficiencies} category='races' />
                                        </div>
                                        <div className="row">
                                            <Navigation categories={navigationCategories} navigate={this.navigate} />
                                        </div>
                                    </div>
                                </div>
                            </div>);
                case characterCategories[1]:
                    return (<div className="container-fluid">
                                <div className="row creation">
                                    <div className="col-12">
                                        <div className="row">
                                            <Info classSelected={classSelected} isClassSelected={isClassSelected} category='classes' />
                                        </div>
                                        <div className="row">
                                            <Selection classes={classes} classesInfo={classesInfo} displayClassInfo={this.displayClassInfo} category='classes' />
                                        </div>
                                        <div className="row">
                                            <Navigation categories={navigationCategories} navigate={this.navigate} />
                                        </div>
                                    </div>
                                </div>
                             </div>);
                case characterCategories[2]:
                    return (<div className="container-fluid">
                                <div className="row creation">
                                    <div className="col-12">
                                <div className="row">
                                    <Info abilityScores={abilityScores} abilityScoresSelected={abilityScoresSelected} category='ability-scores' />
                                        </div>
                                <div className="row">
                                    <Selection abilityScores={abilityScores} getScore={this.getScore} category='ability-scores' />
                                        </div>
                                        <div className="row">
                                            <Navigation categories={navigationCategories} navigate={this.navigate} />
                                        </div>
                                    </div>
                                </div>
                            </div>);
               default:

            }
        }
    }
}

export default App
