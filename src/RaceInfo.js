import React from 'react'

const RaceInfo = (props) => {
    console.log("RACE INFO PROPS", props)
    if (props.raceSelected.name === undefined) {
        return (
            <div id="raceInfo">
                <p>...Choose your race</p>
            </div>)
    } else {
        return (
            <div id="raceInfo">
                <p>{props.raceSelected.name}</p>
                <p>{props.raceSelected.speed}</p>
                <p>{props.raceSelected.alignment}</p>
            </div>)    
        }
        
    }
    
export default RaceInfo