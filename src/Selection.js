import React from 'react'
import AbilityScoresForm from './AbilityScoresForm'
import ClassProficiencies from './ClassProficiencies'
import ClassSpells from './ClassSpells'


//class Selection extends Component {
//    constructor(props) {
//        super(props);
//        this.state = {
//            navigation: 'Races',
//        }
//    }

//    componentDidMount() {
//        console.log("Selection converted to a from a Function to a Class. class Selection {} MOUNTED. ");
//    }



//    render() {
//        return (<div></div>);
//    }
//}




const Selection = (props) => {
    console.log("Selection() props", props)
  //const [character, updateCharacterName] = useState(props);
  //console.log("useState Hook fun!", character);


    const classSelected = props.classSelected
    const raceSelected = props.raceSelected
    const selectRace = props.selectRace;
    const selectClass = props.selectClass;
    const navigation = props.navigation;

    switch (navigation) {
        case 'Races':

            let raceButtons = props.races.results.map((race) => {
                if (props.isRaceSelected(raceSelected) && raceSelected.index === race.index) {
                    
                    return (<button className='selectionButtons buttonSelected col-4 {race.index}' aria-disabled='true' key={race.index}>{race.name}</button>);
                }
                return (<button onClick={() => selectRace(race.index)} className='selectionButtons col-4' key={race.index}>{race.name}</button>);

            });            
            return (<div className="col-12 text-center selection">
                {raceButtons}
            </div>);
           
        case 'Classes':
            let classButtons = props.classes.results.map((characterClass) => {
                if (props.isClassSelected(classSelected) && classSelected.index === characterClass.index) {
                    //console.log("selection disabled for class");
                    return (<button className='selectionButtons buttonSelected col-4' key={characterClass.index}>{characterClass.name}</button>);
                }
                return (<button onClick={() => selectClass(characterClass.index)} className='selectionButtons col-4' key={characterClass.index}>{characterClass.name}</button>);

            });
            return (<div className='col-12 text-center selection'>{classButtons}</div>);
           
        case 'Proficiencies':
            if (props.isClassSelected(classSelected)) {
                return (<div className='col-12 text-center selection'>
                            <ClassProficiencies {...props}/>
                        </div>);
            } else {
                return (<div className='col-12 text-center selection'>You must first choose a class, before you can select your proficiencies.</div>)
            }
        case 'Spells':
            if (props.isClassSelected(classSelected)) {
                return (<div className='col-12 text-center selection'>
                            <ClassSpells {...props} />
                        </div>);
            } else {
                return (<div className='col-12 selection'>Hmmmm spell transfer is off</div>);
            }
        case 'Ability-Scores':
            let abilityScores = props.abilityScores.results.map((abilityScore, index) => {
                return (<button onClick={() => props.getScore(abilityScore.index)} className='col-2 abilityScoresSelection' key={index}>{abilityScore.name}</button>)
            });
            return (
                <div className='col-12 text-center selection'>
                    <div className='row'>
                        <div className='col-12'>
                            {abilityScores}
                        </div>
                        <AbilityScoresForm handleSubmit={props.handleSubmit} />
                    </div>

                </div>
            );
        default:
            return (<div className='col-12 text-center selection'>DEFAULT: It's a broke!</div>);
    }    
}

//<div className='row'>
    //<div className='col-12'>
    //    <AbilityScoresForm handleSubmit={props.handleSubmit} />
    //</div>
//</div>

export default Selection 