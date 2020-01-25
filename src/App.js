import React, { Component } from 'react'
import Selection from './Selection'
import RaceInfo from './RaceInfo'
import Navigation from './Navigation'

class App extends Component {
    constructor(props) {
        super(props);
        const url = 'http://www.dnd5eapi.co/api/'
        fetch(url + 'races')
            .then(result => result.json())
            .then(result => { this.setState({ races: result, }, this.getRaceInfo(result)) });
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


    getRaceInfo(data) {
        let info = []
        const url = 'http://www.dnd5eapi.co'
        for (var i = 0; i < data.results.length; i++) {
            fetch(url + data.results[i].url)
                .then(result => result.json())
                .then(result => info.push(result))

        }
        this.setState({ racesInfo: info, })
    }

    displayRaceInfo = index => {
        const { racesInfo } = this.state
        for (let i = 0; i < racesInfo.length; i++) {
            if (racesInfo[i].index === index) {
                const RaceSelected = racesInfo.filter(function (race) { return race.name === racesInfo[i].name })
                this.setState({ raceSelected: RaceSelected[0], })
                break;
            }
        }
    }

    render() {
        const { races } = this.state
        const { racesInfo } = this.state
        const { raceSelected } = this.state
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
                            <RaceInfo raceSelected={raceSelected} />
                            <Selection races={races} racesInfo={racesInfo} displayRaceInfo={this.displayRaceInfo} />
                            <Navigation categories={navigationCategories} navigate={this.navigate} />
                        </div>
                    </div>);
                case 'characterClass':
                    return (<div className="row">
                        <div className="col creation">
                            <Navigation categories={navigationCategories} navigate={this.navigate} />
                        </div>
                    </div>);
               default:

            }
        }
    }
}

export default App
