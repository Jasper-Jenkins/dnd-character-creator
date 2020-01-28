import React from 'react'

const Selection = (props) => {
    console.log("Selected Props: ", props)
    switch (props.category) {
        case 'races':
            let selection = props.races.results.map((race, index) => {
                return (<button onClick={() => props.displayRaceInfo(race.index)} className='btn btn-primary col-4' key={index}>{race.name}</button>)
            });
            return (<div className="col-12 text-center selection">{selection}</div>);

        case 'classes':
            let Cselection = props.classes.results.map((cClass, index) => {
                return ( <button onClick={() => props.displayClassInfo(cClass.index)} className='btn btn-primary col-4' key={index}>{cClass.name}</button>)
            });
            return (<div className='col-12 text-center selection'>{Cselection}</div>);
        case 'ability-scores':
            let Aselection = props.abilityScores.results.map((abilityScore, index) => {
                return (<button onClick={() => props.getScore(abilityScore.index)} className='btn btn-primary col-2' key={index}>{abilityScore.name}</button>)
            });
            return (<div className='col-12 text-center selection'>{Aselection}</div>)
        default:             
    }         
}

export default Selection 