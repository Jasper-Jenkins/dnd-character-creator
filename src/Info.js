import React from 'react'

const Info = (props) => {
    switch (props.category) {
        case 'races':
            if (props.isRaceSelected) {
                return (<div className="col-12 info">
                            <p>{props.raceSelected.name}</p>
                            <p>{props.raceSelected.speed}</p>
                            <p>{props.raceSelected.alignment}</p>
                        </div>);
            } else {
                return (<div className="col-12 info">
                            <p>...Choose your race</p>
                        </div>);
            }
        case "classes":
            if (props.isClassSelected) {
                return (<div className="col-12 info">
                            <p>{props.classSelected.name}</p>
                        </div>);
            } else {
                return (<div className="col-12 info">
                            <p>...Choose your class</p>
                        </div>);
            }            
        default:
            
        }
    }
    
export default Info