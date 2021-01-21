import React from 'react'
import InfoModal from './modal'

export default function SearchResults({ champions, select, category }) {
    console.log(champions)
    let cards = [];
    switch (category) {
        case 'races':
            cards = champions.map((race) => {
                console.log(race);
                //HOW TO INCORPORATE THESE?!
                //let bonuses = this.abilityBonuses(race);
                //let traits = this.traits(race);

                let bonuses = "";
                for (var a = 0; a < race.ability_bonuses.length; a++) {
                    bonuses += race.ability_bonuses[a].ability_score.name + ": " + race.ability_bonuses[a].bonus + " ";
                }
                let traits = [];
                let target = '#race-' + race.index;
                for (var a = 0; a < race.traits.length; a++) {
                    traits.push(<span data-toggle="modal" data-target={target} key={race.traits[a].name}>{race.traits[a].name} </span>);
                }
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
                        <button className="btn btn-primary" onClick={() => select(race.index)}>Choose {race.name}</button>
                        <InfoModal info={race} />
                    </div>
                </div>);
            });
            break;
        case 'classes':
            cards = champions.map((championClass) => {
                //let bonuses = this.abilityBonuses(race);
                return (<div className="card border-dark mb-3 " key={championClass.index}>
                    <div className="card-header text-white bg-dark text-center">
                        <h4>{championClass.name}</h4>
                    </div>
                    <div className="card-body">
                        <p className="card-text"><strong>Hit die:</strong> {championClass.hit_die}</p>
                        <p className="card-text"><strong>Starting proficiencies:</strong> </p>
                        <p className="card-text"><strong>Saving Throws:</strong></p>
                        <p className="card-text">{ }</p>
                        <p className="card-text">{ }</p>
                        <p className="card-text">{ }</p>
                        <button className="btn btn-primary" onClick={() => select(championClass.index)}>Choose {championClass.name}</button>
                    </div>
                </div>);
            });
            break; 
        default:
            break;
    }
    return (cards);
}


