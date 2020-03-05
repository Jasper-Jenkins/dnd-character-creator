import React, { Component } from 'react'
//import ClassProficiencies from './ClassProficiencies'
import ClassSpells from './ClassSpells'
import Selection from './Selection'
import ClassProficiencies from './ClassProficiencies';
//import Info from './Info'

class CharacterClass extends Component {     
    constructor(props) {
        console.log("CharacterClass: ", props)

        super(props);
        let propsKeys = Object.getOwnPropertyNames(props.characterClass);
        let properties = {};

        for (var i = 0; i < propsKeys.length; i++) {
            properties[propsKeys[i]] = props.characterClass[propsKeys[i]];
        };
        this.state = properties 

    }

    state = {

    }   

    displayClassInfo = (index) => {
        const { classesInfo } = this.state
        for (let i = 0; i < classesInfo.length; i++) {
            if (classesInfo[i].index === index) {
                const selectedClass = classesInfo.filter(function (cClass) { return cClass.name === classesInfo[i].name })
                this.setState({ classSelected: selectedClass[0], isClassSelected: true }, this.setStartingProficiencies(selectedClass[0]))
                break;
            }
        }
    }

    setStartingProficiencies = (chosenClass) => {
        const proficiencies = JSON.parse(JSON.stringify(chosenClass.proficiencies))
        const proficienciesChoices = JSON.parse(JSON.stringify(chosenClass.proficiency_choices))

        this.setState({ classProficiencies: proficiencies, classProficienciesChoices: proficienciesChoices, });
    }

    classInformation = (informationCategory) => {
        const { classSelected, spellsInfo } = this.state
       // console.log("classInformation() is running")
        switch (informationCategory) {
            case 'Class':
                return (<div className='col-12 info'>
                           <h1 className='text-center'>{classSelected.name}</h1>
                           <p>Hit die: {classSelected.hit_die} + constitution modifier</p>
                           <p>..more main class details</p>
                </div>);
            case 'Proficiencies':
                return (<div className='col-12 info'>
                        <h1 className='text-center'>{classSelected.name}</h1>
                      </div>);
            case 'Spells':
                return (<div className='col-12 spellsInfo'>
                            <h1 className='text-center'>{classSelected.name}</h1>
                        <ClassSpells classSelected={classSelected} spellsInfo={spellsInfo} />
                </div>);
            default:
                return (<div className='col-12 info'>
                    <h1 className='text-center'>Bad input Class Info</h1>
                </div>);
        }
    }

    classSelection = (selectionCategory) => {
        const { classSelected } = this.state
        const { classesInfo } = this.state
        const { classes } = this.state
        const { spellsInfo } = this.state
        const { detailsCategory } = this.state
        switch (selectionCategory) {
            case 'classes':
                return (<Selection classes={classes} classSelected={classSelected} classesInfo={classesInfo} displayClassInfo={this.displayClassInfo} category={detailsCategory} />);
            case 'proficiencies':
                return (<ClassProficiencies character={this.state} />);
            case 'spells':
                return (<ClassSpells spellsInfo={spellsInfo} classSelected={classSelected} />);
                //return (<div className='col-12 spellsInfo'>
                //    <h1 className='text-center'>{classSelected.name}</h1>
                //    <ClassSpells classSelected={classSelected} spellsInfo={spellsInfo} />
                //</div>);
            default:
                return (<div className='col-12 info'>
                    <h1 className='text-center'>Bad input Class Selection</h1>
                </div>);
        }

    }

    //classNavigation = () => {

    //    switch (navigation) {
    //        case characterCategories[0]: //Race
    //            return (            //return (<Create raceSelected={raceSelected} isRaceSelected={isRaceSelected} category='races' races={races} racesInfo={racesInfo} displayRaceInfo={this.displayRaceInfo} navigationCategories={navigationCategories} navigate={this.navigate} navigation={navigation} />);
    //        case characterCategories[1]: //Class
    //            return (<CharacterClass characterClass={this.state} />);
    //        case characterCategories[2]: //Ability-Scores
    //            return (<CreateCharacter abilityScores={abilityScores} abilityScoresSelected={abilityScoresSelected} category='ability-scores' getScore={this.getScore} navigationCategories={navigationCategories} navigate={this.navigate} navigation={navigation} handleSubmit={this.handleSubmit} />);
    //        case characterCategories[3]: //Proficiencies
    //            //   eslint-disable-next-line
    //            return (<CreateCharacter classSelected={classSelected} isClassSelected={isClassSelected} classProficiencies={classProficiencies} classProficienciesChoices={classProficienciesChoices} category='proficiencies' navigationCategories={navigationCategories} navigate={this.navigate} navigation={navigation} />);
    //        case characterCategories[4]: //Spells
    //            return (<CreateCharacter classSelected={classSelected} isClassSelected={isClassSelected} spellsInfo={spellsInfo} category='spells' navigationCategories={navigationCategories} navigate={this.navigate} navigation={navigation} />);
    //        default:
    //    }
    //}

    render() {
        const { detailsCategory } = this.state
        return (<div className='row'>
            {this.classInformation(detailsCategory)}
            {this.classSelection(detailsCategory)}
        </div>);
        }
}



//const CharacterClass = props => {
//    console.log(props)
//    const { classSelected } = props.classProps
//    const { classProficiencies } = props.classProps
//    const { classProficienciesChoices} = props.classProps
//    const { category } = props.classProps
//    const { spellsInfo } = props.classProps

//    switch (category) {
//        case 'classes':
//            return (<div className='col-12 info'>
//                    <h1 className='text-center'>{classSelected.name}</h1>
//                    <p>Hit die: {classSelected.hit_die} + constitution modifier<br />
                   
//                    </p>
//                </div>);
//        case 'proficiencies':
//            console.log('Proficiencies fixing.. sort it out buddies', props)
//            return (<div className='col-12 info'>
//                        <h1 className='text-center'>{classSelected.name}</h1>
//                    </div>);
//        case 'spells':

           
//            return (<div className='col-12 spellsInfo'>
//                        <h1 className='text-center'>{classSelected.name}</h1>  
//                <ClassSpells classSelected={classSelected} spellsInfo={spellsInfo}/>
//                    </div>)
//        default:
//    }     
//}

export default CharacterClass