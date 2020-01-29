import React from 'react'

const Selection = (props) => {
    switch (props.category) {
        case 'races':
            let races = props.races.results.map((race, index) => {
                return (<button onClick={() => props.displayRaceInfo(race.index)} className='btn btn-primary col-4' key={index}>{race.name}</button>)
            });
            return (<div className="col-12 text-center selection">{races}</div>);

        case 'classes':
            let classes = props.classes.results.map((cClass, index) => {
                return ( <button onClick={() => props.displayClassInfo(cClass.index)} className='btn btn-primary col-4' key={index}>{cClass.name}</button>)
            });
            return (<div className='col-12 text-center selection'>{classes}</div>);
        case 'ability-scores':
            let abilityScores = props.abilityScores.results.map((abilityScore, index) => {
                return (<button onClick={() => props.getScore(abilityScore.index)} className='btn btn-primary col-2' key={index}>{abilityScore.name}</button>)
            });
            return (<div className='col-12 text-center selection'>{abilityScores}</div>)
        default:             
    }         
}

export default Selection 