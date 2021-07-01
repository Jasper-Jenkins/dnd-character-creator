import React, { Component } from 'react'
import isSelected from '../helper/helper-functions'
import AbilityScoresForm from '../helper/AbilityScoresForm'
import randomDiceRoll from '../helper/random-dice-roll'

export default class AbilityScores extends Component {
    constructor(props) {
        super(props);
        this.state = {
            abilityScores: {},
            abilityScoresInfo: [],
            abilityScoresSelected: {},
            abilityScoresModifiers: {},
            abilityScoresSwitch: false,
        }
        this.getScore = this.getScore.bind(this);       
    }

    componentDidMount() {        
        if (isSelected(this.props.abilityScores)) {
            this.setState({
                abilityScores: this.props.abilityScores,
                abilityScoresInfo: this.props.abilityScoresInfo,
                abilityScoresSelected: this.props.abilityScoresSelected,
                abilityScoresModifiers: this.props.abilityScoresModifiers,
            }, this.abilityScoresSetup())
         } else {
            this.getAbilityScores();           
        }
        console.log(this.props);
     }

    componentWillUnmount() {
        this.props.setAbilityScores(this.state.abilityScores, this.state.abilityScoresInfo, this.state.abilityScoresModifiers, this.state.abilityScoresSelected);        
        console.log("AbilityScores unmounting and setAbilityScoresModifiers() being to update modifiers in CreateCharacter. ", this.state.abilityScoresModifiers);       
    }

    abilityScoresSetup() {
        const { count } = this.state.abilityScores;
        console.log("abilityScoresSetup(), count: ", count);
        const { results } = this.state.abilityScores;
        let abilityScores = {};
        for (var j = 0; j < count; j++) {
            let ability = results[j].index;
            abilityScores[ability] = 0;
        }
        console.log("abilityScores at the end of abilityScoresSetup() ", abilityScores);
        this.setState({ abilityScoresSelected: abilityScores, });
    }

    getAbilityScores() {
        const url = 'https://www.dnd5eapi.co/api/';
        fetch(url + 'ability-scores')
            .then(result => result.json())
            .then(result => { this.setState({ abilityScores: result }, this.getInfo(result)); })
            .then(() => { this.abilityScoresSetup(); console.log('getAbilityScores()', this.state.abilityScores); }) //seems hacky?
            .catch(e => { console.log(e + " -- getAbilityScores() -- " + url); });
    }

    getInfo(data) {
        const url = 'https://www.dnd5eapi.co';
        for (var i = 0; i < data.results.length; i++) {
            fetch(url + data.results[i].url)
                .then(result => result.json())
                .then(result => { this.setState((state) => ({ abilityScoresInfo: [...state.abilityScoresInfo, result] }), ) });
        }     
    }

    abilityScoreModifier(abilityScoreValue) { //needs values for up to level 30. 
        const { classSelected } = this.props;
        switch (true) {
            case abilityScoreValue > 0 && abilityScoreValue < 2:
                console.log("-5 modifier for a ability score of" + abilityScoreValue + ". ");
                return (-5);
            case abilityScoreValue > 1 && abilityScoreValue < 4:
                console.log("-4 modifier for a ability score of " + abilityScoreValue + ". ");
                return (-4);
            case abilityScoreValue > 3 && abilityScoreValue < 6:
                console.log("-3 modifier for a ability score of " + abilityScoreValue + ". ");
                return (-3);
            case abilityScoreValue > 5 && abilityScoreValue < 8:
                console.log("-2 modifier for a ability score of " + abilityScoreValue + ". ");
                return (-2);
            case abilityScoreValue > 7 && abilityScoreValue < 10:
                console.log("-1 modifier for a ability score of " + abilityScoreValue + ". ");
                return (-1);
            case abilityScoreValue > 9 && abilityScoreValue < 12:
                console.log("+-0 modifier for a ability score of " + abilityScoreValue + ". ");
                return (0);
            case abilityScoreValue > 11 && abilityScoreValue < 14:
                console.log("+1 modifier for a ability score of " + abilityScoreValue + ". ");
                return (1);
            case abilityScoreValue > 13 && abilityScoreValue < 16:
                console.log("+2 modifier for a ability score of " + abilityScoreValue + ". ");
                return (2);
            case abilityScoreValue > 15 && abilityScoreValue < 18:
                console.log("+3 modifier for a ability score of " + abilityScoreValue + ". ");
                return (3);
            case abilityScoreValue > 17 && abilityScoreValue < 20:
                console.log("+4 modifier for a ability score of " + abilityScoreValue + ". ");
                return (4);
            default:
                console.log("Do not have a modifier value set for " + classSelected.spellcasting.spellcasting_ability.index + " ability with a score of " + abilityScoreValue + " yet. ");
                return (0);
        }
        //const num = (abilityScoreValue - 10) / 2;
        //console.log(num);        
    }

    scoreDisplay() {
        const { abilityScoresInfo, abilityScoresSelected } = this.state;
        const { raceSelected, classSelected } = this.props;
        let bonus = 0;
        let abilityScore = '';
        let abilityScores = abilityScoresInfo.map((ability) => {
            abilityScore = 'card-text abilityScore ';
            bonus = abilityScoresSelected[ability.index]          
            if (isSelected(classSelected)) {
                for (var a = 0; a < classSelected.saving_throws.length; a++) {
                    if (ability.index === classSelected.saving_throws[a].index) {
                        abilityScore += 'savingThrow ';                      
                    }
                }
            }
            if (isSelected(raceSelected)) { 
                for (var b = 0; b < raceSelected.ability_bonuses.length; b++) {
                    if (raceSelected.ability_bonuses[b].ability_score.index === ability.index) {                     
                        abilityScore += 'bonus ';
                        bonus = abilityScoresSelected[ability.index] + raceSelected.ability_bonuses[b].bonus;
                    } 
                }
            }  
            return (<div className='card border-dark mb-3 col-4 card-ability-score text-center' key={ability.index}>
                    <div className='card-header text-white bg-dark ability-score-header'>
                        <h6>{ability.full_name}</h6>
                    </div>
                    <div className='card-body'>
                        <p className={abilityScore} key={ability.index}>{bonus}</p>
                    </div>
                </div>);
        });
        return (abilityScores);
    }

    getScore(ability) {        
        const { abilityScores } = this.state;
        console.log('getScore() abilityScores: ', abilityScores);
        const { abilityScoresSelected, abilityScoresModifiers } = this.state;
        let scores = abilityScoresSelected
        let modifiers = abilityScoresModifiers;
        for (var i = 0; i < abilityScores.count; i++) {
            if (abilityScores.results[i].index === ability) {
                let num = randomDiceRoll(6);
                scores[ability] = num;
                console.log("getScore(), ", ability, " num: ", num);
                modifiers[ability] = this.abilityScoreModifier(num);
                this.setState({ abilityScoresSelected: scores, abilityScoresModifiers: modifiers, });
                break;
            }
        }      
    }

    handleSubmitAbilityScores = (abilities) => { //needs tending too, add better out of bounds messages...and how its handled 
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
            this.props.updateAlertMessage(zeroesAlert);
        }
    }

    abilityScoreSwitchy() {
        this.setState(state => ({
            abilityScoresSwitch: !state.abilityScoresSwitch,
        }));
    }

    buttons() {
        const { abilityScoresInfo } = this.state;
        let buttons = abilityScoresInfo.map((abilityScore, index) => {
            return (<button onClick={() => this.getScore(abilityScore.index)} className='btn btn-primary ability-score-button col-5' type='button' key={index}>{abilityScore.full_name}</button>)
        });
        return (<div className='d-grid gap-2 d-md-block'>{buttons}</div>);
    }

    render() {
        const {abilityScoresSwitch } = this.state;       
        return (<div className='selection col-12'>
                    <div className="col-12 selectionTitle">
                        <h3 className="text-center">Set ability scores</h3>                      
                    </div>  
                <div className='row'>{this.scoreDisplay()}</div>
                <div className='row'>
                    <div className='col-12 scoreSelection text-center'>
                        {abilityScoresSwitch ? <AbilityScoresForm handleSubmitAbilityScores={this.handleSubmitAbilityScores} abilityScoresSelected={this.state.abilityScoresSelected} /> : this.buttons()}
                        <button onClick={() => this.abilityScoreSwitchy()} className='btn btn-primary ability-score-switchy-btn'>{abilityScoresSwitch ? "Auto fill " : "Manual fill "}</button><br />
                    </div>
                </div>
                </div>)
    }
}

//Does not update modifiers if you use submit button on form. 