import React, { Component } from 'react'
import Races from './Races'

class App extends Component {
    state = {
        characterRace: {},
        characterClass: {},
    }

   
    render() {
            
        return (            
            <div className="Container">
                <Races />            
            </div>
        )
    }
}

export default App
