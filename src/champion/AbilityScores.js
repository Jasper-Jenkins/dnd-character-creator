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
            abilityScoresSwitch: false,
        }
        this.getScore = this.getScore.bind(this);
    }

    componentDidMount() {
        if (isSelected(this.props.abilityScores)) {
            console.log("this should happen any time after the first")
            this.setState({ abilityScores: this.props.abilityScores, abilityScoresInfo: this.props.abilityScoresInfo, abilityScoresSelected: this.props.abilityScoresSelected, }, this.abilityScoresSetup())
            
        } else {
            console.log("this should happen second")
            this.getAbilityScores();
           
        }
        console.log(this.props)
    }

    componentWillUnmount() {
        this.props.setAbilityScores(this.state.abilityScores);
        this.props.setAbilityScoresInfo(this.state.abilityScoresInfo);
        this.props.setAbilityScoresSelected(this.state.abilityScoresSelected);
    }

    abilityScoresSetup = () => {
        console.log("scores set up", this.state.abilityScores)
        //abilityScoresData 
        const { count } = this.state.abilityScores;
        const { results } = this.state.abilityScores;
        let abilityScores = {};
        for (var j = 0; j < count; j++) {
            let ability = results[j].index;
            abilityScores[ability] = 0;
        }
        this.setState({ abilityScoresSelected: abilityScores, });
    }

    getAbilityScores() {
        const url = "https://www.dnd5eapi.co/api/"
        fetch(url + 'ability-scores')
            .then(result => result.json())
            .then(result => { this.setState({ abilityScores: result }, this.getInfo(result)) })
            .catch(e => { console.log(e + " -- getAbilityScores() -- " + url); });
    }

    getInfo(data) {
        console.log(data);
        //let info = []
        const url = 'https://www.dnd5eapi.co'
        for (var i = 0; i < data.results.length; i++) {
            fetch(url + data.results[i].url)
                .then(result => result.json())
                .then(result => { this.setState((state) => ({ abilityScoresInfo: [...state.abilityScoresInfo, result] }), this.abilityScoresSetup()) });
        }     
    }

    scoreDisplay() {
        const { abilityScoresInfo, abilityScoresSelected } = this.state;
        const { raceSelected, classSelected } = this.props;
        let bonuses, ability_bonuses = [];
        let bonus = 0;

        let abilityScore = ''
        let abilityScores = abilityScoresInfo.map((ability) => {
            abilityScore += 'card-text abilityScore '
           // console.log("whats happening", ability)
            //let abilityScore = "card-text";
            if (isSelected(classSelected)) {
                for (var a = 0; a < classSelected.saving_throws.length; a++) {
                    if (ability.index === classSelected.saving_throws[a].index) {
                        abilityScore += 'savingThrow '
                        console.log("saving throw set: ", classSelected.saving_throws[a].index);
                    }
                }
            }

            if (isSelected(raceSelected)) { //setting up info for when a race has been selected
                for (var b = 0; b < raceSelected.ability_bonuses.length; b++) {
                    if (raceSelected.ability_bonuses[b].ability_score.index === ability.index) {
                        console.log('SHEESH', raceSelected.ability_bonuses[b].ability_score.index)
                        abilityScore += 'bonus '
                        bonus = abilityScoresSelected[ability.index] + raceSelected.ability_bonuses[b].bonus;
                    } else {                       
                        bonus = abilityScoresSelected[ability.index]
                    }
                }
            }  
            return (<div className="card border-dark mb-3 col-4 card-ability-score text-center" key={ability.index}>
                <div className="card-header text-white bg-dark ability-score-header">
                    <h6>{ability.full_name}</h6>
                </div>
                <div className="card-body">
                    <p className={abilityScore} key={ability.index}>{bonus}</p>
                </div>
            </div>);
        });
    return (abilityScores);
    }

    getScore(ability) {
        console.log("progress? ", ability)
        const { abilityScores } = this.state;
        const { abilityScoresSelected } = this.state;
        let scores = abilityScoresSelected
        for (var i = 0; i < abilityScores.count; i++) {
            if (abilityScores.results[i].index === ability) {
                scores[ability] = randomDiceRoll(6)
                this.setState({ abilityScoresSelected: scores })
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
            return (<button onClick={() => this.getScore(abilityScore.index)} className='col-4 selectionButtons' key={index}>{abilityScore.full_name}</button>)
        });

        return (buttons);

    }

    render() {
        const { abilityScoresInfo, abilityScoresSwitch } = this.state;
        let scores = abilityScoresInfo.map((abilityScore, index) => {
            return (<button onClick={() => this.getScore(abilityScore.index)} className='col-4 selectionButtons' key={index}>{abilityScore.full_name}</button>)
        });
        const abilityScores = this.scoreDisplay();

      //  console.log(ability_bonuses);
        return (<div className='selection col-12'>
                    <div className="col-12 selectionTitle">
                        <h3 className="text-center">Set ability scores.</h3>                      
                    </div>  
                    <div className='row'>{abilityScores}</div>                   
                    <div className='col-12 text-center'>
                        {abilityScoresSwitch ? <AbilityScoresForm handleSubmitAbilityScores={this.handleSubmitAbilityScores} abilityScoresSelected={this.state.abilityScoresSelected} /> : this.buttons()}
                        <button onClick={() => this.abilityScoreSwitchy()} className='btn btn-primary col-6 align-text-bottom'>{abilityScoresSwitch ? "Auto fill " : "Manual fill "}</button><br />
                    </div>
                </div>)
    }
}