import React from 'react'

export default function SearchResults({ champions, select, category, getTraits, }) {
   // console.log(champions)
    let cards = [];
    switch (category) {
        case 'races':
            cards = champions.map((race) => {
                let bonuses = "";
                for (var a = 0; a < race.ability_bonuses.length; a++) {
                    bonuses += race.ability_bonuses[a].ability_score.name + ": " + race.ability_bonuses[a].bonus + " ";
                }
                let traits = [];
                let target = '#race-traits';
                for (var b = 0; b < race.traits.length; b++) { //UI formatting commas and period. 
                    if (b !== race.traits.length-1) {
                        traits.push(<span data-toggle="modal" data-target={target} key={race.traits[b].name}>{race.traits[b].name}, </span>);
                    } else {
                        traits.push(<span data-toggle="modal" data-target={target} key={race.traits[b].name}>{race.traits[b].name}. </span>);
                    }
                }
                traits.push(<button className='btn btn-sm btn-primary' data-toggle="modal" data-target={target} onClick={() => getTraits(race)} key='raceTraitsInfoButton'>?</button>)

                return (<div className="card border-dark mb-3 col-12 character-card" key={race.index}>
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
                        <button className="btn btn-primary btn-block" onClick={() => select(race.index)}>Choose {race.name}</button>
                       
                    </div>
                </div>);
            });
            break;
        case 'classes':
            cards = champions.map((championClass) => {
                let proficiencies = "";
                let count = 0;
                proficiencies = championClass.proficiencies.map((prof) => {
                    if (count === championClass.proficiencies.length - 1) {
                        return (prof.name + ". ");
                    }
                    count++;
                    return (prof.name + ", ");
                });
                let savingThrows = '';
                savingThrows = championClass.saving_throws.map((savingThrow) => {
                    return (savingThrow.name + " ")
                });

                //let bonuses = this.abilityBonuses(race);
                return (<div className="card border-dark mb-3 col-12 character-card" key={championClass.index}>
                    <div className="card-header text-white bg-dark text-center">
                        <h4>{championClass.name}</h4>
                    </div>
                    <div className="card-body">
                        <p className="card-text"><strong>Hit die:</strong> {championClass.hit_die}</p>
                        <p className="card-text"><strong>Starting proficiencies:</strong> {proficiencies} </p>
                        <p className="card-text"><strong>Saving Throws:</strong> {savingThrows}</p>
                        <p className="card-text">{ }</p>
                        <p className="card-text">{ }</p>
                        <p className="card-text">{ }</p>
                        <button className="btn btn-primary btn-block" onClick={() => select(championClass.index)}>Choose {championClass.name}</button>
                    </div>
                </div>);
            });
            break; 
        default:
            break;
    }
    return (cards);
}


