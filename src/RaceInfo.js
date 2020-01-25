import React from 'react'

const RaceInfo = (props) => {
    console.log("RACE INFO PROPS", props)
    if (props.raceSelected.name === undefined) {
        return (
            <div className="row">
                <div className="col raceInfo">
                    <p>...Choose your race</p>
                </div>
            </div>);
    } else {
        return (<div className="row">
            <div className="col raceInfo">
                <p>{props.raceSelected.name}</p>
                <p>{props.raceSelected.speed}</p>
                <p>{props.raceSelected.alignment}</p>
            </div>
        </div>);    
        }
        
    }
    
export default RaceInfo