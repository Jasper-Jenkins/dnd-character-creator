import React, { Component } from 'react'
import CreateCharacter from './CreateCharacter'

class App extends Component {

    state = {
        ////////
        races: {},
        racesInfo: [],
        ////////
        classes: {},
        classesInfo: [],
        ////////
        abilityScores: {},
        abilityScoresInfo: [],
        ////////
        spells: {},
        spellsInfo: [],
        ////////
        features: {},
        featuresInfo: [],
        ////////
        levelData: [],
    }

    componentDidMount() {
        const url = 'http://www.dnd5eapi.co/api/'
        fetch(url + "races")
            .then(result => result.json())
            .then(result => { this.setState({ races: result }, this.getInfo(result, 'races')) })
            .catch(e => { console.log(e + " -- " + url);})
        fetch(url + 'classes')
            .then(result => result.json())
            .then(result => { this.setState({ classes: result }, this.getInfo(result, 'classes')) })
            .catch(e => { console.log("You fucked up . Error: ", e); });
        fetch(url + 'ability-scores')
            .then(result => result.json())
            .then(result => { this.setState({ abilityScores: result }, this.getInfo(result, 'ability-scores')) })
            .catch(e => { console.log("You fucked up races. Error: ", e); });
        fetch(url + 'spells')
            .then(result => result.json())
            .then(result => { this.setState({ spells: result }, this.getInfo(result, 'spells')) })
            .catch(e => { console.log("You fucked up races. Error: ", e); });
        
        //fetch(url + 'features')
        //    .then(result => result.json())
        //    .then(result => { this.setState({ features: result }, this.getInfo(result, 'features')) });
    }
    
    getLevelData(data, currentLevel) {
        let levels = []
        const url = 'http://www.dnd5eapi.co'
        for (var i = 0; i < data.results.length; i++) {
            fetch(url + "/api/classes/" + data.results[i].index + "/levels/" + currentLevel)
                .then(result => result.json())
                .then(result => levels.push(result))
        }
        this.setState({
            levelData: levels,
        });
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
                this.setState({ racesInfo: info, });
            break;
            case 'classes':
                this.setState({ classesInfo: info, }, this.getLevelData(data, 1));
                break;
            case 'ability-scores':
                this.setState({ abilityScoresInfo: info, });
                break;
            case 'spells':
                this.setState({ spellsInfo: info, });
                break;
            //case 'features':
            //    this.setState({ featuresInfo: info, })
            //    break;
            default:
        }
    }
          
    render() {
        const { races } = this.state
        const { classes } = this.state
        const { abilityScores } = this.state
        const { spells } = this.state
        const { spellsInfo } = this.state
      //  const { features } = this.state

        const character = this.state

        if (races.results === undefined || classes.results === undefined || abilityScores.results === undefined || spells.results === undefined || spellsInfo.length === spells.count) {
            return (<div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <p>...Loading API</p>
                            </div>
                        </div>
                    </div>);
        } else {
            return (<CreateCharacter character={character} />); 
        }
    }
}

export default App