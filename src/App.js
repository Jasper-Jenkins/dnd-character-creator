import React, { Component, useEffect } from 'react'
import CreateCharacter from './CreateCharacter'
import isSelected from './helper/helper-functions'
import isArrayEmpty from './helper/helper-array'


export default class App extends Component { 
    constructor(props) {
        super(props);
        this.state = {           
            races: {},
            racesInfo: new Array(0),           
            classes: {},
            classesInfo: new Array(0),
            abilityScores: {},
            abilityScoresInfo: [],
            spells: {},
            spellsInfo: [],
            features: {},
            featuresInfo: [],
            levelData: [],
            ready: false,
        }
      //  this.state = this.initialState;
      //  this.readyToCreate = this.readyToCreate.bind(this);
        this.getInfo = this.getInfo.bind(this);
        this.getLevelData = this.getLevelData.bind(this);
     //   this.getStuff = this.getStuff.bind(this);
    }

    componentDidMount() {
        const url = 'https://www.dnd5eapi.co/api/'
        const promise = this.getCharacterInformation(url);
        promise.then((data) => {
            this.getCharacterData(data.races, data.classes, data.abilityScores, data.spells, data.features)
        console.log(data)})
    }
     

    getCharacterInformation(url) {
      return Promise.all([this.getRaces(url),
            this.getClasses(url),
            this.getAbilityScores(url),
            this.getSpells(url),
            this.getFeatures(url),]).then(([races, classes, abilityScores, spells, features]) => {              
                return {races, classes, abilityScores, spells, features}
            });
    }


    getCharacterData(races, classes, abilityScores, spells, features) {
        Promise.all([this.getInfo(races, 'races'),
            this.getInfo(classes, 'classes'),
            this.getLevelData(classes, 1),
            this.getInfo(abilityScores, 'ability-scores'),
            this.getInfo(spells, 'spells'),
            this.getInfo(features, 'features'),
        ]).then(() => { this.setState({ ready: true, }) })
       
    }

    getRaces(url) {        
       return fetch(url + "races")
            .then(result => result.json())
            .then(result => { this.setState({ races: result, }, ); return result })          
            .catch(e => { console.log(e + " -- " + url); });        
    }

    getClasses(url) {
       return fetch(url + 'classes')
            .then(result => result.json())
            .then(result => { this.setState({ classes: result, }, ); return result })            
            .catch(e => { console.log("API Request Error: ", e); });
    }

    getAbilityScores(url) {
      return fetch(url + 'ability-scores')
            .then(result => result.json())
            .then(result => { this.setState({ abilityScores: result, }, ); return result })
            .catch(e => { console.log("API Request Error: ", e); });
    }

    getSpells(url) {
      return fetch(url + 'spells')
            .then(result => result.json())
            .then(result => { this.setState({ spells: result, }, ); return result })
            .catch(e => { console.log("API Request Error: ", e); });
    }

    getFeatures(url) {      
       return fetch(url + 'features')
            .then(result => result.json())
            .then(result => { this.setState({ features: result }, ); return result  })
            .catch(e => { console.log("API Request Error: ", e); });
    }

    getLevelData(data, currentLevel) {       
        let levels = []
        const url = 'https://www.dnd5eapi.co'
        for (var i = 0; i < data.results.length; i++) {
           Promise.resolve(fetch(url + "/api/classes/" + data.results[i].index + "/levels/" + currentLevel))
                .then(result => result.json())
                .then(result => { levels.push(result) })            
        }
        console.log("Level data", levels)
        this.setState({
            levelData: levels,
        });
    }

    getInfo(data, category) {
        let info = []
    // console.log("getInfo() data coming in: ", data, category);
        const url = 'https://www.dnd5eapi.co'
        for (var i = 0; i < data.results.length; i++) {
            Promise.resolve(fetch(url + data.results[i].url))
                .then(result => result.json())
                .then(result => { info.push(result) })
        }
        console.log(info);
    // console.log("getInfo() info being set: ", info, category);
        switch(category) {
            case 'races':
                this.setState({ racesInfo: info, });
                break;
            case 'classes':
                this.setState({ classesInfo: info, },);  
                break;
            case 'ability-scores':
                this.setState({ abilityScoresInfo: info, });
                break;
            case 'spells':
                this.setState({ spellsInfo: info, });
                break;
            case 'features':
                console.log("reatures", info)
                this.setState({ featuresInfo: info, })
                break;
            default:
        }
    // let cat = category;
    // console.log("Cat..", category, this.state)
    // this.readyToCreate();
    }
    
    readyToCreate(data) {
        //const characterInfo = data;
        let check = true;
        console.log(data);
        const characterInfo = this.state;
        console.log("CharacterInfo ", characterInfo);
        

        for (var key in data) {
            switch (Object.getPrototypeOf(data[key]).constructor) {
                case Array:
                    isArrayEmpty(data[key])
                    if (data[key].length === 0) {
                  // console.log("Array setting ready to false ", key);
                  // check = false;
                    }
                    break;
                case Object:
                    if (!isSelected(data[key])) {
                  // console.log("Object setting ready to false ", key);
                        check = false;
                    }
                    break;
                default:
                    break;
            }
            if (!check) {
                break;
            }
        }
        return check;
    }
          
    render() {
        const { ready } = this.state;
              
        if (!ready) {
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
// races.results === undefined || classes.results === undefined || abilityScores.results === undefined || spells.results === undefined || spellsInfo.length === spells.count || levelData.length === 12 || features.results === undefined