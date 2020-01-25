import React from 'react'

const Selection = (props) => {
    let selection = props.races.results.map((race, index) => {
        return <button onClick={() => props.displayRaceInfo(race.index)} className='btn btn-primary' key={index}>{race.name}</button>
    });
    return (<div className="row">
                 <div className="col text-center">{selection}</div>
            </div>);
}

export default Selection