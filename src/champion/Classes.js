import React, { Component } from 'react'
import isSelected from '../helper/helper-functions'

export default class CharacterClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classSelected: {},
        }
        this.buttons = this.buttons.bind(this);
        this.selectClass = this.selectClass.bind(this);
        this.classCards = this.classCards.bind(this);
    };   

    componentDidMount() {
        if (isSelected(this.props.classSelected)) {
            this.setState({ classSelected: this.props.classSelected, });
        } 
    }

    selectClass(index) {
        const { classesInfo } = this.props;
        const { setClass } = this.props;
        for (let i = 0; i < classesInfo.length; i++) {
            if (classesInfo[i].index === index) {
                const classSelected = classesInfo.filter(function (cClass) { return cClass.name === classesInfo[i].name });
                this.setState({ classSelected: classSelected[0], });
                setClass(classSelected[0]);
                break;
            }
        }        
    }

    buttons() {
        const { classes } = this.props
        const { classSelected } = this.state;
        let classButtons = classes.results.map((characterClass) => {
            if (isSelected(classSelected) && classSelected.index === characterClass.index) {
                //console.log("selection disabled for class");
                return (<button className='selectionButtons buttonSelected col-4' key={characterClass.index}>{characterClass.name}</button>);
            }
            return (<button onClick={() => this.selectClass(characterClass.index)} className='selectionButtons col-4' key={characterClass.index}>{characterClass.name}</button>);

        });       
        return classButtons;
    }

    classProficiences(championClass) {
        let proficiencies = "";
        let count = 0;
        proficiencies = championClass.proficiencies.map((prof) => {
            if (count === championClass.proficiencies.length - 1) {
                return (prof.name + ". ");
            } 
            count++;
            return (prof.name + ", ");
        });
        return (proficiencies);
    }

    classSavingThrows(championClass) {
        let savingThrows = '';
        savingThrows = championClass.saving_throws.map((savingThrow) => {
            return (savingThrow.name + " ")
        });
        return savingThrows;
    }

    classCards() {
        const { classesInfo } = this.props;
        let classCards = classesInfo.map((championClass) => {
            //let bonuses = this.abilityBonuses(race);
            return (<div className="card border-dark mb-3 " key={championClass.index}>
                <div className="card-header text-white bg-dark text-center">
                    <h4>{championClass.name}</h4>
                </div>
                <div className="card-body">
                    <p className="card-text"><strong>Hit die:</strong> {championClass.hit_die}</p>
                    <p className="card-text"><strong>Starting proficiencies:</strong> {this.classProficiences(championClass)}</p>
                    <p className="card-text"><strong>Saving Throws:</strong> {this.classSavingThrows(championClass)}</p>
                    <p className="card-text">{}</p>
                    <p className="card-text">{}</p>
                    <p className="card-text">{}</p>
                    <button className="btn btn-primary" onClick={() => this.selectClass(championClass.index)}>Choose {championClass.name}</button>
                </div>
            </div>);
        });
        return (classCards);
    }

    render() {
        return (<div className="col-12 selection">
                 <p className="selectionTitle">Choose your Champions Class</p>
                        {this.classCards()}
                    </div>);
    }
}

