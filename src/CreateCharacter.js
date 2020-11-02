import React, { Component } from 'react'

import Info from './Info'
import Selection from './Selection'
import Navigation from './Navigation'
//import CharacterSave from './CharacterSave'
//import isSelected from './helper/helper-functions'
import UserAlert from './helper/Alert'
//import GOOFING from './GOOFING'

class CreateCharacter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            abilityScoresSelected: {},
            navigationCategories: ['Races', 'Classes', 'Ability-Scores', 'Proficiencies', 'Spells'],
            navigation: 'Races',
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
            startingProficiencies: this.startingProficiencies,
            updateProficiencies: this.updateProficiencies,
            setSpells: this.setSpells,
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
        const { abilityScores } = this.props;
        this.abilityScoresSetup(abilityScores);
        console.log("CreateCharacter mounted");
               
    }

    componentDidUpdate() {
        console.log("CreateCharacter updated")
    }


    abilityScoresSetup = (abilityScoresData) => {
        const { count } = abilityScoresData;
        const { results } = abilityScoresData;
        let abilityScores = {};
        for (var j = 0; j < count; j++) {
            let ability = results[j].index;
            abilityScores[ability] = 0;
        }
        this.setState({ abilityScoresSelected: abilityScores, });
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

    getScore = (ability) => {
        const { abilityScores } = this.props;
        const { abilityScoresSelected } = this.state;
        let scores = abilityScoresSelected
        for (var i = 0; i < abilityScores.count; i++) {
            if (abilityScores.results[i].index === ability) {
                scores[ability] = this.randomDiceRoll(6)
                this.setState({abilityScoresSelected: scores})
                break;
            }
        }
   //     console.log("Ability Scores Selected", abilityScoresSelected[ability])
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
        
    handleSubmit = (abilities) => { //needs tending too, add better out of bounds messages...and how its handled 
        const { abilityScoresSelected } = this.state
        let scores = abilityScoresSelected
        let noZeroes = []
        for (var i = 0; i < abilities.length; i++) {
            if (abilities[i].value < 3 || abilities[i].value > 18) { //needs better validation
                noZeroes.push(abilities[i].name);
            } else {
                scores[abilities[i].name] = parseInt(abilities[i].value, 10)
                this.setState({ abilityScoresSelected: scores })
            }
        }
        if (noZeroes.length > 0) {
            let zeroesAlert = "Ability Scores must not be 0, you currently have 0 in: ";
            for (var k = 0; k < noZeroes.length; k++) {
                if (k < noZeroes.length - 1) {
                    zeroesAlert += noZeroes[k] + ", ";
                } else {
                    zeroesAlert += noZeroes[k];
                }
            }
            zeroesAlert += ".";
            this.updateAlertMessage(zeroesAlert);
        }
    }
       
    render() {
       // const { navigationCategories, navigation, } = this.state
        
        return (<div id='creator' className='container-fluid creation'>
            <UserAlert alertMessage={this.state.alertMessage} />
            <div className='row'>
                <Info {...this.state} {...this.props} />
            </div>
            <div className='row'>
                <Selection {...this.state} {...this.props} setRace={this.setRace} setClass={this.setClass} handleSubmit={this.handleSubmit} getScore={this.getScore} />
            </div>
            <div className='row navigation justify-content-center '>
                <Navigation {...this.state} {...this.props} navigate={this.navigate} />
            </div>           
        </div>);
    }
}

//<div className='row'>
//    <CharacterSave {...this.state} />
//</div>
//<GOOFING />



export default CreateCharacter