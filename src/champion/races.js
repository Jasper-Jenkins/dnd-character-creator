import React, { Component } from 'react'
//import InfoModal from '../helper/modal'
import isSelected from '../helper/helper-functions'
import SearchBar from '../helper/search-bar'
import SearchResults from '../helper/search-results'
import TraitsModal from '../helper/modal/traits-modal'

export default class CharacterRace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            races: {},
            racesInfo: [],
            raceSelected: {},
            searchResults: [], 
            word: "",            
            traits: [],
            race: {},
        }
        this.selectRace = this.selectRace.bind(this);
        this.getRaces = this.getRaces.bind(this);
        this.getInfo = this.getInfo.bind(this);
        this.getTraits = this.getTraits.bind(this);
    }

    componentDidMount() {
        if (isSelected(this.props.raceSelected)) {
            this.setState({ raceSelected: this.props.raceSelected, });            
        }
        if (isSelected(this.props.races) && this.props.racesInfo.length === 9) {
            this.setState({races: this.props.races, racesInfo: this.props.racesInfo,})
        } else {
            this.getRaces();
        }
      //  console.log(this.props);
    }

    componentWillUnmount() {
   //     console.log("Unmounting <Races />, races: ", this.state.races, " racesInfo: ", this.state.racesInfo)
        this.props.setRaces(this.state.races);
        this.props.setRacesInfo(this.state.racesInfo);
    }

    getRaces() {
     //   console.log("Getting Races")
        const url = 'https://www.dnd5eapi.co/api/'
        fetch(url + "races")
            .then(result => result.json())
            .then(result => { this.setState({ races: result, }, this.getInfo(result));})
            .catch(e => { console.log(e + " -- getRaces() -- " + url); });
    }

    getInfo(data) {
       // console.log(data);
       // let info = []
        const url = 'https://www.dnd5eapi.co'
        for (var i = 0; i < data.results.length; i++) {
           fetch(url + data.results[i].url)
               .then(result => result.json())
               .then(result => { this.setState((state) => ({ racesInfo: [...state.racesInfo, result] })) });
        }        
    }

    getTraits(race) {
        const url = 'https://www.dnd5eapi.co'        
        if (race.index === "human") {
            this.setState({ traits: [], race: race })
        } else {
            let traits = []
            for (var a = 0; a < race.traits.length; a++) {
                const check = race.traits.length;
                fetch(url + race.traits[a].url)
                    .then(result => result.json())
                    .then(result => { traits.push(result); if (check === traits.length) { this.setState({ traits: traits, race: race }) }})
                    .catch(e => { console.log(e + " -- getTraits() -- " + url); });
            }
        }
    }

    selectRace(index) {
        const { racesInfo } = this.state;
        const { setRace } = this.props; 
        const { navigate } = this.props;
        for (let i = 0; i < racesInfo.length; i++) {
            if (racesInfo[i].index === index) {
                const raceSelected = racesInfo.filter(function (race) { return race.name === racesInfo[i].name });
                this.setState({ raceSelected: raceSelected[0], });                
                setRace(raceSelected[0]); //setting race to CreateCharacter class 
                navigate('Classes');
                break;
            }
        }
    }
   
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
           
            this.setState({ searchResults: newList, });
        } else {
            
            this.setState({ searchResults: oldList, });
        }
    }  

    render() {
       
        const { word } = this.state;
        const { searchResults } = this.state;
        const { racesInfo, traits, race } = this.state;
        return (<div className='col-12 selection '>
                <div className='row selectionTitle'>                   
                <h5 className='col-5 text-center choose'>Choose a Race</h5>                
                    <SearchBar value={word} handleChange={e => this.searchRaces(e.target.value)} />                   
                </div>
            <div className='row'>
                <SearchResults champions={word !== '' ? searchResults : racesInfo} category='races' getTraits={this.getTraits} select={this.selectRace} />
            </div>
            <TraitsModal traits={traits} race={race} />
            </div>);
    }
}

