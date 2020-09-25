import React, { Component } from 'react'

import Info from './Info'
import Selection from './Selection'
import Navigation from './Navigation'
//import CharacterSave from './CharacterSave'
import UserAlert from './Alert'

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
            spellsChosen: [],
            spellSlots: [],
            selectedSpell: {},
            alertMessage: "",
            updateSpellSlots: this.updateSpellSlots,
            updateAlertMessage: this.updateAlertMessage,
            updateSelectedSpell: this.updateSelectedSpell,
            isClassSelected: this.isClassSelected,
            isRaceSelected: this.isRaceSelected,
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
    }
    
    componentDidMount() {
        const { abilityScores } = this.props;
        this.abilityScoresSetup(abilityScores);
        console.log("CreateCharacter mounted")
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



    //setCharacterClassProps(props) {
    //    const propsKeys = Object.getOwnPropertyNames(props.characterClass);
    //    let properties = {};
    //    for (var i = 0; i < propsKeys.length; i++) {
    //        properties[propsKeys[i]] = props.characterClass[propsKeys[i]];
    //    };        
    //    return properties
    //}


    updateAlertMessage = (message) => {
        this.setState({ alertMessage: message }, this.fadeMessage()); 
    }

    fadeMessage = () => { // FIX THIS!!! 
        const alertNode = document.getElementById('alert');
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

    updateSelectedSpell = (spell) => {
        this.setState({ selectedSpell: spell, });
    }

    setSpells = (spells) => {
        this.setState({
            spellsChosen: spells,
        });
    }

    updateSpellSlots = (slots) => {
        this.setState({
        spellSlots: slots,})
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

    //setBackgroundImage = () => { } //This will be used if I want to put the character image as the background

    selectRace = (index) => {
       // console.log("PROPS FOR SELECT RACE", this.props)
        const { racesInfo } = this.props;
        for (let i = 0; i < racesInfo.length; i++) {
            if (racesInfo[i].index === index) {
                const raceSelected = racesInfo.filter(function (race) { return race.name === racesInfo[i].name });
                this.setState({ raceSelected: raceSelected[0] });
                break;
            }
        }
    }

    selectClass = (index) => {
        const { classesInfo } = this.props;
        for (let i = 0; i < classesInfo.length; i++) {
            if (classesInfo[i].index === index) {
                const classSelected = classesInfo.filter(function (cClass) { return cClass.name === classesInfo[i].name });
                this.setState({ classSelected: classSelected[0], spellsChosen: [], selectedSpell: {},});
                break;
            }
        }
    }

    startingProficiencies = (proficiencies) => {
        this.setState({ proficiencies: proficiencies });
    }

    setProficiencies = (proficiencies) => {
        console.log("SET PROFICIENCIES", proficiencies)
        this.setState({
            proficiencies: proficiencies,
        });
    }
       
    updateProficiencies = (proficiencies, choices) => {
        this.setState({
            proficiencies: proficiencies,
            proficienciesChoices: choices,
        });
    }    

    isRaceSelected = (raceSelected) => {
        return (this.isSelected(raceSelected));
    }

    isClassSelected = (classSelected) => {
        return (this.isSelected(classSelected));
    }

    isSelected = (obj) => {
        for (var key in obj) {
            obj.hasOwnProperty(key)
            return true;
        }
        return false;
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
            zeroesAlert += "."
            alert(zeroesAlert)
        }
    }
       
    render() {
        const { navigationCategories, navigation, } = this.state
   
        return (<div id='creator' className='container-fluid creation'>
            <UserAlert alertMessage={this.state.alertMessage} />
            <div className='row'>
                <Info {...this.state} {...this.props} />
            </div>
            <div className='row'>
                <Selection {...this.state} {...this.props} selectRace={this.selectRace} selectClass={this.selectClass} handleSubmit={this.handleSubmit} getScore={this.getScore} />
            </div>
            <div className='row'>
                <Navigation {...this.state} {...this.props} navigate={this.navigate} navigationCategories={navigationCategories} navigation={navigation} />
            </div>           
        </div>);
    }
}

//<div className='row'>
//    <CharacterSave {...this.state} />
//</div>
//<GOOFING />



export default CreateCharacter