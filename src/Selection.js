import React from 'react'

const Selection = (props) => {
    switch (props.category) {
        case 'races':
            let selection = props.races.results.map((race, index) => {
                return <button onClick={() => props.displayRaceInfo(race.index)} className='btn btn-primary' key={index}>{race.name}</button>
            });
            return (<div className="row">
                        <div className="col text-center">{selection}</div>
                    </div>);

        case 'classes':
            let Cselection = props.classes.results.map((cClass, index) => {
                return <button onClick={() => props.displayClassInfo(cClass.index)} className='btn btn-primary' key={index}>{cClass.name}</button>
            });
            return (<div className="row">
                        <div className="col text-center">{Cselection}</div>
                    </div>);
        default:             
    }         
}

export default Selection