import React, { Component } from 'react'

export default class CharacterRace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            raceSelected: {},            
        }
        this.buttons = this.buttons.bind(this);
        this.selectRace = this.selectRace.bind(this);
        this.isRaceSelected = this.isRaceSelected.bind(this);
        console.log("Race Constructor", props);
    }

    componentDidMount() {
        if (this.isRaceSelected(this.props.raceSelected)) {
            this.setState({ raceSelected: this.props.raceSelected, });
        }
    }

    selectRace(index) {
        // console.log("PROPS FOR SELECT RACE", this.props)
        const { racesInfo } = this.props;
        const { setRace } = this.props;
        for (let i = 0; i < racesInfo.length; i++) {
            if (racesInfo[i].index === index) {
                const raceSelected = racesInfo.filter(function (race) { return race.name === racesInfo[i].name });
                this.setState({ raceSelected: raceSelected[0] });
                setRace(raceSelected[0]); // saving will be handled by CreateCharacter. Setting it in the CreateCharacter class here. 
                break;
            }
        }
    }

    isRaceSelected(raceSelected) {
        for (var key in raceSelected) {
            raceSelected.hasOwnProperty(key)
            return true;
        }
        return false;
    }
   
    raceInformation() {

    }

    buttons() {
        const { races } = this.props
        const { raceSelected } = this.state;
              
        let raceButtons = races.results.map((race) => {
            if (this.isRaceSelected(raceSelected) && raceSelected.index === race.index) {

                return (<button className='selectionButtons buttonSelected col-4 {race.index}' aria-disabled='true' key={race.index}>{race.name}</button>);
            }
            return (<button onClick={() => this.selectRace(race.index)} className='selectionButtons col-4' key={race.index}>{race.name}</button>);

        });
        return raceButtons;
    }

    render() {
        return (<div className="col-12 text-center selection">
                {this.buttons()}
                </div>);
    }
}