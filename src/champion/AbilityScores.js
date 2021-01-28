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
        let info = []
        const url = 'https://www.dnd5eapi.co'
        for (var i = 0; i < data.results.length; i++) {
            fetch(url + data.results[i].url)
                .then(result => result.json())
                .then(result => { this.setState((state) => ({ abilityScoresInfo: [...state.abilityScoresInfo, result] }), this.abilityScoresSetup()) });
        }   
   //     this.abilityScoresSetup();
    }

    scoreDisplay() {
        const { abilityScoresInfo } = this.state;
        const { raceSelected, classSelected } = this.props;
        let bonuses, ability_bonuses = [];
        let abilityScores = abilityScoresInfo.map((ability) => {
            console.log("whats happening", ability)
            let abilityScore = "abilityScore";
            if (isSelected(classSelected)) {
                for (var a = 0; a < classSelected.saving_throws.length; a++) {
                    if (ability.index === classSelected.saving_throws[a].index) {
                        abilityScore += "abilityScore savingThrow "
                        console.log("saving throw set: ", classSelected.saving_throws[a].index);
                    }
                }
            }
            return (<div className='col-2 text-center ability' key={ability.index}>
                <p>{ability.full_name}</p>
                <p className={abilityScore}>{this.state.abilityScoresSelected[ability.index]}</p>
            </div>);
        });
         console.log("Are we doing it?", this.state.abilityScoresSelected)

        if (isSelected(raceSelected)) { //setting up info for when a race has been selected
            ability_bonuses = raceSelected.ability_bonuses.map((bonus, index) => {
                for (var i = 0; i < abilityScoresInfo.length; i++) {
                    if (abilityScoresInfo[i].name === bonus.ability_score.name) {
                        return (<li className='col-6 text-center' key={index}>{abilityScoresInfo[i].full_name}: +{bonus.bonus}</li>);
                    }
                }
                return (<li key={index}>Ability: +BONUS</li>);
            });
            bonuses = raceSelected.ability_bonuses.map((bonus) => {
                return bonus
            });
            abilityScores = abilityScoresInfo.map((ability) => {
                let abilityScore = "abilityScore ";
                if (isSelected(classSelected)) {
                    for (var a = 0; a < classSelected.saving_throws.length; a++) {
                        if (ability.index === classSelected.saving_throws[a].index) {
                            abilityScore = "abilityScore savingThrow "
                        }
                    }
                }
                for (var i = 0; i < bonuses.length; i++) {
                    if (bonuses[i].ability_score.name.toLowerCase() === ability.index) {
                        abilityScore += "bonus "
                        let bonus = this.state.abilityScoresSelected[ability.index] + bonuses[i].bonus;
                        return (<div className='col-2 text-center ability' key={ability.index}>
                            <p>{ability.full_name}</p>
                            <p className={abilityScore}>{bonus}</p>
                        </div>);
                    }
                }
                return (<div className='col-2 text-center ability' key={ability.index}>
                    <p>{ability.full_name}</p>
                    <p className={abilityScore}>{this.state.abilityScoresSelected[ability.index]}</p>
                </div>);
            });
        }
    return ([ability_bonuses, abilityScores]);
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

    render() {
        const { abilityScoresInfo, abilityScoresSwitch } = this.state;
        let scores = abilityScoresInfo.map((abilityScore, index) => {
            return (<button onClick={() => this.getScore(abilityScore.index)} className='col-4 selectionButtons' key={index}>{abilityScore.full_name}</button>)
        });
        const [ability_bonuses, abilityScores] = this.scoreDisplay();
        return (<div className='selection col-12'>
                    <div className="col-12 selectionTitle">
                        <h3 className="selectionTitle text-center">Choose your Ability Scores</h3>                      
                    </div>  
                    <div className='row'>{abilityScores}</div>
                    <ul className='info-abilityBonuses'>{ability_bonuses}</ul>
                    <div className='col-12 text-center'>
                        {abilityScoresSwitch ? <AbilityScoresForm handleSubmitAbilityScores={this.handleSubmitAbilityScores} abilityScoresSelected={this.state.abilityScoresSelected} /> : scores}
                        <button onClick={() => this.abilityScoreSwitchy()} className='btn btn-primary col-6 align-text-bottom'>{abilityScoresSwitch ? "Auto fill " : "Manual fill "}</button><br />
                    </div>
                </div>)
    }
}