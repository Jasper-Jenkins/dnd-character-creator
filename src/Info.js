import React from 'react'
import CharacterRace from './CharacterRace'
//import CharacterClass from './CharacterClass'

const Info = (props) => {
    console.log("Info() props: ", props)
    const raceSelected = props.character.raceSelected
    const classSelected = props.character.classSelected


    switch (props.character.navigation) {
        case "Races":
            if (props.character.isRaceSelected(raceSelected)) {
                const imageRace = props.character.imagesForRaces(raceSelected.index)
                const sizeDescription = props.character.raceSelected.size_description
                return (<div className="col-12 info">
                    {imageRace}
                    <h2>{raceSelected.name}</h2>
                    <p>{raceSelected.alignment}</p>
                    <p>{sizeDescription}</p>
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
                    <h1>{props.character.classSelected.name}</h1>
                    <p>WORKING ON CLASS CREATION</p>
                </div>);
            } else {
                return (<div className="col-12 info">
                            <p>...Choose your class</p>
                        </div>);
            }
        case 'Ability-Scores':
            var abilities = Object.keys(props.character.abilityScoresSelected);
            let abilityScoresInfo = abilities.map((ability, index) => {
                return (<div className='col-2 text-center abilityScores' key={index}>{props.character.abilityScoresSelected[ability]}</div>);
            });
            return (<div className="col-12 info">
                        <div className="row">
                            {abilityScoresInfo}
                        </div>
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