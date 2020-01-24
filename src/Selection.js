import React from 'react'

const Selection = (props) => {
    let selection = props.races.results.map((race, index) => {
        return <button onClick={() => props.displayRaceInfo(race.index)} className='btn btn-primary selection' key={index}>{race.name}</button>
    })
    return (<div>{selection}</div>)
}

export default Selection