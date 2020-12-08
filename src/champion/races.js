import React, { Component } from 'react'
import isSelected from '../helper/helper-functions'

export default class CharacterRace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            raceSelected: {},            
        }
        this.buttons = this.buttons.bind(this);
        this.selectRace = this.selectRace.bind(this);
        this.abilityBonuses = this.abilityBonuses.bind(this);
        this.raceCards = this.raceCards.bind(this);
    //    console.log("Race Constructor", props);
    }

    componentDidMount() {
        if (isSelected(this.props.raceSelected)) {
       //     console.log('race is selcted');
            this.setState({ raceSelected: this.props.raceSelected, });
        }
        console.log(this.props);
    }

    selectRace(index) {
        const { racesInfo } = this.props;
        const { setRace } = this.props;
        for (let i = 0; i < racesInfo.length; i++) {
            if (racesInfo[i].index === index) {
                const raceSelected = racesInfo.filter(function (race) { return race.name === racesInfo[i].name });
                this.setState({ raceSelected: raceSelected[0] });
                setRace(raceSelected[0]); 
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

    raceCards() {       
        const { racesInfo } = this.props;
        let raceCards = racesInfo.map((race) => {            
            let bonuses = this.abilityBonuses(race);           
            return (<div className="card border-dark mb-3 " key={race.index}>
                <div className="card-header text-white bg-dark text-center">
                         <h4>{race.name}</h4>
                        </div>
                <div className="card-body">                           
                            <p className="card-text">{race.size_description}</p>
                            <p className="card-text">{race.age}</p>
                            <p className="card-text">{race.alignment}</p>
                            <p className="card-text">{race.language_desc}</p>                            
                            <p className="card-text"><strong>Ability Bonuses:</strong> {bonuses}</p>
                            <p className="card-text"><strong>Speed:</strong> {race.speed}</p>
                            <button className="btn btn-primary" onClick={() => this.selectRace(race.index)}>Choose {race.name}</button>
                        </div>
                    </div>);
        });
        return (raceCards);
    }


    render() {
        let cards = this.raceCards();
        return (<div className='selection col-12'>
                    <p className="selectionTitle">Choose your Champions Race</p>
                    {cards}
                </div>);
    }
}