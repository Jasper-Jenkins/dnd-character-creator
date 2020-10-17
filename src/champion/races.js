import React, { Component } from 'react'
import isSelected from '../helper/helper-functions'

export default class CharacterRace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            raceSelected: {},            
        }
        this.buttons = this.buttons.bind(this);
        this.selectRace = this.selectRace.bind(this);
      //  console.log("Race Constructor", props);
    }

    componentDidMount() {
        if (isSelected(this.props.raceSelected)) {
            this.setState({ raceSelected: this.props.raceSelected, });
        }
    }

    selectRace(index) {
        const { racesInfo } = this.props;
        const { setRace } = this.props;
        for (let i = 0; i < racesInfo.length; i++) {
            if (racesInfo[i].index === index) {
                const raceSelected = racesInfo.filter(function (race) { return race.name === racesInfo[i].name });
                this.setState({ raceSelected: raceSelected[0] });
                setRace(raceSelected[0]); 
                break;
            }
        }
    }   

    buttons() {
        const { races } = this.props
        const { raceSelected } = this.state;              
        let raceButtons = races.results.map((race) => {
            if (isSelected(raceSelected) && raceSelected.index === race.index) {
                return (<button className='selectionButtons buttonSelected col-4 {race.index}' aria-disabled='true' key={race.index}>{race.name}</button>);
            }
            return (<button onClick={() => this.selectRace(race.index)} className='selectionButtons col-4' key={race.index}>{race.name}</button>);
        });
        return raceButtons;
    }

    render() {
        return (<div className="col-12">
                         {this.buttons()}
                </div>);
    }
}