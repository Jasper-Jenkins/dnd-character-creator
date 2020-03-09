import React from 'react'
//import CharacterClass from './CharacterClass'

const Info = (props) => {
//    console.log("Info() props: ", props)
    const raceSelected = props.character.raceSelected
    const classSelected = props.character.classSelected
    switch (props.character.navigation) {
        case 'Races':
            if (props.character.isRaceSelected(raceSelected)) {
                return (<div className="col-12 info">
                    <h1 className='text-center'>{raceSelected.name}</h1>
                    <img src='https://www.greenmangaming.com/blog/wp-content/uploads/2018/05/halfling.jpg' className='raceSelect' alt='{classSelected.name}'/>
                            <p>{raceSelected.speed}</p>
                            <p>{raceSelected.alignment}</p>
                        </div>);
            } else {
                return (<div className="col-12 info">
                            <p>...Choose your race</p>
                        </div>);
            }
        case 'Classes':
            if (props.character.isClassSelected(classSelected)) {
                // return (<CharacterClass classProps={props} />);
                return (<div className="col-12 info">
                    <p>WORKING ON CLASS CREATION</p>
                </div>);
            } else {
                return (<div className="col-12 info">
                            <p>...Choose your class</p>
                        </div>);
            }
        case 'Ability-Scores':
            var abilities = Object.keys(props.character.abilityScoresSelected); 
            let abilityScoresDisplay = abilities.map((ability, index) => {
                return (<div className='col-2 text-center abilityScores' key={index}>{props.character.abilityScoresSelected[ability]}</div>);
            });
            return (<div className="col-12 info">
                            {abilityScoresDisplay}  
                    </div>);
        case 'Proficiencies':
            if (props.character.isClassSelected(classSelected)) {
                return (<div className="col-12 info">
                    <h1 className='text-center'>{props.character.classSelected.name}</h1>

                    <p>...Proficiencies would be here once Character has chosen a Class </p>
                </div >);
            } else {
                return (<div className="col-12 info">
                            <p>...Choose your class to select proficiencies </p>
                        </div>);
            }
        case 'Spells':
            if (props.character.isClassSelected(classSelected)) {
                return (<div className='col-12 info'>

                </div>)
            } else {
                return (<div className='col-12 info'>
                           <p>..Choose your class to select spells </p>
                        </div>);
            }
        default:
            return null;
        }
    }
    
export default Info