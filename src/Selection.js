import React from 'react'
import AbilityScoresForm from './AbilityScoresForm'
import ClassProficiencies from './ClassProficiencies'

const Selection = (props) => {
    if (props.category === 'races') {
        let races = props.races.results.map((race, index) => {
            return (<button onClick={() => props.displayRaceInfo(race.index)} className='btn btn-primary col-4' key={index}>{race.name}</button>)
        });
        return (<div className="col-12 text-center selection">{races}</div>);
    } else if (props.category === 'classes') {

        let classes = props.classes.results.map((cClass, index) => {
            return (<button onClick={() => props.displayClassInfo(cClass.index)} className='btn btn-primary col-4' key={index}>{cClass.name}</button>)
        });
        return (<div className='col-12 text-center selection'>{classes}</div>);
    } else if (props.category === 'ability-scores') {
        let abilityScores = props.abilityScores.results.map((abilityScore, index) => {
            return (<button onClick={() => props.getScore(abilityScore.index)} className='btn btn-primary col-2' key={index}>{abilityScore.name}</button>)
        });
        return (
            <div className='col-12 text-center selection'>
                <div className='row'>
                    <div className='col-12'>
                        {abilityScores}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12'>
                        <AbilityScoresForm handleSubmit={props.handleSubmit} />
                    </div>
                </div>

            </div>)
    } else if (props.category === 'proficiencies') {
        const { classProficiencies } = props
        const { classProficienciesChoices } = props
        const { addProficiency } = props
        const { removeProficiency } = props
        const { classSelected } = props

        return (<ClassProficiencies classSelected={classSelected} classProficiencies={classProficiencies} classProficienciesChoices={classProficienciesChoices} addProficiency={addProficiency} removeProficiency={removeProficiency} />);
    } else {
        return ((<div className='col-12 text-center selection'><p>broke something, or proficiencies is currently under construction</p></div>));
    }


    //switch (props.category) {
    //    case 'races':
    //        let races = props.races.results.map((race, index) => {
    //            return (<button onClick={() => props.displayRaceInfo(race.index)} className='btn btn-primary col-4' key={index}>{race.name}</button>)
    //        });
    //        return (<div className="col-12 text-center selection">{races}</div>);

    //    case 'classes':
    //        let classes = props.classes.results.map((cClass, index) => {
    //            return (<button onClick={() => props.displayClassInfo(cClass.index)} className='btn btn-primary col-4' key={index}>{cClass.name}</button>)
    //        });
    //        return (<div className='col-12 text-center selection'>{classes}</div>);
    //    case 'ability-scores':
    //        let abilityScores = props.abilityScores.results.map((abilityScore, index) => {
    //            return (<button onClick={() => props.getScore(abilityScore.index)} className='btn btn-primary col-2' key={index}>{abilityScore.name}</button>)
    //        });
    //        return (<div className='col-12 text-center selection'>{abilityScores}</div>)
    //    default:
    //}




}

export default Selection 