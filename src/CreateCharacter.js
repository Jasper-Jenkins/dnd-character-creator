import React, { Component } from 'react'
//import Info from './Info'
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
            abilityScores: {},
            abilityScoresInfo: [],
            abilityScoresModifiers: {},
            abilityScoresSelected: {},
            alertMessage: "",
            champion: 'Champion', //add support: user being able to name their Champion. 
            classSelected: {},           
            levelData: {},
            navigationCategories: ['Races', 'Classes', 'Ability-Scores', 'Proficiencies', 'Spells'],
            navigation: 'Races',
            proficiencies: [],
            proficienciesChoices: [],
            proficienciesChosen: [],
            raceSelected: {},
            spells: {},
            spellsChosen: [],
            spellsInfo: [],
            spellSlots: [],
            selectedSpell: {},
            updateSpellSlots: this.updateSpellSlots,
            updateAlertMessage: this.updateAlertMessage,
            setSelectedSpell: this.setSelectedSpell,
            setProficiencies: this.setProficiencies,
            setAbilityScoresSelected: this.setAbilityScoresSelected,
            startingProficiencies: this.startingProficiencies,
            setChosenSpells: this.setChosenSpells,
            setSpells: this.setSpells,
            setSpellsInfo: this.setSpellsInfo,
            setAbilityScores: this.setAbilityScores,
            setAbilityScoresInfo: this.setAbilityScoresInfo,
            setAbilityScoresModifiers: this.setAbilityScoresModifiers,
          
        }
        this.setRace = this.setRace.bind(this);
        this.setClass = this.setClass.bind(this);
        this.getLevelData = this.getLevelData.bind(this);
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


    setSpells = (spells) => {
        this.setState({ spells: spells, });
    }

    setSpellsInfo = (spellsInfo) => {
        this.setState({ spellsInfo: spellsInfo, });
    }

    setSelectedSpell = (spell) => {
        this.setState({ selectedSpell: spell, });
    }

    setChosenSpells = (spells) => {
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
        for (let i = 0; i < totalDiceRolls; i++) {
            abilityPoint = Math.floor((Math.random() * maxNum) + 1);
            abilityPointsArray.push(abilityPoint);
        }
        abilityPointsArray.sort()
        abilityPointsArray.splice(0, totalDiceRolls - totalRollsToKeep)
        for (let j = 0; j < abilityPointsArray.length; j++) {
            abilityPoints += abilityPointsArray[j];
        }
        return abilityPoints;
    }    

    setRace(chosenRace) {
        this.setState({ raceSelected: chosenRace, });
    }

    setClass(chosenClass) {
        this.setState({ classSelected: chosenClass, spellsChosen: [], selectedSpell: {}, proficiencies: [], proficienciesChosen: [], spells: {}, spellsInfo: [], });
    }
   
    startingProficiencies = (proficiencies) => {
        this.setState({ proficiencies: proficiencies, });
    }

    setProficiencies = (profs, choices) => {
        this.setState({
            proficiencies: profs,
            proficienciesChosen: choices,
        });
    }
      
    setAbilityScoresSelected = (abilityScoresSelected) => {
        this.setState({ abilityScoresSelected: abilityScoresSelected, });
    }

    setAbilityScores = (abilityScores, abilityScoresInfo, modifiers, abilityScoresSelected) => {
        this.setState({
            abilityScores: abilityScores,
            abilityScoresInfo: abilityScoresInfo,
            abilityScoresModifiers: modifiers,
            abilityScoresSelected: abilityScoresSelected,
        });
    }

    setAbilityScoresInfo = (abilityScoresInfo) => {
        this.setState({ abilityScoresInfo: abilityScoresInfo, });
    }

    setAbilityScoresModifiers = (modifiers) => {
        console.log("modifiers being set in CreateCharacter App", modifiers);
        this.setState({ abilityScoresModifiers: modifiers, });
    }
        
    getLevelData(index, currentLevel) { //
        const url = 'https://www.dnd5eapi.co'
        fetch(url + "/api/classes/" + index + "/levels/" + currentLevel)
            .then(result => result.json())
            .then(result => {
                this.setState({
                    levelData: result,
                });
            });
    }
    
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
                <Selection {...this.state} {...this.props} getLevelData={this.getLevelData} setRace={this.setRace} navigate={this.navigate} setClass={this.setClass} />
            </div>
            <div className='row'>
                <Navigation navigate={this.navigate} navigation={this.state.navigation} navigationCategories={this.state.navigationCategories} />
            </div>           
        </div>);
    }
}

export default CreateCharacter