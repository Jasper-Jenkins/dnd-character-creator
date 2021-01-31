import React, { Component } from 'react'
import Info from './Info'
import Selection from './Selection'
import Navigation from './Navigation'
//import CharacterSave from './CharacterSave'
import isSelected from './helper/helper-functions'
import UserAlert from './helper/Alert'
//import GOOFING from './GOOFING'

class CreateCharacter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            champion: 'Champion', //add support: user being able to name their Champion. 
            abilityScoresSelected: {},
            abilityScores: {},
            abilityScoresInfo:[],
            navigationCategories: ['Races', 'Classes', 'Ability-Scores', 'Proficiencies', 'Spells'],
            navigation: 'Ability-Scores',
            classSelected: {},           
            raceSelected: {},
            proficiencies: [],
            proficienciesChoices: [],
            proficienciesChosen: [],
            spellsChosen: [],
            spellSlots: [],
            selectedSpell: {},
            alertMessage: "",
            updateSpellSlots: this.updateSpellSlots,
            updateAlertMessage: this.updateAlertMessage,
            setSelectedSpell: this.setSelectedSpell,
            setProficiencies: this.setProficiencies,
            setAbilityScoresSelected: this.setAbilityScoresSelected,
            startingProficiencies: this.startingProficiencies,
            updateProficiencies: this.updateProficiencies,
            setSpells: this.setSpells,
            setAbilityScores: this.setAbilityScores,
            setAbilityScoresInfo: this.setAbilityScoresInfo,
        }
        //this.updateSpellsSlots = this.updateSpellSlots.bind(this);
        //this.updateAlertMessage = this.updateAlertMessage.bind(this);
        //this.updateSelectedSpell = this.updateSelectedSpell.bind(this);
        //this.isClassSelected = this.isClassSelected.bind(this);
        //this.isRaceSelected = this.isRaceSelected.bind(this);
        this.setRace = this.setRace.bind(this);
        this.setClass = this.setClass.bind(this);
    }
    
    componentDidMount() {
     
               
    }

    componentDidUpdate() {
    }


    updateAlertMessage = (message) => {
        this.setState({ alertMessage: message }, this.fadeMessage()); 
    }

    fadeMessage = () => { // FIX THIS!!! AAAAAAAAAAAA!!!!!!
        const alertNode = document.getElementById('alert');
        //const alertNode = document.createElement("div");
        //alertNode.setAttribute("className", "alert");
        //document.body.appendChild("alertNode");
        setTimeout(() => {
            let fade = setInterval(() => {
                if (!alertNode.style.opacity) {
                   alertNode.style.opacity = 1;
                }
                if (alertNode.style.opacity > 0) {
                    alertNode.style.opacity -= 0.01;
                } else {
                    clearInterval(fade);
                }
            }, 10);// If I do not wait the 10 seconds, it craps on my parade!
        }, 1700);
        this.setState({ alertMessage: "" });
        alertNode.style.opacity = 1;
    }

    setSelectedSpell = (spell) => {
        this.setState({ selectedSpell: spell, });
    }

    setSpells = (spells) => {
        this.setState({ spellsChosen: spells, });
    }

    updateSpellSlots = (slots) => {
        this.setState({ spellSlots: slots, });
    }

    navigate = (category) => {
        this.setState({ navigation: category, });
    }

    randomDiceRoll = (maxNum) => { // may need to extend this to accept two additional arguments: total rolls to roll, and total rolls to keep 
        let totalDiceRolls = 5;
        let totalRollsToKeep = 3;
        let abilityPoint = 0;
        let abilityPoints = 0;
        let abilityPointsArray = [];
        for (var i = 0; i < totalDiceRolls; i++) {
            abilityPoint = Math.floor((Math.random() * maxNum) + 1);
            abilityPointsArray.push(abilityPoint);
        }
        abilityPointsArray.sort()
        abilityPointsArray.splice(0, totalDiceRolls - totalRollsToKeep)
        for (var j = 0; j < abilityPointsArray.length; j++) {
            abilityPoints += abilityPointsArray[j];
        }
        return abilityPoints;
    }    

    setRace(chosenRace) {
        console.log("and here????")
        this.setState({ raceSelected: chosenRace, });
    }

    setClass(chosenClass) {
        this.setState({ classSelected: chosenClass, spellsChosen: [], selectedSpell: {}, proficiencies: chosenClass.proficiencies, proficienciesChosen: [] });
    }
    
    startingProficiencies = (proficiencies) => {
        this.setState({ proficiencies: proficiencies });
    }

    setProficiencies = (profs, choices) => {
        this.setState({
            proficiencies: profs,
            proficienciesChosen: choices,
        });
    }
       
    updateProficiencies = (proficiencies, choices) => {
        this.setState({
            proficiencies: proficiencies,
            proficienciesChoices: choices,
        });
    }    
    
    setAbilityScoresSelected = (abilityScoresSelected) => {
        this.setState({ abilityScoresSelected: abilityScoresSelected, })
    }


    setAbilityScores = (abilityScores) => {
        this.setState({ abilityScores: abilityScores })
    }

    setAbilityScoresInfo = (abilityScoresInfo) => {
        this.setState({ abilityScoresInfo: abilityScoresInfo })
    }

    //setClasses = (classes) => {
    //    this.setState({ classes: classes, })
    //}

    //setClassesInfo = (classesInfo) => {
    //    this.setState({ classesInfo: classesInfo, })
    //}





       
    render() {
      //hacky way of displaying alert
        //hacky way to put a space between race and class name, fix this. this messes with the total view height need to fix. 
        const { raceSelected, classSelected } = this.state;

        return (<div id='creation' className='container-fluid'>
            <UserAlert alertMessage={this.state.alertMessage} />
            <div className='row'>
                <div className='col-12 text-center' id='characterType'>
                    <h5 className='col'>
                        {isSelected(raceSelected) ? raceSelected.name : null}
                        <span> </span> 
                        {isSelected(classSelected) ? classSelected.name : null}
                    </h5>
                </div>
            </div>
            <div className='row'>
                <Selection {...this.state} {...this.props} setRace={this.setRace} navigate={this.navigate} setClass={this.setClass} handleSubmitAbilityScores={this.handleSubmitAbilityScores} getScore={this.getScore} />
            </div>
            <div className='row'>
                <Navigation {...this.state} {...this.props} navigate={this.navigate} />
            </div>           
        </div>);
    }
}

//<div className='row'>
//    <Info {...this.state} {...this.props} />
//</div>



//<div className='row'>
//    <CharacterSave {...this.state} />
//</div>
//<GOOFING />

export default CreateCharacter