import React from 'react'

const RaceInfo = (props) => {
    console.log("RACE INFO PROPS", props)
    if (props.raceSelected.name === undefined) {
        return (<p>...Choose your race</p>)
    } else {
        return (<p>{props.raceSelected.name}</p>)
    }
    
}

export default RaceInfo