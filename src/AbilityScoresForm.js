import React, { Component} from 'react'

class AbilityScoresForm extends Component {
    constructor(props) {
        super(props);
        //this.initialState = {
        //    cha: 0,
        //    con: 0,
        //    dex: 0,
        //    int: 0,
        //    str: 0,
        //    wis: 0,
        //}

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

    handleChange = event => {
        const { name, value } = event.target
        const { scores } = this.state
        const newScores = scores.map((score) => {
            return score
        })

        for (var i = 0; i < newScores.length; i++) {
            if (newScores[i].name === name) {
                newScores[i].value = parseInt(value, 10);
                break;
            }
        }
        
        this.setState({ scores: newScores})
    } 

    submitForm = () => {
        this.props.handleSubmit(this.state.scores)
        this.setState(this.initialState)
    }

    render() {

        const { scores } = this.state;

        return (
            <form>
                <div className="row">
                    <div className="col-4">
                        <label htmlFor="charismaScore">Charisma</label>
                        <input
                            type='number'
                            name='cha'
                            id='charismaScore'
                            value={scores[0].value}
                            onChange={this.handleChange} />

                    </div>
                    <div className="col-4">
                        <label htmlFor="constitutionScore">Constitution</label>
                        <input
                            type='number'
                            name='con'
                            id='constitutionScore'
                            value={scores[1].value}
                            onChange={this.handleChange} />

                    </div>
                    <div className="col-4">
                        <label htmlFor="dexterityScore">Dexterity</label>
                        <input
                            type='number'
                            name='dex'
                            id='dexterityScore'
                            value={scores[2].value}
                            onChange={this.handleChange} />

                    </div>
                    <div className="col-4">
                        <label htmlFor="intelligenceScore">Intelligence</label>
                        <input
                            type='number'
                            name='int'
                            id='intelligenceScore'
                            value={scores[3].value}
                            onChange={this.handleChange} />

                    </div>
                    <div className="col-4">
                        <label htmlFor="strengthScore">Strength</label>
                        <input
                            type='number'
                            name='str'
                            id='strengthScore'
                            value={scores[4].value}
                            onChange={this.handleChange} />

                    </div>
                    <div className="col-4">
                        <label htmlFor="wisdomScore">Wisdom</label>
                        <input
                            type='number'
                            name='wis'
                            id='wisdomScore'
                            value={scores[5].value}
                            onChange={this.handleChange} />

                    </div>
                    <div className="col-12">
                        <input type="button" value="Submit" onClick={this.submitForm} />
                    </div>
                </div>
            </form>);       
    }
}

export default AbilityScoresForm;