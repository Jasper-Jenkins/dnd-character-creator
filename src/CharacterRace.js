import React from 'react'

const CharacterRace = (props) => {

    console.log("Character Race", props)


    const raceSelected = props.character.raceSelected
    switch (props.character.navigation) {
        case "Races":
            if (props.character.isRaceSelected(raceSelected)) {
                const imageRace = props.character.imagesForRaces(raceSelected.index)
                return (<div className="col-12 info">
                    {imageRace}
                    <h2>{raceSelected.name}</h2>
                    <p>{raceSelected.alignment}</p>
                </div>);

            } else {
                return (<div className="col-12 info">
                    <p>...Choose your race</p>
                </div>);
            }

        case "Ability-Scores":
            var abilities = Object.keys(props.character.abilityScoresSelected);
            let abilityScoresDisplay = abilities.map((ability, index) => {
                return (<div className='col-2 text-center abilityScores' key={index}>{props.character.abilityScoresSelected[ability]}</div>);
            });
            return (<div className="col-12 info">
                {abilityScoresDisplay}
            </div>);
    }
}

export default CharacterRace