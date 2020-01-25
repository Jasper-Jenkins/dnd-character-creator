import React from 'react'

const Info = (props) => {
    switch (props.category) {
        case 'races':
            if (props.isRaceSelected) {
                return (<div className="row">
                    <div className="col raceInfo">
                        <p>{props.raceSelected.name}</p>
                        <p>{props.raceSelected.speed}</p>
                        <p>{props.raceSelected.alignment}</p>
                    </div>
                </div>);
            } else {
                return (
                    <div className="row">
                        <div className="col raceInfo">
                            <p>...Choose your race</p>
                        </div>
                    </div>);
            }
        case "classes":
            if (props.isClassSelected) {
                return (<div className="row">
                    <div className="col classInfo">
                        <p>{props.classSelected.name}</p>
                    </div>
                </div>);
            } else {
                return (
                    <div className="row">
                        <div className="col classInfo">
                            <p>...Choose your class</p>
                        </div>
                    </div>);
            }

            
        default:
            

        }
    }
    
export default Info