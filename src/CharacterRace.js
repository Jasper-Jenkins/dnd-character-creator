import React from 'react'

const CharacterRace = (props) => {

    console.log("Character Race", props)


    const raceSelected = props.character.raceSelected
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

        case "Ability-Scores":
            var abilities = Object.keys(props.character.abilityScoresSelected);
            let abilityScoresInfo = abilities.map((ability, index) => {
                return (<div className='col-2 text-center abilityScores' key={index}>{props.character.abilityScoresSelected[ability]}</div>);
            });
            return (<div className="col-12 info">
                        <div className="row">
                            {abilityScoresInfo}
                        </div>
                     </div>);
        default: 
            return (<div className="col-12 info">
                        <p>Great gasping ghouls, what have you done!</p>
                    </div>);

    }
}

export default CharacterRace