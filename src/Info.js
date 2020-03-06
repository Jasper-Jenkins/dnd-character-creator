import React from 'react'
import CharacterClass from './CharacterClass'

const Info = (props) => {
    //console.log("Info() props: ",props)
    switch (props.category) {
        case 'races':
            if (props.isRaceSelected) {
                return (<div className="col-12 info">
                            <h1 className='text-center'>{props.raceSelected.name}</h1>
                            <p>{props.raceSelected.speed}</p>
                            <p>{props.raceSelected.alignment}</p>
                        </div>);
            } else {
                return (<div className="col-12 info">
                            <p>...Choose your race</p>
                        </div>);
            }
        case 'classes':
            if (props.isClassSelected) {
                // return (<CharacterClass classProps={props} />);
                return (<div className="col-12 info">
                    <p>WORKING ON CLASS CREATION</p>
                </div>);
            } else {
                return (<div className="col-12 info">
                            <p>...Choose your class</p>
                        </div>);
            }
        case 'ability-scores':
            var abilities = Object.keys(props.abilityScoresSelected); 
            let abilityScoresDisplay = abilities.map((ability, index) => {
                return (<div className='col-2 text-center abilityScores' key={index}>{props.abilityScoresSelected[ability]}</div>);
            });
            return (<div className="col-12 info">
                        <div className="row" >
                            {abilityScoresDisplay}  
                        </div>
            </div>);
        case 'proficiencies':
            if (props.isClassSelected) {
               // return (<ClassProficiencies classProps={props} />);
                //return (<CharacterClass classProps={props} />);
                return (<div className="col-12 info">
                    <p>...Proficiencies would be here once Character has chosen a Class </p>
                </div >);
            } else {
                return (<div className="col-12 info">
                            <p>...Choose your class to select proficiencies </p>
                        </div>);
            }
        case 'spells':
            console.log("Info, at spells", props)
            if (props.isClassSelected) {
                return (<CharacterClass props={props} />);
            } else {
                return (<div className='col-12 spellsInfo'>
                    <p>..Choose your class to select spells </p>
                    </div>);
            }
        default:
            return null;
        }
    }
    
export default Info