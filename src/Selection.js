import React from 'react'
import AbilityScoresForm from './AbilityScoresForm'
import ClassProficiencies from './ClassProficiencies'
import ClassSpells from './ClassSpells'
import Races from './champion/Races'
import Classes from './champion/Classes'

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
  //  const raceSelected = props.raceSelected
  //  const selectRace = props.selectRace;
  //  const selectClass = props.selectClass;
    const navigation = props.navigation;
  //  const classes = props.classes;

    switch (navigation) {
        case 'Races':
            return (<div className='col-12 text-center selection'><Races {...props} /></div>);           
        case 'Classes':
            return (<div className='col-12 text-center selection'><Classes {...props} /></div>); 
        case 'Proficiencies':
            if (props.isClassSelected(classSelected)) {
                return (<div className='col-12 text-center selection'>
                            <ClassProficiencies {...props}/>
                        </div>);
            }
            return (<div className='col-12 text-center selection'>You must first choose a class, before you can select your proficiencies.</div>)
            
        case 'Spells':
            if (props.isClassSelected(classSelected) && classSelected.spellcasting !== undefined) {
                return (<div className='col-12 text-center selection'>
                            <ClassSpells {...props} />
                        </div>);
            }
            return (<div className='col-12 text-center selection'>{classSelected.name} is not a spell caster.</div>);
            
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