import React, { Component } from 'react'
import CreateCharacter from './CreateCharacter'

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
      //  this.state = this.initialState;
        this.readyToCreate = this.readyToCreate.bind(this);
    }

    componentDidMount() {
        const url = 'https://www.dnd5eapi.co/api/'

        fetch(url + "races")
            .then(result => result.json())
            .then(result => { this.setState({ races: result, }) })    
            .then(result => { this.getInfo(result, 'races') })
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
     // this.readyToCreate();

        this.readyToCreate();
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
                this.setState({ classesInfo: info, });
                this.getLevelData(data, 1);
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
        let cat = category;
     //   console.log("Cat..", category, this.state)

    }

    readyToCreate() {
        const { races } = this.state;
        const { racesInfo } = this.state;
        //const { classesInfo } = this.state;
        //const { abilityScoresInfo } = this.state;
        //const { spellsInfo } = this.state;
        //let count = 0;
        //let ready = false;
        //let checkLength = 0;
        //console.log("Info Length", racesInfo, "race count ", races)
       // console.log("Updated ", this.state);
        if (racesInfo.length > 0) {
            console.log("racesInfo", racesInfo);            
        }
        //switch (category) {
        //    case 'races':
        //        console.log("Info Length", racesInfo, "race count ", races)
        //        if (racesInfo.length === races.count) {
        //            console.log("Yup");
        //        }
        //        break;
        //    case 'classes':               
        //        break;
        //    case 'ability-scores':                
        //        break;
        //    case 'spells':               
        //        break;
        //    case 'features':
               
        //        break;
        //    default:
        //}
        //console.log("Category", category)
        //for (var key in characterInfo) {
        //    switch (Object.getPrototypeOf(characterInfo[key]).constructor) {
        //        case Array:
        //            console.log("Key ", key, " ", characterInfo[key], " category ", category, " ", characterInfo[category]);                  
        //            if (key === 'racesInfo') {
        //                if (characterInfo[key].length === characterInfo[category].count) {
        //                //    count++;
                            
        //                    console.log("ReadyToCreate() info", characterInfo[key]);
        //                }
        //            }
        //           // let length = characterInfo[key].length;
        //          //  console.log("Array", key, " : ", length);
                    
        //            break;
        //        case Object:
        //          //  console.log("Object", key, " : ", characterInfo[key]);
        //            //if (key === 'races' && key.count > 0) {
        //            //    checkLength = key.count;
        //            //    count++;
        //            //    console.log("ReadytoCreate() ", characterInfo[key]);
        //            //}
        //            count++;
        //            break;
        //        default:
        //            console.log("BROKEN IN readyToCreate()");
        //            break;
        //    }
            
            //console.log("KEY:", Object.getPrototypeOf(characterInfo[key]).constructor);
            //if (Object.getPrototypeOf(characterInfo[key]) === 'object') {
            //    console.log("Object: ", key)
            //}
        //}
       
       // console.log("Total elements in App state: ", count);
       // return ready;
    }

          
    render() {
        const { races } = this.state;
        const { classes } = this.state;
        const { abilityScores } = this.state;
        const { spells } = this.state;
        const { spellsInfo } = this.state;
        const { features } = this.state; // be sure to change !==  to === below, once you are pulling the features data. 
        const { levelData } = this.state;
        //if (this.readyToCreate()) {
        //    return (<div className="container-fluid">
        //        <div className="row">
        //            <div className="col-12 text-center">
        //                <p>...Loading API</p>
        //            </div>
        //        </div>
        //    </div>);
        //} else {
        //    return (<CreateCharacter {...this.state} />);
        //}
        //this.readyToCreate();
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