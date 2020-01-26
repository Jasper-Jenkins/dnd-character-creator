import React from 'react'

const Selection = (props) => {
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
            return (<div className="col-12 text-center selection">{Cselection}</div>);
        default:             
    }         
}

export default Selection 