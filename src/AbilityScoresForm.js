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
        
        this.setState({ scores: newScores })

    } 

    submitForm = () => {
        this.props.handleSubmit(this.state.scores)
     //   this.setState(this.initialState)
    }

    render() {
        const { scores } = this.state;
        return (<form className='col-12'>
                    <label className='col-3'htmlFor="cha">Charisma</label>
                    <input className='col-1'
                        type='number'
                        name='cha'
                        id='cha'
                        value={scores[0].value}
                        onChange={this.handleChange}
                        onFocus={this.handleFocus} />
                    <label className='col-3'htmlFor="con">Constitution</label>
                    <input className='col-1'
                        type='number'
                        name='con'
                        id='con'
                        value={scores[1].value}
                        onChange={this.handleChange}
                        onFocus={this.handleFocus} />
                    <label className='col-3'htmlFor="dex">Dexterity</label>
                    <input className='col-1'
                        type='number'
                        name='dex'
                        id='dex'
                        value={scores[2].value}
                        onChange={this.handleChange}
                        onFocus={this.handleFocus} />
                    <label className='col-3' htmlFor="int">Intelligence</label>
                    <input className='col-1'
                        type='number'
                        name='int'
                        id='int'
                        value={scores[3].value}
                        onChange={this.handleChange}
                        onFocus={this.handleFocus} />
                    <label className='col-3' htmlFor='str'>Strength</label>
                    <input className='col-1'
                        type='number'
                        name='str'
                        id='str'
                        value={scores[4].value}
                        onChange={this.handleChange}
                        onFocus={this.handleFocus} />
                    <label className='col-3' htmlFor="wis">Wisdom</label>
                    <input className='col-1'
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