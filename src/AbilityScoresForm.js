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
            event: null,
            }

        this.state = this.initialState
    }

    handleFocus = (event) => event.target.select();

    handleChange = event => {

        const { name, value } = event.target
        const { scores } = this.state

        const newScores = JSON.parse(JSON.stringify(scores))
        
        for (var i = 0; i < newScores.length; i++) {
            if (newScores[i].name === name) {
                  console.log("SET SCORES", value)
                if (value === '') {
                    newScores[i].value = 0
                    console.log("NAN found")
                //  //  break;
                } else {
                    newScores[i].value = parseInt(value, 10);
                  //  break;
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
      
        return (
            <form>
                <div className="row">
                    <div className="col-4">
                        <label htmlFor="cha">Charisma</label>
                        <input
                            type='number'
                            name='cha'
                            id='cha'
                            value={scores[0].value}
                            onChange={this.handleChange}
                            onFocus={this.handleFocus} />
                        

                    </div>
                    <div className="col-4">
                        <label htmlFor="con">Constitution</label>
                        <input
                            type='number'
                            name='con'
                            id='con'
                            value={scores[1].value}
                            onChange={this.handleChange}
                            onFocus={this.handleFocus} />

                    </div>
                    <div className="col-4">
                        <label htmlFor="dex">Dexterity</label>
                        <input
                            type='number'
                            name='dex'
                            id='dex'
                            value={scores[2].value}
                            onChange={this.handleChange}
                            onFocus={this.handleFocus} />

                    </div>
                    <div className="col-4">
                        <label htmlFor="int">Intelligence</label>
                        <input
                            type='number'
                            name='int'
                            id='int'
                            value={scores[3].value}
                            onChange={this.handleChange}
                            onFocus={this.handleFocus} />

                    </div>
                    <div className="col-4">
                        <label htmlFor='str'>Strength</label>
                        <input
                            type='number'
                            name='str'
                            id='str'
                            value={scores[4].value}
                            onChange={this.handleChange}
                            onFocus={this.handleFocus} />

                    </div>
                    <div className="col-4">
                        <label htmlFor="wis">Wisdom</label>
                        <input
                            type='number'
                            name='wis'
                            id='wis'
                            value={scores[5].value}
                            onChange={this.handleChange}
                            onFocus={this.handleFocus} />

                    </div>
                    <div className="col-12">
                        <input type="button" value="Submit" onClick={this.submitForm} />
                    </div>
                </div>
            </form>);       
    }
}

export default AbilityScoresForm;