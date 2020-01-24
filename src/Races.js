import React, { Component } from 'react'
//import RaceInfo from './RaceInfo'
import Selection from './Selection'
import RaceInfo from './RaceInfo'

class Races extends Component {
    constructor(props) {
        super(props);
        const url = 'http://www.dnd5eapi.co/api/'
        fetch(url + 'races')
            .then(result => result.json())
            .then(result => { this.setState({ races: result, }, this.getRaceInfo(result)) })
    }
    
    state = {
        races: {},
        racesInfo: [],
        raceSelected: {},
        raceChose: {},
        isRaceChosen: false, //if true unmount and go to character class selection (this will be altered by the navigation as well)
    }

    getRaceInfo(data) {
        let info = []
        const url = 'http://www.dnd5eapi.co'
        for (var i = 0; i < data.results.length; i++) {
            fetch(url + data.results[i].url)
            .then(result => result.json())
                .then(result => info.push(result) )
            
        }
        this.setState({racesInfo: info,})        
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

        if (races.results === undefined) {
            return (<div><p>...Loading race API</p></div>)
        } else {
            return (<div>
                <RaceInfo raceSelected={raceSelected} />
                <Selection races={races} racesInfo={racesInfo} displayRaceInfo={this.displayRaceInfo} />
            </div>)
        }
    }
} 

export default Races