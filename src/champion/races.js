import React, { Component } from 'react'
import InfoModal from '../helper/modal'
import isSelected from '../helper/helper-functions'
import SearchBar from '../helper/search-bar'
import SearchResults from '../helper/search-modal'

//export default class CharacterRace extends Component {
//    constructor(props) {
//        super(props);
//        this.state = {
//            raceSelected: {},
//            searchResults: [],
//            word: "",
          
//        }
//        //this.buttons = this.buttons.bind(this);
//        //this.selectRace = this.selectRace.bind(this);
//        //this.abilityBonuses = this.abilityBonuses.bind(this);
//        //this.raceCards = this.raceCards.bind(this);
//        //this.raceCarousel = this.raceCarousel.bind(this);
//        this.traits = this.traits.bind(this);
//    }


//    componentDidMount() {
//        if (isSelected(this.props.raceSelected)) {
//            this.setState({ raceSelected: this.props.raceSelected, });
//        }
//        console.log(this.props);
//    }

//    getRaces() {
//        const url = 'https://www.dnd5eapi.co/api/'
//        return fetch(url + "races")
//            .then(result => result.json())
//            .then(result => { this.setState({ races: result, },); return result })
//            .catch(e => { console.log(e + " -- getRaces() -- " + url); });
//    }

//    selectRace(index) {
//        const { racesInfo } = this.props;
//        const { setRace } = this.props;
//        for (let i = 0; i < racesInfo.length; i++) {
//            if (racesInfo[i].index === index) {
//                const raceSelected = racesInfo.filter(function (race) { return race.name === racesInfo[i].name });
//                this.setState({ raceSelected: raceSelected[0] });
//                setRace(raceSelected[0]); //setting race to CreateCharacter class 
//                console.log(raceSelected[0]);
//                break;
//            }
//        }
//    }   

//    buttons() {
//        const { races } = this.props;
//        const { raceSelected } = this.state;        
//        let raceButtons = races.results.map((race) => {
//            if (isSelected(raceSelected) && raceSelected.index === race.index) {
//                return (<button className='btn btn-sm buttonSelected col-4 {race.index}' aria-disabled='true' key={race.index}>{race.name}</button>);
//            }
//            return (<button onClick={() => this.selectRace(race.index)} className='btn btn-sm selectionButtons col-4' key={race.index}>{race.name}</button>);
//        });
//        return raceButtons;
//    }

//    abilityBonuses(characterRace) {        
//        let bonuses = ""; 
//        for (var a = 0; a < characterRace.ability_bonuses.length; a++) {
//            bonuses += characterRace.ability_bonuses[a].ability_score.name + ": " + characterRace.ability_bonuses[a].bonus + " ";
//        }
//        return (bonuses);
//    }

//    traits(characterRace) {
//        let traits = [];        
//        let target = '#race-' + characterRace.index;
//        for (var a = 0; a < characterRace.traits.length; a++) {
//            traits.push(<span data-toggle="modal" data-target={target} key={characterRace.traits[a].name}>{characterRace.traits[a].name} </span>);
//        }
//        return (traits);
//    }

//    raceCards() {       
//        const { racesInfo } = this.props;  
//        //console.log(racesInfo);
//        let raceCards = racesInfo.map((race, index) => {            
//            let bonuses = this.abilityBonuses(race);
//            let traits = this.traits(race);
//            return (<div className="card border-dark mb-3 " key={race.index}>
//                <div className="card-header text-white bg-dark text-center">
//                         <h4>{race.name}</h4>
//                        </div>
//                <div className="card-body">                           
//                    <p className="card-text"><strong>Description:</strong> {race.size_description}</p>
//                    <p className="card-text"><strong>Age:</strong> {race.age}</p>
//                    <p className="card-text"><strong>Alignment:</strong> {race.alignment}</p>
//                    <p className="card-text"><strong>Language:</strong> {race.language_desc}</p>
//                    <p className="card-text"><strong>Traits:</strong> {traits}</p>
//                    <p className="card-text"><strong>Ability Bonuses:</strong> {bonuses}</p>
//                    <p className="card-text"><strong>Speed:</strong> {race.speed}</p>
//                    <button className="btn btn-primary" onClick={() => this.selectRace(race.index)}>Choose {race.name}</button>
//                    <InfoModal info={race} />
//                 </div>
//               </div>);
//        }); 
//        return (raceCards);
//    }
//   // <button type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModalLong">i</button>
   
//    searchRaces = (word) => {
//        const { racesInfo } = this.props;
//        this.setState({
//            word: word,
//        });
//        let oldList = racesInfo.map((race) => {
//            return race;
//        });
//        let newList = [];
//        if (word !== "") {
//            newList = oldList.filter(race => race.index.includes(word.toLowerCase())); 
//        //    console.log(oldList);
//            this.setState({ searchResults: newList, });
//        } else {
//            console.log(newList);
//            this.setState({ searchResults: oldList, });           
//        }
//    }


//    render() {
//        // let cards = this.raceCards();
//        const { word } = this.state;
//        const { searchResults } = this.state;
//        return (<div className='selection col-12'>
//            <h2 className="selectionTitle text-center">Choose your Champions Race</h2>
//            <SearchBar value={word} handleChange={e => this.searchRaces(e.target.value)} />
//            {word !== "" ? <SearchResults champions={searchResults} /> : this.raceCards()}           
//            </div>);
//    }
//}

export default class CharacterRace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            races: {},
            racesInfo: [],
            raceSelected: {},
            searchResults: [],
            word: "",

        }
        this.selectRace = this.selectRace.bind(this);
        this.abilityBonuses = this.abilityBonuses.bind(this);
        //this.raceCards = this.raceCards.bind(this);
        this.traits = this.traits.bind(this);
        this.getRaces = this.getRaces.bind(this);
        this.getInfo = this.getInfo.bind(this);
    }


    componentDidMount() {
        if (isSelected(this.props.raceSelected)) {
            this.setState({ raceSelected: this.props.raceSelected, });            
        }
        if (isSelected(this.props.races)) {
            this.setState({races: this.props.races, racesInfo: this.props.racesInfo,})
        } else {
            this.getRaces();
        }
        console.log(this.props);
    }

    componentWillUnmount() {
        this.props.setRaces(this.state.races);
        this.props.setRacesInfo(this.state.racesInfo);
    }


    getRaces() {
        console.log("Getting Races")
        const url = 'https://www.dnd5eapi.co/api/'
        fetch(url + "races")
            .then(result => result.json())
            .then(result => { this.setState({ races: result, }, this.getInfo(result));})
            .catch(e => { console.log(e + " -- getRaces() -- " + url); });
    }

    getInfo(data) {
        console.log(data);
        let info = []
        const url = 'https://www.dnd5eapi.co'
        for (var i = 0; i < data.results.length; i++) {
           fetch(url + data.results[i].url)
               .then(result => result.json())
               .then(result => { this.setState((state) => ({ racesInfo: [...state.racesInfo, result] })) });
        }        
    }

    selectRace(index) {
        const { racesInfo } = this.props;
        const { setRace } = this.props;
        console.log("are we getting here");
        for (let i = 0; i < racesInfo.length; i++) {
            if (racesInfo[i].index === index) {
                const raceSelected = racesInfo.filter(function (race) { return race.name === racesInfo[i].name });
                this.setState({ raceSelected: raceSelected[0] });
                setRace(raceSelected[0]); //setting race to CreateCharacter class 
                console.log(raceSelected[0]);
                break;
            }
        }
    }

    abilityBonuses(characterRace) {
        let bonuses = "";
        for (var a = 0; a < characterRace.ability_bonuses.length; a++) {
            bonuses += characterRace.ability_bonuses[a].ability_score.name + ": " + characterRace.ability_bonuses[a].bonus + " ";
        }
        return (bonuses);
    }

    traits(characterRace) {
        let traits = [];
        let target = '#race-' + characterRace.index;
        for (var a = 0; a < characterRace.traits.length; a++) {
            traits.push(<span data-toggle="modal" data-target={target} key={characterRace.traits[a].name}>{characterRace.traits[a].name} </span>);
        }
        return (traits);
    }

    raceCards() {
        const { racesInfo } = this.state;
      //  console.log(racesInfo);
        let raceCards = racesInfo.map((race) => {
         //   console.log(race);
            let bonuses = this.abilityBonuses(race);
            let traits = this.traits(race);
            return (<div className="card border-dark mb-3 " key={race.index}>
                <div className="card-header text-white bg-dark text-center">
                    <h4>{race.name}</h4>
                </div>
                <div className="card-body">
                    <p className="card-text"><strong>Description:</strong> {race.size_description}</p>
                    <p className="card-text"><strong>Age:</strong> {race.age}</p>
                    <p className="card-text"><strong>Alignment:</strong> {race.alignment}</p>
                    <p className="card-text"><strong>Language:</strong> {race.language_desc}</p>
                    <p className="card-text"><strong>Traits:</strong> {traits}</p>
                    <p className="card-text"><strong>Ability Bonuses:</strong> {bonuses}</p>
                    <p className="card-text"><strong>Speed:</strong> {race.speed}</p>
                    <button className="btn btn-primary" onClick={() => this.selectRace(race.index)}>Choose {race.name}</button>
                    <InfoModal info={race} />
                </div>
            </div>);
        });
        return (raceCards);
    }
    // <button type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModalLong">i</button>

    searchRaces = (word) => {
        const { racesInfo } = this.state;
        this.setState({
            word: word,
        });
        let oldList = racesInfo.map((race) => {
            return race;
        });
        let newList = [];
        if (word !== "") {
            newList = oldList.filter(race => race.index.includes(word.toLowerCase()));
            //    console.log(oldList);
            this.setState({ searchResults: newList, });
        } else {
            console.log(newList);
            this.setState({ searchResults: oldList, });
        }
    }


    render() {
        // let cards = this.raceCards();
        const { word } = this.state;
        const { searchResults } = this.state;
        
        return (<div className='selection col-12'>
            <h2 className="selectionTitle text-center">Choose your Race</h2>
            <SearchBar value={word} handleChange={e => this.searchRaces(e.target.value)} />
            {word !== '' ? <SearchResults champions={searchResults} category='races' select={() => this.selectRace()} /> : this.raceCards()}
        </div>);
    }
}

