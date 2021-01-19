import React from 'react'
import InfoModal from './modal'

export default function SearchResults({ champions }) {
    console.log(champions)
    let raceCards = champions.map((race, index) => {
        //let bonuses = this.abilityBonuses(race);
        //let traits = this.traits(race);
        return (<div className="card border-dark mb-3 " key={race.index}>
            <div className="card-header text-white bg-dark text-center">
                <h4>{race.name}</h4>
            </div>
            <div className="card-body">
                <p className="card-text"><strong>Description:</strong> {race.size_description}</p>
                <p className="card-text"><strong>Age:</strong> {race.age}</p>
                <p className="card-text"><strong>Alignment:</strong> {race.alignment}</p>
                <p className="card-text"><strong>Language:</strong> {race.language_desc}</p>
                <p className="card-text"><strong>Speed:</strong> {race.speed}</p>
                <button className="btn btn-primary" onClick={() => this.selectRace(race.index)}>Choose {race.name}</button>
                <InfoModal info={race} />
            </div>
        </div>);
    });
    return (raceCards);
}