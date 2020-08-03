import React, { Component } from 'react'

class CharacterClass extends Component {
    constructor(props) {
        super(props);


    };


    render() {

    }
}

 
fetch(url + 'races')
    .then(result => result.json())
    .then(result => { this.setState({ races: result }, this.getInfo(result, 'races')) });
