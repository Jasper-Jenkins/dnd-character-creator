import React, { Component } from 'react'
import CreateCharacter from './CreateCharacter'

export default class App extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
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
        this.state = this.initialState;
    }

    componentDidMount() {
        const url = 'https://www.dnd5eapi.co/api/'
        fetch(url + "races")
            .then(result => result.json())
            .then(result => { this.setState({ races: result }, this.getInfo(result, 'races')) })
            .catch(e => { console.log(e + " -- " + url);})
        fetch(url + 'classes')
            .then(result => result.json())
            .then(result => { this.setState({ classes: result }, this.getInfo(result, 'classes')) })
            .catch(e => { console.log("API Request Error: ", e); });
        fetch(url + 'ability-scores')
            .then(result => result.json())
            .then(result => { this.setState({ abilityScores: result }, this.getInfo(result, 'ability-scores')) })
            .catch(e => { console.log("API Request Error: ", e); });
        fetch(url + 'spells')
            .then(result => result.json())
            .then(result => { this.setState({ spells: result }, this.getInfo(result, 'spells')) })
            .catch(e => { console.log("API Request Error: ", e); });
        
        //fetch(url + 'features')
        //    .then(result => result.json())
        //    .then(result => { this.setState({ features: result }, this.getInfo(result, 'features')) });
     //   console.log("App mounted: ", this.state);
    }


    componentDidUpdate() {
        //let keys = Object.getOwnPropertyNames(this.state)
        //if (this.props.userID !== prevProps.userID) {
        //    this.fetchData(this.props.userID);
        //}
     //   console.log("App updated: ", this.state);
     //   this.readyToCreate();
    }

    getLevelData(data, currentLevel) {
        let levels = []
        const url = 'https://www.dnd5eapi.co'
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
        const url = 'https://www.dnd5eapi.co'
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
            case 'features':
                this.setState({ featuresInfo: info, })
                break;
            default:
        }
    }

    readyToCreate = () => {
        const data = this.state;
        for (var key in data) {
            switch (Object.getPrototypeOf(data[key]).constructor) {
                case Array:
                    console.log("Array");
                    break;
                case Object:
                    console.log("Object");
                    break;
                default:
                    break;
            }
            
            //console.log("KEY:", Object.getPrototypeOf(data[key]).constructor);
            //if (Object.getPrototypeOf(data[key]) === 'object') {
            //    console.log("Object: ", key)
            //}
        }
    }

          
    render() {
        const { races } = this.state;
        const { classes } = this.state;
        const { abilityScores } = this.state;
        const { spells } = this.state;
        const { spellsInfo } = this.state;
        const { features } = this.state; // be sure to change !==  to === below, once you are pulling the features data. 
        const { levelData } = this.state;
       
        if (races.results === undefined || classes.results === undefined || abilityScores.results === undefined || spells.results === undefined || spellsInfo.length === spells.count || levelData.length === 12 || features.results !== undefined) {
            return (<div className="container-fluid">
                        <div className="row">
                            <div className="col-12 text-center">
                                <p>...Loading API</p>
                            </div>
                        </div>
                    </div>);
        } else {
            return (<CreateCharacter {...this.state} />); 
        }
    }
}