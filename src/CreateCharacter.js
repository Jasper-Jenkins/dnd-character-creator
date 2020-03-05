import React, { Component } from 'react'
//import Info from './Info'
import Navigation from './Navigation'
import Selection from './Selection'
//import CharacterClass from'./CharacterClass'


class CreateCharacter extends Component {
    constructor(props) {
        super(props);
        console.log("CreateCharacter: ", props.characterClass);
        this.state = props.characterClass;
        this.state['navigationCategories'] = ['Races', 'Classes', 'Ability-Scores', 'Proficiencies', 'Spells'];
        this.state['navigation'] = ['Races'];
        this.state['classSelected'] = {};

    }
    
    setCharacterClassProps(props) {
        const propsKeys = Object.getOwnPropertyNames(props.characterClass);
        let properties = {};
        for (var i = 0; i < propsKeys.length; i++) {
            properties[propsKeys[i]] = props.characterClass[propsKeys[i]];
        };        
        return properties
    }

    navigate = (category) => {
        this.setState({ navigation: category, });
    }

    displayRaceInfo = (index) => {
        const { racesInfo } = this.state
        for (let i = 0; i < racesInfo.length; i++) {
            if (racesInfo[i].index === index) {
                const RaceSelected = racesInfo.filter(function (race) { return race.name === racesInfo[i].name });
                this.setState({ raceSelected: RaceSelected[0], isRaceSelected: true });
                break;
            }
        }
    }

    displayClassInfo = (index) => {
        const { classesInfo } = this.state
        for (let i = 0; i < classesInfo.length; i++) {
            if (classesInfo[i].index === index) {
                const selectedClass = classesInfo.filter(function (cClass) { return cClass.name === classesInfo[i].name })
                this.setState({ classSelected: selectedClass[0], isClassSelected: true }, this.setStartingProficiencies(selectedClass[0]),)
                break;
            }
        }
    }

    componentDidMount() {
        //this.navigate('Race')
    }
    componentDidUpdate() {
        console.log("A Change to CreateCharacter has occured")
    }

    render() {
        const { navigationCategories } = this.state
        return (<div className='row'>
            <Selection character={this.state} displayRaceInfo={this.displayRaceInfo} displayClassInfo={this.displayClassInfo} />
            <Navigation navigate={this.navigate} navigationCategories={navigationCategories} />
            </div>);
    }
}


//const CreateCharacter = props => { 
//    const { navigationCategories } = props.characterClass
//    const { navigation } = props.characterClass
//    const { navigate } = props.characterClass // function

//    const { category } = props.characterClass // races, classes, ability-scores, proficiencies, spells
//    console.log("CreateCharacter() when " + category + " is selected", props)
//    //if (navigation === 'Race' ||) {//Class
//    //    console.log("CreateCharacter will create a CharacterClass: ", props)
//    //    return (<div className="container-fluid">
//    //        <div className="row creation">
//    //            <CharacterClass props={props} />
//    //        </div>
//    //    </div>);
        
//    if (navigation === navigationCategories[0]) { //races
//        const { races } = props.characterClass
//        const { raceSelected } = props.characterClass
//        const { racesInfo } = props.characterClass
//        const { isRaceSelected } = props.characterClass
//        const { displayRaceInfo } = props.characterClass

//        return (<div className="container-fluid">
//            <div className="row creation">
//                <div className="col-12">
//                    <div className="row">
//                        <Info raceSelected={raceSelected} isRaceSelected={isRaceSelected} category={category} />
//                    </div>
//                    <div className="row">
//                        <Selection races={races} racesInfo={racesInfo} displayRaceInfo={displayRaceInfo} category={category} />
//                    </div>
//                    <div className="row">
//                        <Navigation navigationCategories={navigationCategories} navigate={navigate} />
//                    </div>
//                </div>
//            </div>
//        </div>);

//    } else if (navigation === navigationCategories[1]) {//Class
//        console.log("CreateCharacter will create a CharacterClass: ", props.characterClass)
//        return (<div className="container-fluid">
//            <div className="row creation">
//                <CharacterClass props={props.characterClass} />
//                <Navigation navigationCategories={navigationCategories} navigate={navigate} />
//            </div>
//        </div>);
//    } else if (navigation === navigationCategories[2]) {//AbilityScores
//        console.log(props)
//        const { abilityScores } = props.characterClass
//        const { abilityScoresSelected } = props.characterClass
//        const { category } = props.characterClass
//        const { getScore } = props.characterClass
//        const { handleSubmit } = props.characterClass

//        return (<div className="container-fluid">
//            <div className="row creation">
//                <div className="col-12">
//                    <div className="row">
//                        <Info abilityScores={abilityScores} abilityScoresSelected={abilityScoresSelected} category={category} />
//                    </div>
//                    <div className="row">
//                        <Selection abilityScores={abilityScores} getScore={getScore} category={category} handleSubmit={handleSubmit} />
//                    </div>
//                    <div className="row">
//                        <Navigation navigationCategories={navigationCategories} navigate={navigate} />
//                    </div>
//                </div>
//            </div>
//        </div>);
//    } else if (navigation === navigationCategories[3]) {//proficiencies
//        console.log("When proficiencies is selected in navigation: ", props.characterClass)

//      //  const { classSelected } = props
//       // const { isClassSelected } = props
//        //const { classProficiencies } = props
//        //const { classProficienciesChoices } = props
//        //const { addProficiency } = props
//        //const { removeProficiency } = props
//                    //<div className='row'>
//                    //    <Info classSelected={classSelected} isClassSelected={isClassSelected} category={category} classProficiencies={classProficiencies} classProficienciesChoices={classProficienciesChoices} addProficiency={addProficiency} removeProficiency={removeProficiency} />
//                    //</div>
//                    //<div className='row'>
//                    //    <Selection classSelected={classSelected} isClassSelected={isClassSelected} category={category} classProficiencies={classProficiencies} classProficienciesChoices={classProficienciesChoices} addProficiency={addProficiency} removeProficiency={removeProficiency} />
//                    //</div>                    

//        return (<div className='container-fluid'>
//            <div className='row creation'>
//                <CharacterClass props={props.characterClass} />

//                <div className='col-12'>

//                    <div className='row'>
//                        <Navigation navigationCategories={navigationCategories} navigate={navigate} />
//                    </div>
//                </div>
//            </div>
//        </div>);
//    } else if (navigation === navigationCategories[4]) {//Spells
//        console.log(props.characterClass)
//        const { classSelected } = props.characterClass
//        const { isClassSelected } = props.characterClass
//        const { spellsInfo } = props.characterClass

//        return (<div className='container-fluid'>
//                    <div className='row creation'>
//                        <div className='col-12'>
//                            <div className='row'>
//                                <Info classSelected={classSelected} isClassSelected={isClassSelected} spellsInfo={spellsInfo} category={category} />
//                            </div>
//                            <div className='row'>
//                                <Navigation navigationCategories={navigationCategories} navigate={navigate} />
//                            </div>
//                        </div>
//                    </div>
//                </div>);
//    } else {
//        return (<div>Broke something!</div>);
//    }

   
        
    

//}







export default CreateCharacter