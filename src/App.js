import React, { Component } from 'react'
import CreateCharacter from './CreateCharacter'

//export default class App extends Component { 
//    constructor(props) {
//        super(props);
//        this.state = {           
//            races: {},
//            racesInfo: new Array(0),           
//            classes: {},
//            classesInfo: new Array(0),
//            abilityScores: {},
//            abilityScoresInfo: [],
//            spells: {},
//            spellsInfo: [],
//            features: {},
//            featuresInfo: [],
//            levelData: [],
//            ready: false,
//            enter: false,
//        }
//      //  this.state = this.initialState;
//      //  this.readyToCreate = this.readyToCreate.bind(this);
//        this.getInfo = this.getInfo.bind(this);
//        this.getLevelData = this.getLevelData.bind(this);
//        //   this.getStuff = this.getStuff.bind(this);
//        this.chooseYourChampion = this.chooseYourChampion.bind(this);
//    }

//    componentDidMount() {
//        const url = 'https://www.dnd5eapi.co/api/'
//        const promise = this.getCharacterInformation(url);
//        promise.then((data) => {
//            this.getCharacterData(data.races, data.classes, data.abilityScores, data.spells, data.features)
//        });
//    }
     

//    getCharacterInformation(url) {
//      return Promise.all([this.getRaces(url),
//            this.getClasses(url),
//            this.getAbilityScores(url),
//            this.getSpells(url),
//            this.getFeatures(url),]).then(([races, classes, abilityScores, spells, features]) => {              
//                return {races, classes, abilityScores, spells, features}
//            });
//    }


//    getCharacterData(races, classes, abilityScores, spells, features) {
//        Promise.all([this.getInfo(races, 'races'),
//            this.getInfo(classes, 'classes'),
//            this.getLevelData(classes, 1),
//            this.getInfo(abilityScores, 'ability-scores'),
//            this.getInfo(spells, 'spells'),
//            this.getInfo(features, 'features'),
//        ]).then(() => { this.setState({ enter: true, }) })
       
//    }

//    getRaces(url) {        
//       return fetch(url + "races")
//            .then(result => result.json())
//            .then(result => { this.setState({ races: result, }, ); return result })          
//            .catch(e => { console.log(e + " -- getRaces() -- " + url); });        
//    }

//    getClasses(url) {
//       return fetch(url + 'classes')
//            .then(result => result.json())
//            .then(result => { this.setState({ classes: result, }, ); return result })            
//           .catch(e => { console.log(e + " -- getClasses() -- " + url); });
//    }

//    getAbilityScores(url) {
//      return fetch(url + 'ability-scores')
//            .then(result => result.json())
//            .then(result => { this.setState({ abilityScores: result, }, ); return result })
//          .catch(e => { console.log(e + " -- getAbilityScores() -- " + url); });
//    }

//    getSpells(url) {
//      return fetch(url + 'spells')
//            .then(result => result.json())
//            .then(result => { this.setState({ spells: result, }, ); return result })
//          .catch(e => { console.log(e + " -- getSpells() -- " + url); });
//    }

//    getFeatures(url) {      
//       return fetch(url + 'features')
//            .then(result => result.json())
//            .then(result => { this.setState({ features: result }, ); return result  })
//           .catch(e => { console.log(e + " -- getFeatures() -- " + url); });
//    }

//    getLevelData(data, currentLevel) {       
//        let levels = []
//        const url = 'https://www.dnd5eapi.co'
//        for (var i = 0; i < data.results.length; i++) {
//            Promise.resolve(fetch(url + "/api/classes/" + data.results[i].index + "/levels/" + currentLevel))
//                .then(result => result.json())
//                .then(result => { levels.push(result) });            
//        }        
//        this.setState({
//            levelData: levels,
//        });
//    }

//    getInfo(data, category) {
//        let info = []    
//        const url = 'https://www.dnd5eapi.co'
//        for (var i = 0; i < data.results.length; i++) {
//            Promise.resolve(fetch(url + data.results[i].url))
//                .then(result => result.json())
//                .then(result => { info.push(result) });
//        }
//       // console.log(info);   
//        switch(category) {
//            case 'races':
//                this.setState({ racesInfo: info, });
//                break;
//            case 'classes':
//                this.setState({ classesInfo: info, },);  
//                break;
//            case 'ability-scores':
//                this.setState({ abilityScoresInfo: info, });
//                break;
//            case 'spells':
//                this.setState({ spellsInfo: info, });
//                break;
//            case 'features':                
//                this.setState({ featuresInfo: info, });
//                break;
//            default:
//        }
//    }

//    //handleClick() {
//    //    this.setState(state => ({
//    //        isToggleOn: !state.isToggleOn
//    //    }));
//    //}


//    chooseYourChampion = () => {
//        this.setState(state => ({
//            ready: !state.ready,
//        }));
//    }
    
//    render() {
//        const { ready } = this.state;
              
//        if (!ready) {
//            return (<div className="container-fluid">
//                <div className="row">
//                    <div className="col-12 text-center">
//                        <h1>Welcome</h1>
//                        {this.state.enter ? <button onClick={this.chooseYourChampion} className='btn btn-lg btn-primary'>Begin your journey!</button> : <p>...Loading API</p> }                       
//                    </div>
//                </div>
//            </div>);  
//        } else {
//            return (<CreateCharacter {...this.state} />);                   
//        }
//    }
//}



export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            races: {},
            racesInfo: [],
            classes: {},
            classesInfo: [],
           
            features: {},
            featuresInfo: [],
           
            ready: false,
            enter: false,
            setRaces: this.setRaces,
            setRacesInfo: this.setRacesInfo,
            setClasses: this.setClasses, 
            setClassesInfo: this.setClassesInfo,
          
        }
        //  this.state = this.initialState;
        //  this.readyToCreate = this.readyToCreate.bind(this);
        this.getInfo = this.getInfo.bind(this);
       // this.getLevelData = this.getLevelData.bind(this);
        //   this.getStuff = this.getStuff.bind(this);
        this.chooseYourChampion = this.chooseYourChampion.bind(this);
    }

    componentDidMount() {
       // const url = 'https://www.dnd5eapi.co/api/'
        //const promise = this.getCharacterInformation(url);
        //promise.then((data) => {
        //    this.getCharacterData(data.classes, data.abilityScores, data.spells, data.features)
        //});
        this.setState({ enter: true,})
    }


    getCharacterInformation(url) {
        return Promise.all([
        this.getClasses(url),
        this.getAbilityScores(url),
        this.getSpells(url),
        this.getFeatures(url),]).then(([abilityScores, spells, features]) => {
            return { abilityScores, spells, features }
        });
    }


    getCharacterData(classes, abilityScores, spells, features) {
        Promise.all([       
        this.getLevelData(classes, 1),
        this.getInfo(abilityScores, 'ability-scores'),
        this.getInfo(spells, 'spells'),
        this.getInfo(features, 'features'),
        ]).then(() => { this.setState({ enter: true, }) })

    }

   

    getAbilityScores(url) {
        return fetch(url + 'ability-scores')
            .then(result => result.json())
            .then(result => { this.setState({ abilityScores: result, },); return result })
            .catch(e => { console.log(e + " -- getAbilityScores() -- " + url); });
    }

    getSpells(url) {
        return fetch(url + 'spells')
            .then(result => result.json())
            .then(result => { this.setState({ spells: result, },); return result })
            .catch(e => { console.log(e + " -- getSpells() -- " + url); });
    }

    getFeatures(url) {
        return fetch(url + 'features')
            .then(result => result.json())
            .then(result => { this.setState({ features: result },); return result })
            .catch(e => { console.log(e + " -- getFeatures() -- " + url); });
    }

    //getLevelData(data, currentLevel) {
    //    let levels = []
    //    const url = 'https://www.dnd5eapi.co'
    //    for (var i = 0; i < data.results.length; i++) {
    //        Promise.resolve(fetch(url + "/api/classes/" + data.results[i].index + "/levels/" + currentLevel))
    //            .then(result => result.json())
    //            .then(result => { levels.push(result) });
    //    }
    //    this.setState({
    //        levelData: levels,
    //    });
    //}

    getInfo(data, category) {
        let info = []
        const url = 'https://www.dnd5eapi.co'
        for (var i = 0; i < data.results.length; i++) {
            Promise.resolve(fetch(url + data.results[i].url))
                .then(result => result.json())
                .then(result => { info.push(result) });
        }
        // console.log(info);   
        switch (category) {
            //case 'races':
            //    this.setState({ racesInfo: info, });
            //    break;
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
                this.setState({ featuresInfo: info, });
                break;
            default:
        }
    }

    //handleClick() {
    //    this.setState(state => ({
    //        isToggleOn: !state.isToggleOn
    //    }));
    //}


    chooseYourChampion = () => {
        this.setState(state => ({
            ready: !state.ready,
        }));
    }

    setRaces = (races) => {
        this.setState({ races: races, });
    }

    setRacesInfo = (racesInfo) => {
        this.setState({ racesInfo: racesInfo,})
    }

    setClasses = (classes) => {
        this.setState({classes: classes,})
    }

    setClassesInfo = (classesInfo) => {
        this.setState({classesInfo: classesInfo,})
    }

    //setAbilityScores = (abilityScores) => {
    //    this.setState({ abilityScores: abilityScores })
    //}

    //setAbilityScoresInfo = (abilityScoresInfo) => {
    //    this.setState({ abilityScoresInfo: abilityScoresInfo })
    //}




    render() {
        const { ready } = this.state; //this has been set up top and not by the user. will need to change once characters can be saved and retrieved. 

        if (!ready) {
            return (<div className="container-fluid">
                <div className="row">
                    <div className="col-12 text-center">
                        <h1>Welcome</h1>
                        {this.state.enter ? <button onClick={this.chooseYourChampion} className='btn btn-lg btn-primary'>Begin your journey!</button> : <p>...Loading API</p>}
                    </div>
                </div>
            </div>);
        } else {
            return (<CreateCharacter {...this.state} />);
        }
    }
}