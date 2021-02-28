import React, { Component} from 'react'

class AbilityScoresForm extends Component {
    constructor(props) {
        super(props);      
        this.initialState = {
            scores: [
                { name: 'cha', value: 0, },
                { name: 'con', value: 0, },
                { name: 'dex', value: 0, },
                { name: 'int', value: 0, },
                { name: 'str', value: 0, },
                { name: 'wis', value: 0, },
            ],
            
        }
        this.state = this.initialState
    }

    componentDidMount() {
        this.setState({
            scores: [
                { name: 'cha', value: this.props.abilityScoresSelected['cha'], },
                { name: 'con', value: this.props.abilityScoresSelected['con'], },
                { name: 'dex', value: this.props.abilityScoresSelected['dex'], },
                { name: 'int', value: this.props.abilityScoresSelected['int'], },
                { name: 'str', value: this.props.abilityScoresSelected['str'], },
                { name: 'wis', value: this.props.abilityScoresSelected['wis'], },
            ],
        })
    }

    handleFocus = (event) => event.target.select();
        
    handleChange = (event) => {
        const { name, value } = event.target
        const { scores } = this.state
        const newScores = JSON.parse(JSON.stringify(scores))
        
        for (var i = 0; i < newScores.length; i++) {
            if (newScores[i].name === name) {
                if (value === '') {
                    newScores[i].value = 0                    
                } else {
                    newScores[i].value = parseInt(value, 10);
                }
            }            
        }
        
        this.setState({
            scores: newScores,
        });
    } 

    submitForm = () => {
        this.props.handleSubmitAbilityScores(this.state.scores)
     //   this.setState(this.initialState)
    }

    render() {
        const { scores } = this.state;
        
        return (<form>
            <label className={scores[0].value > 18 || scores[0].value < 3 ? 'col-4 invalidScore ' : 'col-4 validScore ' } htmlFor="cha">Charisma</label>
                    <input className='col-2'
                        type='number'
                        name='cha'
                        id='cha'
                        value={scores[0].value}
                        onChange={this.handleChange}
                        onFocus={this.handleFocus} />
            <label className={scores[1].value > 18 || scores[1].value < 3 ? 'col-4 invalidScore ' : 'col-4 validScore '} htmlFor="con">Constitution</label>
                    <input className='col-2'
                        type='number'
                        name='con'
                        id='con'
                        value={scores[1].value}
                        onChange={this.handleChange}
                onFocus={this.handleFocus} />
            <label className={scores[2].value > 18 || scores[2].value < 3 ? 'col-4 invalidScore ' : 'col-4 validScore '} htmlFor="dex">Dexterity</label>
                    <input className='col-2'
                        type='number'
                        name='dex'
                        id='dex'
                        value={scores[2].value}
                        onChange={this.handleChange}
                        onFocus={this.handleFocus} />      
            <label className={scores[3].value > 18 || scores[3].value < 3 ? 'col-4 invalidScore ' : 'col-4 validScore '} htmlFor="int">Intelligence</label>
                    <input className='col-2'
                        type='number'
                        name='int'
                        id='int'
                        value={scores[3].value}
                        onChange={this.handleChange}
                        onFocus={this.handleFocus} /> 
            <label className={scores[4].value > 18 || scores[4].value < 3 ? 'col-4 invalidScore ' : 'col-4 validScore '} htmlFor='str'>Strength</label>
                    <input className='col-2'
                        type='number'
                        name='str'
                        id='str'
                        value={scores[4].value}
                        onChange={this.handleChange}
                        onFocus={this.handleFocus} />
            <label className={scores[5].value > 18 || scores[5].value < 3 ? 'col-4 invalidScore ' : 'col-4 validScore '} htmlFor="wis">Wisdom</label>
                    <input className='col-2'
                        type='number'
                        name='wis'
                        id='wis'
                        value={scores[5].value}
                        onChange={this.handleChange}
                        onFocus={this.handleFocus} />
                    <input type="button" value="Submit" onClick={this.submitForm} />
            </form>);       
    }
}

export default AbilityScoresForm;