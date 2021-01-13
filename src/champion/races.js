import React, { Component } from 'react'
import InfoModal from '../helper/modal'
import isSelected from '../helper/helper-functions'

export default class CharacterRace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            raceSelected: {},
            preLoadInfo: [],
            preLoadCheck: false,
        }
        this.buttons = this.buttons.bind(this);
        this.selectRace = this.selectRace.bind(this);
        this.abilityBonuses = this.abilityBonuses.bind(this);
        this.raceCards = this.raceCards.bind(this);
        this.raceCarousel = this.raceCarousel.bind(this);
    //    console.log("Race Constructor", props);
    }

    //shouldComponentUpdate(nextProps, nextState) {
    //    const url = 'https://www.dnd5eapi.co/api/'
    //    if (!nextState.preLoadCheck) {
    //        let newData = fetch(url + 'classes')
    //            .then(result => result.json())
    //            .then(result => { console.log(result); return result })
    //            .catch(e => { console.log(e + " -- getClasses() -- " + url); });
    //        //this.setState({
    //        //    preLoadInfo:
    //        //});
    //        console.log("False", newData);
    //        this.setState({ preLoadCheck: true,})
    //       return false;
    //    }
    //    console.log("True");
    //    return true;
    //}

    componentDidMount() {
        if (isSelected(this.props.raceSelected)) {
       //     console.log('race is selcted');
            this.setState({ raceSelected: this.props.raceSelected, });
        }

        console.log(this.props);
    }

    preloadNext() {
        const url = 'https://www.dnd5eapi.co/api/'
        console.log("Preload firing in <CharacterRace>");
       // getClasses(url) {
            return fetch(url + 'classes')
                .then(result => result.json())
                .then(result => { return result })
                .catch(e => { console.log(e + " -- getClasses() -- " + url); });
       // }
    }

    selectRace(index) {
        const { racesInfo } = this.props;
        const { setRace } = this.props;
        for (let i = 0; i < racesInfo.length; i++) {
            if (racesInfo[i].index === index) {
                const raceSelected = racesInfo.filter(function (race) { return race.name === racesInfo[i].name });
                this.setState({ raceSelected: raceSelected[0] });
                setRace(raceSelected[0]); 
                console.log(raceSelected[0]);
                break;
            }
        }
    }   

    buttons() {
        const { races } = this.props;
        const { raceSelected } = this.state;
        //console.log("race selected ", raceSelected);
        let raceButtons = races.results.map((race) => {
            if (isSelected(raceSelected) && raceSelected.index === race.index) {
                return (<button className='btn btn-sm buttonSelected col-4 {race.index}' aria-disabled='true' key={race.index}>{race.name}</button>);
            }
            return (<button onClick={() => this.selectRace(race.index)} className='btn btn-sm selectionButtons col-4' key={race.index}>{race.name}</button>);
        });
        return raceButtons;
    }


    abilityBonuses(characterRace) {        
        let bonuses = ""; 
        for (var a = 0; a < characterRace.ability_bonuses.length; a++) {
            bonuses += characterRace.ability_bonuses[a].ability_score.name + ": " + characterRace.ability_bonuses[a].bonus + " ";
        }
        return (bonuses);
    }

    traitsInfo(url) {

    }

    traits(characterRace) {
        let traits = [];
        for (var a = 0; a < characterRace.traits.length; a++) {
            traits.push(<span data-toggle="modal" data-target="#exampleModalLong" key={characterRace.traits[a].name}>{characterRace.traits[a].name} </span>);
            }
        // this.traitsInfo(characterRace.traits[a].url)
        //let traits = characterRace.traits.map((trait) => {
        //    let string = trait.name; 
        //    return (string);
        //});
        return (traits);
    }

    raceCards() {       
        const { racesInfo } = this.props;
       
        let raceCards = racesInfo.map((race, index) => {            
            let bonuses = this.abilityBonuses(race);
            let traits = this.traits(race);
            console.log(traits)
            //let active = "carousel-item active ";  //trying to set up carousel. PROBLEM: once this sets a card to active, it doesnt swap the 'active' className.
            //let item = "carousel-item ";
            //let styles = "card border-dark mb-3 ";
            //if (index === 1) {
            //    styles += active;
            //} else {
            //    styles += item;
            //}
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
    raceCarousel() {       

        return (<div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                {this.raceCards()}
            </div>
            <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </a>
        </div>);

    }




    render() {
       // let cards = this.raceCards();
        return (<div className='selection col-12'>
            <h2 className="selectionTitle text-center">Choose your Champions Race</h2>
            {this.raceCards()}
                </div>);
    }
}