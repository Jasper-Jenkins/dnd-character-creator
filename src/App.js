import React, { Component } from 'react'
import Selection from './Selection'
import Info from './Info'
import Navigation from './Navigation'

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
        ///////
        isRaceSelected: false,
        isClassSelected: false,
        isRaceChosen: false,
        isClassChosen: false,
    }

    componentDidMount() {
        this.navigation();
    }

    navigation() {
        this.setState({ navigation: 'characterRace' })
        this.setState({ navigationCategories: ['characterRace','characterClass']})
    }

    navigate = (category) => {
        this.setState({ navigation: category })
    }

    getInfo(data, category) {
        let info = []
        const url = 'http://www.dnd5eapi.co'
        switch(category) {
            case 'races':
                for (var i = 0; i < data.results.length; i++) {
                    fetch(url + data.results[i].url)
                        .then(result => result.json())
                        .then(result => info.push(result))
                }
                this.setState({ racesInfo: info, })
            break;
            case 'classes':
                for (var j = 0; j < data.results.length; j++) {
                    fetch(url + data.results[j].url)
                        .then(result => result.json())
                        .then(result => info.push(result))
                }
                this.setState({ classesInfo: info, })
            break;
            default:
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
                this.setState({ classSelected: ClassSelected[0], isClassSelected: true })
                break;
            }
        }
    }


    displayInfo



    render() {
        const { races } = this.state
        const { racesInfo } = this.state
        const { raceSelected } = this.state
        const { isRaceSelected } = this.state


        const { classes } = this.state
        const { classesInfo } = this.state
        const { classSelected } = this.state
        const { isClassSelected } = this.state      


        const { navigation } = this.state
        const { navigationCategories} = this.state

        
        if (races.results === undefined) {
            return (<div className="row">
                <div className="col">
                    <p>...Loading race API</p>
                </div>
            </div>);
        } else {
            switch (navigation) {
                case 'characterRace':
                    return (<div className="row">
                        <div className="col creation">
                            <Info raceSelected={raceSelected} isRaceSelected={isRaceSelected} category='races' />
                            <Selection races={races} racesInfo={racesInfo} displayRaceInfo={this.displayRaceInfo} category='races' />
                            <Navigation categories={navigationCategories} navigate={this.navigate} />
                        </div>
                    </div>);
                case 'characterClass':
                    return (<div className="row">
                        <div className="col creation">
                            <Info classSelected={classSelected} isClassSelected={isClassSelected} category='classes' />
                            <Selection classes={classes} classesInfo={classesInfo} displayClassInfo={this.displayClassInfo} category='classes' />
                            <Navigation categories={navigationCategories} navigate={this.navigate} />
                        </div>
                    </div>);
               default:

            }
        }
    }
}

export default App
