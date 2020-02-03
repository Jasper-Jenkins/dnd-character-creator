import React, { Component} from 'react'

class AbilityScoresForm extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            cha: 0,
            con: 0,
            dex: 0,
            int: 0,
            str: 0,
            wis: 0,
        }

        this.state = this.initialState
    }

    handleChange = event => {
        const { name, value } = event.target
        this.setState({ [name]: value, })
    } 

    submitForm = () => {
        this.props.handleSubmit(this.state)
        this.setState(this.initialState)
    }

    render() {

        const { cha, con, dex, int, str, wis } = this.state;

        return (
            <form>
                <label>Set AbilityScore</label>
                <input
                    type='number'
                    name='cha'
                    id='charismaScore'
                    value={cha}
                    onChange={this.handleChange} />
                <input
                    type='number'
                    name='con'
                    id='constitutionScore'
                    value={con}
                    onChange={this.handleChange} />
                <input
                    type='number'
                    name='dex'
                    id='dexterityScore'
                    value={dex}
                    onChange={this.handleChange} />
                <input
                    type='number'
                    name='int'
                    id='intelligenceScore'
                    value={int}
                    onChange={this.handleChange} />
                <input
                    type='number'
                    name='str'
                    id='strengthScore'
                    value={str}
                    onChange={this.handleChange} />
                <input
                    type='number'
                    name='wis'
                    id='wisdomScore'
                    value={wis}
                    onChange={this.handleChange} />
                <input type="button" value="Submit" onClick={this.submitForm} />
            </form>);       
    }
}

export default AbilityScoresForm;