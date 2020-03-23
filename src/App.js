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

        ///////
        abilityScores: {},
        abilityScoresInfo: [],
        //abilityScoresSelected: {},
        //abilityScoresChosen: [],

        ////////
        spells: {},
        spellsInfo: [],
        //spellsSelected: [],
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
            case 'spells':
                this.setState({ spellsInfo: info })
                break;
            default:
        }
    }
          
    render() {
        const { races } = this.state
        const { classes } = this.state
        const { abilityScores } = this.state
        const { spells } = this.state

        const character = this.state

        if (races.results === undefined || classes.results === undefined || abilityScores.results === undefined || spells.count === undefined) {
            return (<div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <p>...Loading API</p>
                    </div>
                </div>
            </div>);
        } else {
//            return (<CreateCharacter {...character} />);//why cant I add to the initialState of <CharacterCreate /> when I use spread?  

            return (<CreateCharacter character={character} />);//why cant I add to the initialState of <CharacterCreate /> when I use spread?  

        }
    }
}

export default App